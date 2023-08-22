<script setup lang="ts">
import { toRefs, ref } from 'vue';
import type { NInputComponentProps, NHtmLabelProps, NHtmlDivProps, NColorPaletteKeyRaw } from '../../utils';
import OpenEye from '../builtin-icons/OpenEye.vue';
import ClosedEye from '../builtin-icons/ClosedEye.vue';

defineOptions({
    inheritAttrs: false
});

interface NInputProps extends /* @vue-ignore */ NInputComponentProps {
    modelValue: string | number;
    withVisibilityToggle?: boolean;
    errors?: string[];
    label?: string;
    wrapperAttrs?: NHtmlDivProps;
    labelAttrs?: NHtmLabelProps;
    color?: NColorPaletteKeyRaw;
    type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
}

const props = withDefaults(defineProps<NInputProps>(), {
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

const passwordVisibility = ref(false);

function togglePasswordVisibility() {
    passwordVisibility.value = !passwordVisibility.value;
}
</script>

<template>
    <div class="n-input" :class="[`n--${color}`, `n-input--${color}`]" v-bind="wrapperAttrs">
        <label :for="$attrs['id'] as string" class="n-input__label" v-if="label" v-bind="labelAttrs"
            >{{ label }}
            <sup v-if="required" class="n-input__required-indicator">*</sup>
        </label>
        <input
            :type="passwordVisibility ? 'text' : type"
            :value="modelValue"
            class="n-input__input"
            :class="[withVisibilityToggle ? 'n-input__input--visibility' : '']"
            @change="onChange"
            @input="onChange"
            v-bind="$attrs"
        />
        <div v-if="errors && errors.length > 0">
            <span class="n-input__error">{{ errors[0] }}</span>
        </div>
        <button type="button" class="n-input__visibility" v-if="withVisibilityToggle" @click="togglePasswordVisibility">
            <open-eye v-if="passwordVisibility" />
            <closed-eye v-else />
        </button>
    </div>
</template>

<style lang="scss">
@import './input-styles.scss';

.n-input {
    display: flex;
    flex-direction: column;
    position: relative;

    &__input {
        font-family: inherit;
        font-size: 100%;
        font-weight: inherit;
        line-height: inherit;
        color: inherit;
        margin: 0;
        padding: 0 1rem;
        margin-top: 0.5rem;

        // custom styling

        border-radius: 0.375rem;
        border: 1px solid var(--n-component-border-color);
        height: 40px;
        background-color: transparent;

        transition: all 200ms;
        outline: 2px solid transparent;

        &--visibility {
            padding-right: 3.5rem;
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

    &__visibility {
        position: absolute;
        right: 1px;
        top: 1.7rem;
        width: 40px;
        border: none;
        color: var(--n-component-normal-bg-color);
        background-color: transparent;
        border-left: 1px solid var(--n-component-inactive-bg-color);
        cursor: pointer;
        outline: none;
        height: 40px;
        border-radius: 0 0.375rem 0.375rem 0;
        font-size: 1.25rem;
        display: grid;
        place-items: center;
    }
}
</style>
