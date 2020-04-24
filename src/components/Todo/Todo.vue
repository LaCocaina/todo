<template>
    <div id="todo">
        <TodoItem v-for="td in GET_TODO" :key="td.id" :td="td"></TodoItem>
        <div class="todo-add"><Button class="todo-btn" @click.native="add">Create new TODO</Button></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TodoItem from "@/components/Todo/TodoItem";
    import Button from "@/components/Button";

    export default {
        name: "Todo",
        components: {Button, TodoItem},
        data() {
            return {
                todo: "",
            }
        },
        computed: {
            ...mapGetters(["GET_TODO"])
        },
        methods: {
            add() {
                this.$router.push('/todo');
            }
        }
    }
</script>

<style scoped>
    #todo {
        position: relative;
        display: flex;
        flex-direction: column;
    }
</style>