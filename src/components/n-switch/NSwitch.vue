<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { NColorPaletteKeyRaw, type NComponentProps } from '../../utils';

defineOptions({
    inheritAttrs: false
});

interface NSwitchProps extends /* @vue-ignore */ NComponentProps {
    modelValue: boolean;
    color?: NColorPaletteKeyRaw;
    // TODO: add different sizes, disabled state, loading state
}

const props = withDefaults(defineProps<NSwitchProps>(), {
    color: 'primary'
});

const { modelValue, color } = toRefs(props);

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

function toggleSwitch(event: MouseEvent | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
        if (event.repeat) return;
        startHold();
    }
    emit('update:modelValue', !modelValue.value);
}

const isSwitchHolding = ref(false);
const switchHoldDirection = ref<'left' | 'right'>('right');

function startHold() {
    isSwitchHolding.value = true;
    if (modelValue.value) {
        switchHoldDirection.value = 'right';
    } else {
        switchHoldDirection.value = 'left';
    }
}

function endHold() {
    isSwitchHolding.value = false;
}

const switchHoldModifier = computed(() => {
    if (isSwitchHolding.value) {
        return `n-switch--hold-${switchHoldDirection.value}`;
    }
    return '';
});
</script>

<template>
    <label
        class="n-switch"
        :class="[`n--${color}`, `n-switch--${color}`, modelValue ? `n-switch--checked` : ``, isSwitchHolding ? `n-switch--hold` : ``, switchHoldModifier]"
        tabindex="0"
        role="switch"
        :aria-label="$attrs['aria-label'] as string"
        :aria-checked="modelValue"
        @keydown.enter="toggleSwitch"
        @keyup.enter="endHold"
        @keyup.space="endHold"
        @keydown.space="toggleSwitch"
        @click="toggleSwitch"
        @mousedown="startHold"
        @mouseup="endHold"
        :for="$attrs['id'] as string"
    >
        <input type="checkbox" class="n-switch__input" aria-invalid="false" aria-disabled="false" disabled :value="modelValue" v-bind="$attrs" aria-label="" />
        <span class="n-switch__thumb"></span>
    </label>
</template>

<style lang="scss">
@import './switch-styles.scss';

.n-switch {
    position: relative;
    display: inline-block;
    background-color: var(--n-component-inactive-bg-color);
    border-radius: 1.3rem;
    height: 1.8rem;
    width: 3rem;
    cursor: pointer;
    overflow: hidden;
    z-index: 0;
    transition: 200ms all;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-100%);
        transition: all 200ms;
        border-radius: 1.3rem;
        background-color: var(--n-component-normal-bg-color);
        z-index: -1;
    }

    &--checked {
        &::after {
            transform: translateX(0%);
        }

        & .n-switch__thumb {
            left: calc(100% - 1.55rem);
        }
    }

    &--hold {
        transform: scale(0.95);

        &-right {
            & .n-switch__thumb {
                transform: translateX(-0.35rem) translateY(-0.65rem);
                width: 1.65rem;
            }
        }

        &-left {
            & .n-switch__thumb {
                width: 1.65rem;
            }
        }
    }

    &__thumb {
        height: 1.3rem;
        width: 1.3rem;
        border-radius: 0.65rem;
        background-color: var(--n-component-accessory-color);

        transform-origin: 0% 50%;

        position: absolute;
        top: 50%;
        left: 0.25rem;
        transform: translateY(-0.65rem);
        transition: all 200ms;
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
