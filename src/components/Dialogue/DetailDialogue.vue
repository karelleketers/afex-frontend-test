<script setup>
    import { Duration } from "luxon"
    import Cross from "@/assets/icons/cross.svg";
    import Play from "@/assets/icons/play.svg";
    import { defineProps, ref } from "vue";
    const { video } = defineProps(["video"]);

    const playVideo = ref(false);
</script>

<template>
    <div class="modal">
        <button @click="$emit('closeModal')" class="closeBttn">
                <img class="cross" :src="Cross" alt="white cross icon" />
         </button>
         <div class="content-wrapper">
            <div class="modal-left-content">
                <div v-if="!playVideo" class="placeholder-image">
                    <figure class="thumbnail-wrapper">
                        <img class="thumbnail" :src="video.thumbnail" alt="{{ video.title }}">
                        <div class="timestamp">{{ Duration.fromISO(video.duration).toFormat("mm:ss")}}</div>
                    </figure>
                    <button @click="playVideo=true" class="playBttn">
                        <img class="play-icon" :src="Play" alt="white playbutton with red background" />
                    </button>
                </div>
                <div v-if="playVideo">
                    <vue-plyr>
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.videoId"></div>
                    </vue-plyr>
                </div>
            </div>
            <div class="modal-right-content">
                <h2>{{ video.title }}</h2>
                <p>{{ video.description }}</p>
            </div>
         </div>
    </div>
</template>

<style scoped> 
    .modal {
        position: relative;
        max-width: 60vw;
        background-color: white;
        border-radius: 10px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .modal {
        color: black;
    }

    .modal h2 {
        margin: 1rem 0;
    }

    .closeBttn {
        cursor: pointer;
        border: none;
        outline: none;
        width: 2rem;
        height: 2rem;
        position:absolute;
        top: 0.5rem;
        right: 0.5rem;
        background-color:rgba(0,0,0,0.7);
        padding: 0.3rem;
        transition-duration: 0.3s;
    }

    .closeBttn:hover {
        background-color: rgba(108,122,137,0.7);
    }

    .closeBttn img {
        width: 100%;
    }

    .content-wrapper {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));

    }

    .modal-left-content {
        padding: 1rem;
    }

    .modal-right-content {
        padding: 1rem;
    }

    .thumbnail {
        width: 100%;
        filter: brightness(50%);
    }

    .thumbnail-wrapper {
        width: 100%;
        position: relative;
    }

    .playBttn {
        position: absolute;
        width: 4rem;
        height: 4rem;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
    }

    .playBttn img {
        width: 100%;
    }
</style>