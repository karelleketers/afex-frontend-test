<script setup>
    import { Duration } from "luxon"
    import { defineProps } from "vue";
    import Cross from "@/assets/icons/cross.svg";
    const { video } = defineProps(["video"]);
</script>

<template>
    <div class="card">
        <figure>
            <img class="thumbnail" :src="video.thumbnail" alt="{{ video.title }}">
            <button @click.stop="$emit('deleteVideo', video.id)" class="dltBttn">
                <img class="cross" :src="Cross" alt="white cross icon" />
            </button>
            <div class="timestamp">{{ Duration.fromISO(video.duration).toFormat("mm:ss")}}</div>
        </figure>
    </div>
</template>

<style>
    .card {
        width: 310px;
        overflow: hidden;
        border-radius: 2%;
        box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
        margin-right: 20px;
        margin-bottom: 35px;
        cursor: pointer;
    }

    .card figure {
        position: relative;
        width: 100%;
        height: 190px;
        margin: 0;
    }

    .card .thumbnail {
        width: 100%;
        height: 100%;
    }

    .card .card-text {
        padding: 0 5px;
    }

    .card .card-text h2 {
        font-weight: bold;
    }

    .timestamp {
        position:absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        background-color:rgba(0,0,0,0.7);
        color:#fff;
        padding: 2px 4px
    }

    .dltBttn {
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

    .dltBttn:hover {
        background-color: rgba(108,122,137,0.7);
    }

    .dltBttn img {
        width: 100%;
    }
</style>