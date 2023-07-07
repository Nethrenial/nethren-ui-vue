<script setup lang="ts">
import { StyleValue, computed, toRefs } from 'vue';
import { isBuiltinColorName, type NColorPaletteKeyRaw } from "../../utils"

const props = withDefaults(defineProps<{
    lable?: string,
    color?: NColorPaletteKeyRaw,
    mode?: 'solid' | 'outline' | 'text',
    isLoading?: boolean,
    loadingText?: string,
}>(), {
    lable: undefined,
    color: 'primary',
    mode: 'solid',
    isLoading: false,
    loadingText: undefined,
})

const { lable, color, mode, isLoading } = toRefs(props)


const computedStyle = computed<StyleValue>(() => {
    return !isBuiltinColorName(color.value) ? {
        // set colors for solid buttons
        '--n-button-solid-bg': 'var(--n-color-primary-400)',
        '--n-button-solid-bg-hover': 'var(--n-color-primary-500)',
        '--n-button-solid-bg-active': 'var(--n-color-primary-600)',
        '--n-button-solid-bg-disabled': 'var(--n-color-primary-200)',
        '--n-button-solid-text': 'var(--n-color-primary-50)',

        // set colors for outline buttons
        '--n-button-outline-bg': 'transparent',
        '--n-button-outline-bg-hover': 'var(--n-color-primary-50)',
        '--n-button-outline-bg-active': 'var(--n-color-primary-100)',
        '--n-button-outline-bg-disabled': 'transparent',
        '--n-button-outline-text': 'var(--n-color-primary-400)',
        '--n-button-outline-outline': 'var(--n-color-primary-400)',

        // set colors for text buttons
        '--n-button-text-bg': 'transparent',
        '--n-button-text-bg-hover': 'var(--n-color-primary-50)',
        '--n-button-text-bg-active': 'var(--n-color-primary-100)',
        '--n-button-text-bg-disabled': 'transparent',
        '--n-button-text-text': 'var(--n-color-primary-400)',
    } : {}
})

</script>


<template>
    <button class="n-button" :class="[`n-button--${color}`, `n-button--${mode}`, isLoading ? 'n-button--loading' : '']"
        :style="computedStyle">
        <template v-if="isLoading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="n-button__spinner">
                <path fill="currentColor"
                    d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                        values="0 12 12;360 12 12" />
                </path>
            </svg>
        </template>
        <slot name="leftIcon" v-if="!isLoading" />
        <slot v-if="!isLoading || (isLoading && !loadingText)">

            {{
                lable ? lable : 'Please add inner content or a lable prop'
            }}
        </slot>
        {{
            isLoading && loadingText ? loadingText : ''
        }}
        <slot name="rightIcon" v-if="!isLoading" class="n-button__icon" />
    </button>
</template>


<style lang="scss">
@import "./button-styles.scss";

.n-button {

    // resetting unneeded browser styles
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    text-transform: none;
    -webkit-appearance: button;
    appearance: button;
    background-color: transparent;
    background-image: none;
    cursor: pointer;
    border: none;

    &:disabled {
        cursor: not-allowed;
    }


    // border styling
    border-radius: 0.375rem;

    // padding
    padding-left: 1rem;
    padding-right: 1rem;

    // size
    height: 2.5rem;

    // transition
    transition: all 200ms;

    // flex
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &--solid {
        background-color: var(--n-button-solid-bg);
        color: var(--n-button-solid-text);

        &:hover {
            background-color: var(--n-button-solid-bg-hover);
        }

        &:active {
            background-color: var(--n-button-solid-bg-active);
        }

        &:disabled {
            background-color: var(--n-button-solid-bg-disabled);
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-button-solid-bg-loading);
        }
    }

    &--outline {
        background-color: var(--n-button-outline-bg);
        color: var(--n-button-outline-text);
        border: 1px solid var(--n-button-outline-outline);

        &:hover {
            background-color: var(--n-button-outline-bg-hover);
        }

        &:active {
            background-color: var(--n-button-outline-bg-active);
        }

        &:disabled {
            background-color: var(--n-button-outline-bg-disabled);
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-button-outline-bg-loading);
        }
    }

    &--text {
        background-color: var(--n-button-text-bg);
        color: var(--n-button-text-text);

        &:hover {
            background-color: var(--n-button-text-bg-hover);
        }

        &:active {
            background-color: var(--n-button-text-bg-active);
        }

        &:disabled {
            background-color: var(--n-button-text-bg-disabled);
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-button-text-bg-loading);
        }
    }




    &__spinner {
        width: 1.5rem;
        height: 1.5rem;
    }
}
</style>
