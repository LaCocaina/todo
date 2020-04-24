<template>
    <div class="button">
        <button :class="st || ''"><slot></slot></button>
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: ["st"]
    }
</script>

<style scoped>
    .button, button {
        width: 100%;
    }
    button {
        padding: 15px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
    .pos {
        border: 1px solid #009d50;
        background: #00b567;
        color: #fff;
    }
    .neg {
        border: 1px solid #9d0049;
        background: #b50046;
        color: #fff;
    }
    .neu {
         border: 1px solid #9d9500;
         background: #b59d00;
         color: #fff;
    }
</style>