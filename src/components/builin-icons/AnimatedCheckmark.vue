<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(defineProps<{
    strokeColor?: string
}>(), { strokeColor: 'white' })

const { strokeColor } = toRefs(props)

</script>

<template>
    <svg width="24" height="24" viewBox="0 0 100 100">
        <path d="M20 50 L45 75 L80 30" stroke="black" fill="transparent"></path>
    </svg>
</template>


<style scoped lang="scss">
path {
    stroke-width: 0.75em;
    /* Adjust the stroke width as per your preference */
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    // make bends rounded
    stroke-linejoin: round;
    /* Rounded corners */
    animation: checkmark 200ms ease-in-out forwards;
    animation-delay: 200ms;
    // stroke color white
    stroke: v-bind(strokeColor);
}

@keyframes checkmark {
    to {
        stroke-dashoffset: 0;
    }
}
</style>
