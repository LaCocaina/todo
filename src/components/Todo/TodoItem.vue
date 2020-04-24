<template>
    <div class="todo-item__wrapper">
        <div v-if="td" :class="(td.isDone ? 'todo-item__done' : '') + ' todo-item'">
            <div class="todo-item__el todo-item__text">
                <div class="todo-item__title">
                    <input class="todo-item__check" type="checkbox" v-model="isDone" @click="check">
                    {{ td.title }}
                </div>
                <div class="todo-item__list">
                    <ol>
                        <TodoList v-for="tdl in td.list" :tdl="tdl" :key="tdl.id"></TodoList>
                    </ol>
                </div>
            </div>
            <div class="todo-item__el todo-item__opt">
                <div class="todo-item__opt-btn"><Button @click.native="edit">Edit</Button></div>
                <div class="todo-item__opt-btn"><Button @click.native="remAccept">Remove</Button></div>
            </div>
        </div>
        <Popup :action="remove" @choice="rem">Are you sure wanna delete whole list?</Popup>
    </div>
</template>

<script>
    import Popup from "@/components/Popup";
    import TodoList from "@/components/Todo/TodoList";
    import Button from "@/components/Button";
    export default {
        name: "TodoItem",
        components: {Button, TodoList, Popup},
        props: ["td"],
        data() {
            return {
                isDone: this.td.isDone,
                remove: false,
            }
        },
        methods: {
            remAccept() {
                this.remove = true;
            },
            rem(n) {
                n ? this.$store.dispatch("REM_TODO", this.td.id) : (this.remove = false);
            },
            check() {
                this.$store.dispatch("CHK_TODO", this.td.id);
            },
            edit() {
                this.$router.push('/todo/' + this.td.id);
            }
        }
    }
</script>

<style scoped>
    .todo-item__wrapper {
        position: relative;
    }
    .todo-item {
        position: relative;
        min-height: 35px;
        bottom: 0;
        padding: 15px;
        margin-bottom: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: 0 0 0 transparent;
        transition: .1s all ease-in-out;
    }
    .todo-item:hover {
        bottom: 2px;
        box-shadow: 0 2px 5px #ddd;
    }
    .todo-item, .todo-item__el {
        display: flex;
    }
    .todo-item__el {
        align-items: center;
    }
    .todo-item__text {
        flex: 0 0 80%;
        flex-direction: column;
        align-items: flex-start;
    }
    .todo-item__title {
        font-size: 20px;
        font-weight: bold;
    }
    .todo-item__opt {
        flex: 0 0 20%;
        justify-content: flex-end;
        flex-direction: column;
    }
    .todo-item__opt-btn {
        margin-bottom: 5px;
        width: 100%;
    }
    .todo-item__done {
        opacity: .33;
    }
    .todo-item__check {
        margin-right: 15px;
    }
    .todo-item__list {
        flex-direction: column;
        flex: 0 0 100%;
    }
</style>