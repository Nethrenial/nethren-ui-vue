<script setup lang="ts">
import { toRefs, useSlots, computed } from 'vue';
import type { NInputComponentProps, NHtmLabelProps, NHtmlDivProps, NColorPaletteKeyRaw } from '../../utils';

defineOptions({
    inheritAttrs: false
});

interface NImageInputProps extends /* @vue-ignore */ NInputComponentProps {
    modelValue: string | number;
    withVisibilityToggle?: boolean;
    errors?: string[];
    label?: string;
    wrapperAttrs?: NHtmlDivProps;
    labelAttrs?: NHtmLabelProps;
    color?: NColorPaletteKeyRaw;
    type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
}

const props = withDefaults(defineProps<NImageInputProps>(), {
    color: 'primary',
    label: undefined,
    placeholder: undefined,
    disabled: false,
    type: 'text',
    required: true,
    withVisibilityToggle: false,
    errors: () => [],
    wrapperAttrs: () => {
        return {};
    },
    labelAttrs: () => {
        return {};
    }
});

const { modelValue, label, type, errors, required, withVisibilityToggle, color, wrapperAttrs, labelAttrs } = toRefs(props);

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

if (withVisibilityToggle.value && hasRightIcon.value) {
    throw new Error("You shouldn't use both `with-visibility-toggle` and `rightIcon` slot at the same time, it will mess up with styling and honestly, would look hideous anyways!");
}
</script>

<template>
    <div class="n-input" :class="[`n--${color}`, `n-input--${color}`]" v-bind="wrapperAttrs">
        <label :for="$attrs['id'] as string" class="n-input__label" v-if="label" v-bind="labelAttrs"
            >{{ label }}
            <sup v-if="required" class="n-input__required-indicator">*</sup>
        </label>
        <div class="n-input__icon-wrap">
            <span class="n-input__left-icon" v-if="$slots['leftIcon']">
                <slot name="leftIcon"></slot>
            </span>
            <input
                :type="passwordVisibility ? 'text' : type"
                :value="modelValue"
                class="n-input__input"
                :class="[
                    withVisibilityToggle ? 'n-input__input--with-visibility-toggle' : '',
                    hasRightIcon ? 'n-input__input--with-right-icon' : '',
                    hasLeftIcon ? 'n-input__input--with-left-icon' : ''
                ]"
                @change="onChange"
                @input="onChange"
                v-bind="$attrs"
            />
        </div>
        <div v-if="errors && errors.length > 0">
            <span class="n-input__error">{{ errors[0] }}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import './image-input-styles.scss';

.n-input {
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

    &__input {
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
        height: 40px;
        background-color: transparent;

        transition: all 200ms;
        outline: 2px solid transparent;

        &--with-right-icon {
            padding-right: 40px;
        }

        &--with-visibility-toggle {
            border-radius: 0.375rem 0 0 0.375rem;
            border-right: none;
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

    &__visibility {
        outline: 2px solid transparent;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: 1px solid var(--n-component-border-color);
        cursor: pointer;
        outline: none;
        border-radius: 0 0.375rem 0.375rem 0;
        font-size: 1.25rem;
        display: grid;
        place-items: center;
    }
}
</style>
