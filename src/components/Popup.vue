<template>
    <div id="popup-wrapper" :class="action ? 'display' : 'hidden'">
        <div id="popup">
            <div class="popup__block"><slot></slot></div>
            <div class="popup__block">
                <div class="popup__block__btn-yes">
                    <Button @click.native="yes" :st="'pos'">Yes</Button>
                </div>
                <div class="popup__block__btn-no">
                    <Button @click.native="no" :st="'neg'">No</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from "@/components/Button";
    export default {
        name: "Popup",
        components: {Button},
        props: ['action'],
        methods: {
            yes() {
                this.$emit('choice', true);
            },
            no() {
                this.$emit('choice', false);
            }
        }
    }
</script>

<style scoped>
    .display {
        display: flex;
    }
    .hidden {
        display: none;
    }
    #popup {
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
    }
    #popup-wrapper {
        position: absolute;
        right: -30px;
        bottom: -75px;
        justify-content: center;
        align-items: center;
        z-index: 2;
        box-shadow: 0 5px 5px #ccc;
        border-radius: 5px;
    }
    .popup__block {
        display: flex;
        flex-direction: row;
        padding: 15px 30px;
    }
    .popup__block__btn-yes, .popup__block__btn-no {
        width: 100%;
    }
    .popup__block__btn-yes {
        margin-right: 5px;
    }
    .popup__block__btn-no {
        margin-left: 5px;
    }
</style>