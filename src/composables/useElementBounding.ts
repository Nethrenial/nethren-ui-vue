import { Ref, ref, onMounted, onUnmounted } from 'vue';

export function useElementBounding(element: Ref<HTMLElement | undefined> | undefined) {
    const elementBounding = ref<DOMRect>();

    onMounted(() => {
        if (element && element.value) {
            elementBounding.value = element.value.getBoundingClientRect();
        }
    });

    function onDomChange() {
        if (element && element.value) {
            elementBounding.value = element.value.getBoundingClientRect();
        }
    }

    let observer: ResizeObserver | undefined = undefined;

    if (element && element.value) {
        // update on mutations to the element
        observer = new ResizeObserver(onDomChange);
        observer.observe(element.value, {
            box: 'border-box'
        });
    }

    onUnmounted(() => {
        observer?.disconnect();
    });

    return { elementBounding };
}
