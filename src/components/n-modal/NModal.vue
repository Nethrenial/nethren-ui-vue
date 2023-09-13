<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { NHtmlDivProps, type NComponentProps, NColorPaletteKeyRaw } from '../../utils';
import XMark from '../builtin-icons/XMark.vue';

interface NModalProps extends /* @vue-ignore */ NComponentProps {
    closeOnOutsideClick?: boolean;
    witchCloseButton?: boolean;
    lockScroll?: boolean;
    modelAttrs?: NHtmlDivProps;
    modelOverlayAttrs?: NHtmlDivProps;
    color?: NColorPaletteKeyRaw;
}

const props = withDefaults(defineProps<NModalProps>(), {
    color: 'primary',
    closeOnOutsideClick: true,
    lockScroll: false,
    withCloseButton: true,
    modelAttrs: () => ({}),
    modelOverlayAttrs: () => ({})
});

const { closeOnOutsideClick, lockScroll, modelAttrs, modelOverlayAttrs } = toRefs(props);

const isOpen = ref(false);
const shaking = ref(false);
const scrollbarWidth = ref(0);

function openModal() {
    isOpen.value = true;
    if (lockScroll.value) {
        // document.body.style.overflow = 'hidden';
        // get current width of scrollbar
        scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth.value}px`;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    isOpen.value = false;
    if (lockScroll.value) {
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }, 200);
    }
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
        closeModal();
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
        <Transition name="n-modal">
            <div class="n-modal" v-if="isOpen" :class="shaking ? 'n-modal--shaking' : ''" v-bind="modelAttrs">
                <header class="n-modal-header">
                    <slot name="modal-header"></slot>
                    <button class="n-modal__close-btn" @click="closeModal">
                        <XMark />
                    </button>
                </header>
                <div class="n-modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <footer class="n-modal-footer">
                    <slot name="modal-footer"></slot>
                </footer>
            </div>
        </Transition>
        <Transition name="n-modal-overlay" @click="onOutSideClick">
            <div class="n-modal-overlay" v-if="isOpen" v-bind="modelOverlayAttrs"></div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
@import './modal-styles.scss';

.n-modal {
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
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        vertical-align: baseline;
        background: transparent;
        box-sizing: border-box;

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

.n-modal-enter-active,
.n-modal-leave-active {
    transition: all 0.2s ease-in-out;
}

.n-modal-enter-from,
.n-modal-leave-to {
    transform: translate(-50%, -40%) scale(0.9);
    opacity: 0;
}

.n-modal-enter-to,
.n-modal-leave-from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}

.n-modal-overlay {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.n-modal-overlay-enter-active,
.n-modal-overlay-leave-active {
    transition: all 0.2s ease-in-out;
}

.n-modal-overlay-enter-from,
.n-modal-overlay-leave-to {
    opacity: 0;
}

.n-modal-overlay-enter-to,
.n-modal-overlay-leave-from {
    opacity: 1;
}

.n-modal-header {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    background-color: red;
}

.n-modal-header .n-modal__close-btn svg {
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;
}

.n-modal-header .n-modal__close-btn svg:hover {
    transform: rotate(180deg);
}

.n-modal-body {
    background-color: yellow;
}

.n-modal-footer {
    background-color: green;
}
</style>
