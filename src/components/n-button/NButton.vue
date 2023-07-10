<script setup lang="ts">
import { StyleValue, computed, toRefs } from 'vue';
import { isBuiltinColorName, type NComponentProps } from "../../utils"
import CircleSpinner from '../builin-icons/spinners/CircleSpinner.vue'


interface NButtonProps extends NComponentProps {
    lable?: string,
    mode?: 'solid' | 'outline' | 'text',
    isLoading?: boolean,
    loadingText?: string,
    // TODO: add different sizes
}

const props = withDefaults(defineProps<NButtonProps>(), {
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
    <button class="n-button" :class="[`n--${color}`, `n-button--${color}`, `n-button--${mode}`, isLoading ? 'n-button--loading' : '']"
        :style="computedStyle">
        <circle-spinner v-if="isLoading" class="n-button__spinner" />
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
        background-color: var(--n-component-normal-bg-color);
        color: var(--n-component-normal-text-color);

        &:hover {
            background-color: var(--n-component-hover-bg-color);
        }

        &:active {
            background-color: var(--n-component-active-bg-color);
        }

        &:disabled {
            background-color: var(--n-component-disabled-bg-color);
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-component-loading-bg-color);
        }
    }

    &--outline {
        background-color: transparent;
        color: var(--n-component-normal-bg-color);
        border: 1px solid var(--n-component-normal-bg-color);

        &:hover {
            background-color: var(--n-component-outline-hover-bg-color);
        }

        &:active {
            background-color: var(--n-component-outline-active-bg-color);
        }

        &:disabled {
            background-color: transparent;
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-component-outline-hover-bg-color);
        }
    }

    &--text {
        background-color: transparent;
        color: var(--n-component-normal-bg-color);

        &:hover {
            background-color: var(--n-component-outline-hover-bg-color);
        }

        &:active {
            background-color: var(--n-component-outline-active-bg-color);
        }

        &:disabled {
            background-color: transparent;
        }

        &.n-button--loading {
            cursor: not-allowed;
            background-color: var(--n-component-outline-hover-bg-color);
        }
    }




    &__spinner {
        width: 1.5rem;
        height: 1.5rem;
    }
}
</style>
