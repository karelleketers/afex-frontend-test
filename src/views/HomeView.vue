<script setup>
    import { ref, onMounted } from "vue";
    import Card from "@/components/Card.vue";
    import DetailDialogue from "@/components/Dialogue/DetailDialogue.vue";
    import DeleteDialogue from "@/components/Dialogue/DeleteDialogue.vue";
    import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "@/firebase";
    import axios from "axios";

    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    // Reference variables for modals and error messages
    const showDetailModal = ref(false) // Reference variable for detail modal
    const showDeleteModal = ref(false); // Reference variable for delete modal
    const errorMessage = ref(""); // Reference variable for error message

    // Reference variables for video data
    const videos = ref([]); // Reference variable for array of videos
    const videoLink = ref(""); // Reference variable for user-inputted video link
    const videoDetail = ref({}); // Reference variable for detailed video data
    const videoId = ref(""); // Reference variable for ID of video to delete

    // Firebase collection reference
    const videosCollectionRef = collection(db, "videos");

    // On mount, fetch videos from Firebase
    onMounted(async () => {
        onSnapshot(videosCollectionRef, (querySnapshot) => {
            let videosArr = [];
            querySnapshot.forEach((doc) => {
            const video = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                thumbnail: doc.data().thumbnail,
                link: doc.data().link,
                duration: doc.data().duration,
                videoId: doc.data().videoId,
            };

            videosArr.push(video);
            });

            videos.value = videosArr;
        })
    })


    // Helper function to fetch YouTube data from a URL
    const getYouTubeDataFromURL = (url) => {
        return axios.get(url)
        .catch((error) => console.log(error))
    }

    // Helper function to extract the YouTube video ID from a URL
    const extractIDFromLink = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        const id = (match && match[7].length == 11) ? match[7] : false;
        return id;
    }

    // Helper function to check if a video already exists in the Firebase collection
    const videoAlreadyExists = async (url) => {
        let videosCollection = [];
        const q = query(collection(db, "videos"), where("link", "==", url));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        videosCollection.push(doc.data());
        });

        return videosCollection.length > 0;
    }


    /**
     * Adds a video to the Firebase database, given a YouTube URL.
     * If the video is already in the database, an error message is displayed.
     * Otherwise, the video is added with its details fetched from the YouTube API.
     */
    const addVideo = async () => {

    // Check if video already exists in database
    const videoExists = await videoAlreadyExists(videoLink.value);

    // Display error message and return if video already exists
    if (videoExists) {
        videoLink.value = "";
        errorMessage.value = "Este video ya esta en tu playlist.";
        return;
    };

    // Extract the YouTube video ID from the URL
    const youtubeID = extractIDFromLink(videoLink.value);

    // Fetch video data from YouTube API
    const FETCH_YOUTUBE_DATA = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeID}&key=${apiKey}&part=snippet,%20contentDetails`;
    const fetchedYouTubeData = await getYouTubeDataFromURL(FETCH_YOUTUBE_DATA);
    const youtubeData = fetchedYouTubeData.data.items[0];

    // Display error message and return if the URL is not valid
    if (!youtubeData) {
        videoLink.value = "";
        errorMessage.value = "Esta no es una url de youtube válida.";
        return;
    }

    // Add video to the Firebase database
    addDoc(videosCollectionRef, {
        title: youtubeData.snippet.title,
        description: `${youtubeData.snippet.description.slice(0, 100)}...`,
        thumbnail: youtubeData.snippet.thumbnails.maxres.url,
        duration: youtubeData.contentDetails.duration,
        link: videoLink.value,
        videoId: youtubeID,
    });

    // Clear videoLink input after adding video to database
    videoLink.value = "";
    }


    // Deletes a video from the Firebase collection with the given ID
    const deleteVideo = (id) => {
        deleteDoc(doc(videosCollectionRef, id));
        showDeleteModal.value=false;
    }

    // Displays the video details modal and populates it with the given video data
    const handleCardEvent = (video) => {
        showDetailModal.value=true;
        videoDetail.value = video;
    }

    // Displays the delete confirmation modal and sets the ID of the video to be deleted
    const handleDeleteEvent = (id) => {
        showDeleteModal.value=true;
        videoId.value = id;
    }

    // Closes both the video details and delete confirmation modals, and resets their associated data
    const handleCloseModalEvent = () => {
        showDetailModal.value=false;
        showDeleteModal.value=false;
        videoDetail.value = {};
        videoId.value = "";
    }

</script>


<template>
    <main>
        <div v-if="showDetailModal" class="overlay">
            <DetailDialogue @close-modal="handleCloseModalEvent" :video="videoDetail"/>
        </div>
        <div v-if="showDeleteModal" class="overlay">
            <DeleteDialogue @close-modal="handleCloseModalEvent" @confirm-delete="deleteVideo(videoId)"/>
        </div>
        <div class="container">
            <header>
                <h1>Añadir nuevo video</h1>
                <input @focus="errorMessage=''" v-model.trim="videoLink" type="text" placeholder="Añadir">
                <button class="addBttn" @click="addVideo">Añadir</button>
                <div class="errorContainer">
                    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
                </div>
            </header>
            <div class="cards-container">
                <Card v-for="video in videos" @click="handleCardEvent(video)" :key="video.id" :video="video" @delete-video="id => handleDeleteEvent(id)"/>
            </div>
        </div>
    </main>
</template>

<style scoped> 
    main {
        height: 100vh;
        width: 100vw;
    }

    .container {
        max-width: 1000px;
        padding: 1.5rem;
        margin: 0 auto;
    }

    header {
        width: 80vw;
        display: flex;
        flex-wrap: wrap;
        margin: 4rem 0;
    }

    header h1 {
        width: 100%;
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    header input {
        width: 80%;
        border: none;
        background-color: grey;
        padding: 10px;
        border-radius: 2%;
    }

    header button {
        width: 20%;
        border: none;
        padding: 0.8rem;
        cursor: pointer;
        background-color: blue;
        border-radius: 2%;
        color: white;
        font-size: 1.2rem;
    }

    .cards-container {
        display: flex;
        flex-wrap: wrap;
    }

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.77);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .error {
        color: red;
    }

    .errorContainer {
        margin: 1rem 0;
    }

    ::placeholder {
        color: black;
    }
</style>