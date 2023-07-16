<script setup lang="ts">
import { toRefs } from "vue";
import type { NComponentProps } from "../../utils"

interface NInputProps extends NComponentProps {
    modelValue: string | number,
    id: string,
    name: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'date' | 'time',
    errors?: string[],
    required?: boolean,
}


const props = withDefaults(defineProps<NInputProps>(),
    {
        color: 'primary',
        label: undefined,
        placeholder: undefined,
        disabled: false,
        type: 'text',
        required: true
    })


const { modelValue, id, name, label, placeholder, disabled, type, errors, required } = toRefs(props)

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()


function onChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}


</script>

<template>
    <div class="n-input" :class="[`n--${color}`, `n-input--${color}`]">
        <label :for="id" class="n-input__label" v-if='label'>{{ label }}
            <sup v-if="required" class="n-input__required-indicator">*</sup>
        </label>
        <input :type="type" :name="name" :id="id" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
            class="n-input__input" @change="onChange" @input="onChange">
        <div v-if="errors && errors.length > 0">
            <span class="n-input__error">{{ errors[0] }}</span>
        </div>
    </div>
    <label>
    </label>
</template>


<style lang="scss">
@import "./input-styles.scss";

.n-input {

    display: flex;
    flex-direction: column;

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
}
</style>
