<script setup lang="ts">
import { ref, toRefs } from "vue";
import { type NComponentProps } from "../../utils";
import XMark from "../builtin-icons/XMark.vue";


interface NModalProps extends NComponentProps {
    closeOnOutsideClick?: boolean;
}

const props = withDefaults(defineProps<NModalProps>(), {
    color: 'primary',
    closeOnOutsideClick: true
});

const { closeOnOutsideClick } = toRefs(props)



const isOpen = ref(false);
const shaking = ref(false);

function openModal() {
    isOpen.value = true;
}

function closeModal() {
    isOpen.value = false;
}

function toggleModal() {
    isOpen.value = !isOpen.value;
}

defineExpose({
    openModal,
    closeModal,
    toggleModal
});

function onOutSideClick() {
    if (closeOnOutsideClick.value) {
        closeModal()
    } else {
        shaking.value = true;
        setTimeout(() => {
            shaking.value = false;
        }, 500);
    }
}

</script>


<template>
    <Teleport to="body">
        <Transition name="modal">
            <div class="modal" v-if="isOpen" :class="shaking ? 'modal--shaking' : ''">
                <header class="modal-header">
                    <h3>
                        <slot name="modal-header"></slot>
                    </h3>
                    <button class="modal__close-btn" @click="closeModal">
                        <XMark />
                    </button>
                </header>
                <div class="modal-footer">
                    <slot name="modal-body"></slot>
                </div>
                <footer class="modal-footer">
                    <slot name="modal-footer"></slot>
                </footer>
            </div>
        </Transition>
        <Transition name="modal-overlay" @click="onOutSideClick">
            <div class="modal-overlay" v-if="isOpen">
            </div>
        </Transition>
    </Teleport>
</template>


<style lang="scss">
@import "./modal-styles.scss";

.modal {
    /* height: 400px; */
    min-width: 200px;
    background-color: #fff;
    color: #222;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    z-index: 100;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;

    &--shaking {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0% {
            transform: translate(-50%, -50%) scale(1);
        }
        25% {
            transform: translate(-50%, -50%) scale(1.02);
        }
        50% {
            transform: translate(-50%, -50%) scale(1);
        }
        75% {
            transform: translate(-50%, -50%) scale(1.02);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }



    &__close-btn {
        outline: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        display: grid;
        place-items: center;
        background-color: transparent;

        svg {
            transition: all 0.2s ease-in-out;
        }


        &:hover {
            svg {
                transform: rotate(180deg);
            }
        }
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
    transform: translate(-50%, -40%) scale(0.9);
    opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}


.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}


.modal-overlay-enter-active,
.modal-overlay-leave-active {
    transition: all 0.3s ease-in-out;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
    opacity: 0;
}

.modal-overlay-enter-to,
.modal-overlay-leave-from {
    opacity: 1;
}


.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
}

.modal-header h3 {
    font-size: 1.2rem;
    font-weight: bold;
}

.modal-header .modal__close-btn svg {
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out
}

.modal-header .modal__close-btn svg:hover {
    transform: rotate(180deg);
}
</style>
