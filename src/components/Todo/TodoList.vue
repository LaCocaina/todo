<template>
    <li :class="(tdl.isDone && 'done') + ' todo-list__item'">
        {{ tdl.subj }}
    </li>
</template>

<script>
    export default {
        name: "TodoList",
        props: ['tdl'],
    }
</script>

<style scoped>
    .todo-list__item {
        padding-bottom: 10px;
    }
    .done {
        opacity: .33;
        text-decoration: line-through;
    }
</style>