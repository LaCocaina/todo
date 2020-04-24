<template>
    <div class="todo-action__list-item">
        <div class="todo-action__list-item-subj">
            <input class="todo-action__check" type="checkbox" v-model="tli.isDone" @click="check">
            <input class="todo-action__subj" v-model="tli.subj" @keyup.enter="$emit('addListItemProp')">
        </div>
        <div class="todo-action__list-item-btn"><Button @click.native="remListItemAccept">Remove</Button></div>
        <Popup :action="remove" @choice="rem">Are you sure wanna delete this?</Popup>
    </div>
</template>

<script>
    import Popup from "@/components/Popup";
    import Button from "@/components/Button";
    export default {
        name: "TodoListItem",
        components: {Button, Popup},
        props: ["tli", "id"],
        data() {
            return {
                remove: false,
            }
        },
        methods: {
            remListItemAccept() {
                this.remove = true;
            },
            rem(n) {
                n && this.$store.dispatch("REM_TODO_LIST_ITEM", {id: this.id, item: this.tli.id});
                this.remove = false;
                this.$emit("remItem", this.tli.id);
            },
            check() {

            }
        }
    }
</script>

<style scoped>
    .todo-action__list-item {
        position: relative;
        display: flex;
        flex-direction: row;
    }
    .todo-action__list-item-subj {
        width: 90%;
        position: relative;
    }
    .todo-action__list-item-btn {
        margin-left: 5px;
    }
    .todo-action__subj {
        margin-left: 35px;
    }
    .todo-action__check {
        position: absolute;
        left: 5px;
        top: 15px;
    }
    input {
        width: -webkit-fill-available;
        width: -moz-available;
        padding: 15px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>