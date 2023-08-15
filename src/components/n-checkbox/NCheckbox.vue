<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { NComponentProps } from "../../utils"
import AnimatedCheckmark from "../builtin-icons/AnimatedCheckmark.vue"

defineOptions({
    inheritAttrs: false
})

interface NCheckboxProps extends NComponentProps {
    modelValue: boolean,
}


const props = withDefaults(defineProps<NCheckboxProps>(), { color: 'primary' })


const { modelValue } = toRefs(props)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()


function toggleCheckbox(event: MouseEvent | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
        if (event.repeat) return
        startHold()
    }
    emit('update:modelValue', !modelValue.value)
}

const isCheckboxHolding = ref(false)

function startHold() {
    isCheckboxHolding.value = true
}

function endHold() {
    isCheckboxHolding.value = false
}

</script>

<template>
    <label class="n-checkbox"
        :class="[`n--${color}`, `n-checkbox--${color}`, modelValue ? `n-checkbox--checked` : ``, isCheckboxHolding ? `n-checkbox--hold` : ``]"
        tabindex="0" role="checkbox" :aria-label="($attrs['aria-label'] as string)" :aria-checked="modelValue"
        @keydown.enter="toggleCheckbox" @keyup.enter="endHold" @keyup.space="endHold" @keydown.space="toggleCheckbox"
        @click="toggleCheckbox" @mousedown="startHold" @mouseup="endHold" :for="($attrs['id'] as string)">
        <AnimatedCheckmark class="n-checkbox__check" v-if="modelValue"
            stroke-color="var(--n-component-normal-text-color)" />
        <input type="checkbox" class="n-checkbox__input" v-bind="$attrs" aria-invalid="false" aria-disabled="false"
            disabled :value="modelValue" aria-label="">
    </label>
</template>


<style lang="scss">
@import "./checkbox-styles.scss";

.n-checkbox {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 7px;
    background-color: var(--n-component-inactive-bg-color);
    position: relative;
    transition: all 200ms;
    cursor: pointer;
    z-index: 0;


    &::after {
        content: '';
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 7px;
        transform-origin: left top;
        transform: scale(0.6) translate(-50%, -50%);
        background-color: var(--n-component-inactive-bg-color);
        transition: all 200ms;
        z-index: -1;
    }

    &--checked {
        &::after {
            background-color: var(--n-component-normal-bg-color);
            transform: scale(1) translate(-50%, -50%);
        }
    }

    &__check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

    &__input {
        border: none;
        outline: none;
        clip: rect(0px, 0px, 0px, 0px);
        height: 0px;
        width: 0px;
        margin: 0px;
        padding: 0px;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 0;
    }

}
</style>
