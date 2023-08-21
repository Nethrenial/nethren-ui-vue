<script setup lang="ts">
import { toRefs } from 'vue';
import { NColorPaletteKeyRaw, type NComponentProps } from '../../utils';
import CircleSpinner from '../builtin-icons/spinners/CircleSpinner.vue';

interface NButtonProps extends /* @vue-ignore */ NComponentProps {
    mode?: 'solid' | 'outline' | 'text';
    color?: NColorPaletteKeyRaw;
    isLoading?: boolean;
    loadingText?: string;
    size?: 'sm' | 'md' | 'normal' | 'lg' | 'xl';
    // TODO: add different sizes
}

const props = withDefaults(defineProps<NButtonProps>(), {
    color: 'primary',
    mode: 'solid',
    isLoading: false,
    loadingText: undefined,
    size: 'normal'
});

const { color, mode, isLoading, loadingText, size } = toRefs(props);
</script>

<template>
    <button class="n-button" :class="[`n--${color}`, `n-button--${color}`, `n-button--${size}`, `n-button--${mode}`, isLoading ? 'n-button--loading' : '']">
        <circle-spinner v-if="isLoading" class="n-button__spinner" />
        <slot name="leftIcon" v-if="!isLoading" />
        <slot v-if="!isLoading || (isLoading && !loadingText)"> </slot>
        {{ isLoading && loadingText ? loadingText : '' }}
        <slot name="rightIcon" v-if="!isLoading" class="n-button__icon" />
    </button>
</template>

<style lang="scss">
@import './button-styles.scss';

.n-button {
    // resetting unneeded browser styles
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
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

    &--sm {
        padding: 0 0.5rem;
        height: 1.5rem;
        font-size: 0.75rem;
    }

    &--md {
        padding: 0 0.75rem;
        height: 2rem;
        font-size: 0.875rem;
    }

    &--normal {
        padding: 0 1rem;
        height: 2.5rem;
    }

    &--lg {
        padding: 0 1.25rem;
        height: 3rem;
        font-size: 1.125rem;
    }

    &--xl {
        padding: 0 1.5rem;
        height: 3.5rem;
        font-size: 1.25rem;
    }

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
