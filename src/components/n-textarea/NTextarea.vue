<script setup lang="ts">
import { toRefs, useSlots, computed } from 'vue';
import type { NTextareaComponentProps, NHtmLabelProps, NHtmlDivProps, NColorPaletteKeyRaw } from '../../utils';

defineOptions({
    inheritAttrs: false
});

interface NTextareaProps extends /* @vue-ignore */ NTextareaComponentProps {
    modelValue: string | number;
    errors?: string[];
    label?: string;
    wrapperAttrs?: NHtmlDivProps;
    labelAttrs?: NHtmLabelProps;
    color?: NColorPaletteKeyRaw;
}

const props = withDefaults(defineProps<NTextareaProps>(), {
    color: 'primary',
    label: undefined,
    placeholder: undefined,
    disabled: false,
    required: true,
    errors: () => [],
    wrapperAttrs: () => {
        return {};
    },
    labelAttrs: () => {
        return {};
    }
});

const { modelValue, label, errors, required, color, wrapperAttrs, labelAttrs } = toRefs(props);

const emit = defineEmits<{
    'update:modelValue': [value: string | number];
}>();

function onChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
}

const slots = useSlots();

const hasRightIcon = computed(() => {
    return slots.rightIcon !== undefined;
});

const hasLeftIcon = computed(() => {
    return slots.leftIcon !== undefined;
});
</script>

<template>
    <div class="n-textarea" :class="[`n--${color}`, `n-textarea--${color}`]" v-bind="wrapperAttrs">
        <label :for="$attrs['id'] as string" class="n-textarea__label" v-if="label" v-bind="labelAttrs"
            >{{ label }}
            <sup v-if="required" class="n-textarea__required-indicator">*</sup>
        </label>
        <div class="n-textarea__icon-wrap">
            <span class="n-textarea__left-icon" v-if="$slots['leftIcon']">
                <slot name="leftIcon"></slot>
            </span>
            <textarea
                :value="modelValue"
                class="n-textarea__textarea"
                :class="[hasRightIcon ? 'n-textarea__textarea--with-right-icon' : '', hasLeftIcon ? 'n-textarea__textarea--with-left-icon' : '']"
                @change="onChange"
                @input="onChange"
                v-bind="$attrs"
            />
            <span class="n-textarea__right-icon" v-if="$slots['rightIcon']">
                <slot name="rightIcon"></slot>
            </span>
        </div>
        <div v-if="errors && errors.length > 0">
            <span class="n-textarea__error">{{ errors[0] }}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import './textarea-styles.scss';

.n-textarea {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;

    &__icon-wrap {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        position: relative;
    }

    &__textarea {
        font-family: inherit;
        font-size: 100%;
        font-weight: inherit;
        line-height: inherit;
        color: inherit;
        margin: 0;
        padding: 0 1rem;
        width: 100%;

        // custom styling

        border-radius: 0.375rem;
        border: 1px solid var(--n-component-border-color);
        background-color: transparent;

        transition: all 200ms;
        outline: 2px solid transparent;

        &--with-right-icon {
            padding-right: 40px;
        }

        &--with-left-icon {
            padding-left: 40px;
        }

        &:focus {
            outline: 2px solid var(--n-component-normal-bg-color);
            border-color: rgba(0, 0, 0, 0);
        }

        &::placeholder {
            opacity: 1;
        }
    }

    &__error {
        color: var(--n-color-danger-400);
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1rem;
    }

    &__required-indicator {
        color: var(--n-color-danger-400);
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1rem;
    }

    &__label {
        width: max-content;
    }

    &__right-icon {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: transparent;
        border-right: none;
        cursor: pointer;
        outline: none;
        border-radius: 0 0.375rem 0.375rem 0;
        font-size: 1.25rem;
        display: grid;
        place-items: center;
    }

    &__left-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: transparent;
        border-right: none;
        cursor: pointer;
        outline: none;
        border-radius: 0.375rem 0 0 0.375rem;
        font-size: 1.25rem;
        display: grid;
        place-items: center;
    }
}
</style>
