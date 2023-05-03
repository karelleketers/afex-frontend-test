<script setup>
    import Cross from "@/assets/icons/cross.svg";
    import { defineProps } from "vue";
    const { video } = defineProps(["video"]);
</script>

<template>
    <div class="modal">
        <button @click="$emit('closeModal')" class="closeBttn">
                <img class="cross" :src="Cross" alt="white cross icon" />
         </button>
         <div class="content-wrapper">
            <div class="content-wrapper-heading">
                <h3>¿Seguro que quieres eliminar este video?</h3>
            </div>
            <div class="delete-buttons">
                <button @click="$emit('closeModal')" class="cancelBttn">
                    Cancelar
                </button>
                <button @click="$emit('confirmDelete', )" class="confirmBttn">
                    Eliminar
                </button>
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

    .contentWrapper {
        margin-top: 2rem;
        display: flex;
    }

    .conten-wrapper {
        width: 100%;
    }

    .content-wrapper-heading {
        width: 100%;
    }

    .delete-buttons {
        width: 100%;
        justify-content: flex-end;
    }

    .delete-buttons button {
        width: 10rem;
        margin: 1rem;
        border-radius: 10px;
        padding: 0.75rem;
        border: none;
        outline: none;
        transition-duration: 0.3s;
        cursor: pointer;
    }

    .cancelBttn {
        border: solid blue;
        color: blue;
    }

    .cancelBttn:hover {
        opacity: 0.7;
    }

    .confirmBttn {
        background-color: blue;
        color: white;
    }

    .confirmBttn:hover {
        opacity: 0.7;
    }
</style>