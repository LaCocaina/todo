<template>
    <div id="todo-action">
        <div class="todo-action__block">
            <input v-model="title" placeholder="TODO's title">
        </div>
        <div class="todo-action__block">
            <div class="todo-action__list">
                <TodoListItem v-for="l in list" :key="l.id" :tli="l" :id="id" @addListItemProp="addListItem" @remItem="remItem"></TodoListItem>
            </div>
            <div class="todo-action__list-btn"><Button @click.native="addListItem">Add item</Button></div>
            <div class="todo-action__list-btn"><Button @click.native="save" :st="'pos'">{{ id ? "Save" : "Add"}} TODO</Button></div>
            <div class="todo-action__list-btn">
                <Button @click.native="canAccept" :st="'neu'">Cancel</Button>
                <Popup :action="cancel" @choice="can">Are sure wanna cancel?</Popup>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    import Button from "@/components/Button";
    import TodoListItem from "@/components/Todo/TodoListItem";
    import Popup from "@/components/Popup";
    export default {
        name: "TodoAction",
        components: {Popup, TodoListItem, Button},
        data() {
            return {
                title: "",
                list: [{id: 1, subj: ""}],
                id: parseInt(this.$route.params.id),
                cancel: false,
            }
        },
        methods: {
            addListItem() {
                this.list.push({id: this.list[this.list.length - 1].id + 1, subj: ""});
            },
            save() {
                if(this.id)
                    this.$store.dispatch("EDIT_TODO", {id: this.id, title: this.title, list: this.list});
                else
                    this.$store.dispatch("ADD_TODO", {title: this.title, list: this.list});
                this.$router.push("/");
            },
            remItem(n) {
                this.list = this.list.filter(m => m.id !== n);
            },
            canAccept() {
                this.cancel = true;
            },
            can(n) {
                n && this.$router.go(-1);
                this.cancel = false;
            }
        },
        computed: {
            ...mapGetters(["GET_TODO"])
        },
        mounted() {
            let res;
            if (this.id) {
                res = this.GET_TODO.find(
                    n => n.id === this.id
                );
                this.title = res.title;
                this.list = res.list;
            }
        }
    }
</script>

<style scoped>
    #todo-action {
        display: flex;
        flex-direction: column;
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
    .todo-action__list-btn {
        margin-bottom: 15px;
        position: relative;
    }
</style>