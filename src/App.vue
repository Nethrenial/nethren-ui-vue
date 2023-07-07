<script setup lang="ts">
import { ref, watch } from "vue";
import { NButton } from "./components/n-button"

const isLoading = ref(false)
const colorMode = ref<'light' | 'dark'>('light')

watch(colorMode, () => {
    const htmlElement = document.querySelector('html')
    if (htmlElement) {
        if (colorMode.value === "dark") {
            htmlElement.classList.add('dark')
        } else {
            htmlElement.classList.remove('dark')
        }
    }
})


function toggleColorMode() {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}

function setLoading() {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 2000)
}

</script>


<template>
    <n-button @click="toggleColorMode">
        Switch to {{
            colorMode === 'light' ? 'dark' : 'light'
        }} mode
    </n-button>
    <h1>Components Showcase</h1>
    <section class="component-section">
        <h2>Buttons</h2>
        <div class="component-section__category">
            <h3>Color</h3>
            <div class="component-section__gallery">
                <n-button color="primary">
                    Primary
                </n-button>
                <n-button color="secondary">
                    Secondary
                </n-button>
                <n-button color="success">
                    Success
                </n-button>
                <n-button color="warning">
                    Warning
                </n-button>
                <n-button color="danger">
                    Danger
                </n-button>
                <n-button color="info">
                    Info
                </n-button>
                <n-button color="dark">
                    Dark
                </n-button>
                <n-button color="light">
                    Light
                </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Mode</h3>
            <div class="component-section__gallery">
                <n-button mode="solid">
                    Solid
                </n-button>
                <n-button mode="outline">
                    Outline
                </n-button>
                <n-button mode="text">
                    Text
                </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Icon buttons</h3>
            <div class="component-section__gallery">
                <n-button>
                    <template #leftIcon>
                        😂
                    </template>
                    With left icon
                </n-button>
                <n-button>
                    With right icon
                    <template #rightIcon>
                        😂
                    </template>
                </n-button>
                <n-button>
                    <template #leftIcon>
                        😂
                    </template>
                    With left and right icon
                    <template #rightIcon>
                        😂
                    </template>
                </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Loading Buttons</h3>
            <div class="component-section__gallery">
                <n-button color="success" :is-loading="isLoading" @click="setLoading">
                    <template #leftIcon>
                        😂
                    </template>
                    Click to load without loading text
                </n-button>
                <n-button color="danger" :is-loading="isLoading" loading-text="Deleting" @click="setLoading">
                    Click to load with loading text
                </n-button>
            </div>
        </div>
    </section>
</template>