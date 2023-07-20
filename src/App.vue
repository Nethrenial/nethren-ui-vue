<script setup lang="ts">
import { ref, watch } from "vue";
import { NButton, NSwitch, NCheckbox, NInput } from "./components"

const isLoading = ref(false)
const colorMode = ref<'light' | 'dark'>('light')


const isEnabled = ref(false)

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

watch(isEnabled, () => {
    console.log('isEnabled changed to', isEnabled.value)
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

const inputs = ref({
    input1: '',
})

</script>


<template>
    <n-button @click="toggleColorMode">
        Switch to {{
            colorMode === 'light' ? 'dark' : 'light'
        }} mode
    </n-button>
    <h1>Components Showcase</h1>
    <section class="component-section">
        <h2>Inputs</h2>
        <div class="component-section__category">
            <h3>{{ inputs.input1 }}</h3>
            <div class="component-section__gallery">
                <n-input v-model="inputs.input1" label="Input 1" id="input-1" name="input-1" type="text"
                    :errors="['Username must be available']" />
                <n-input v-model="inputs.input1" label="Input 2" id="input-2" name="input-2" type="number"
                    color="secondary" />
                <n-input v-model="inputs.input1" label="Input 3" id="input-3" name="input-3" />
                <n-input v-model="inputs.input1" label="Input 4" id="input-4" name="input-4" />
                <n-input v-model="inputs.input1" label="Input 5" id="input-5" name="input-5" />
                <n-input v-model="inputs.input1" label="Input 6" id="input-6" name="input-6" type="password" :with-visibility-toggle="true" />
            </div>
        </div>
    </section>
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
    <section class="component-section">
        <h2>Switches</h2>
        <div class="component-section__category">
            <h3>Color</h3>
            <div class="component-section__gallery">
                <n-switch id="switch-1" color="primary" ariaLabel="Enable this feature" v-model="isEnabled">
                    Primary
                </n-switch>
                <n-switch id="switch-2" color="secondary" ariaLabel="Enable this feature" v-model="isEnabled">
                    Secondary
                </n-switch>
                <n-switch id="switch-3" color="success" ariaLabel="Enable this feature" v-model="isEnabled">
                    Success
                </n-switch>
                <n-switch id="switch-4" color="warning" ariaLabel="Enable this feature" v-model="isEnabled">
                    Warning
                </n-switch>
                <n-switch id="switch-5" color="danger" ariaLabel="Enable this feature" v-model="isEnabled">
                    Danger
                </n-switch>
                <n-switch id="switch-6" color="info" ariaLabel="Enable this feature" v-model="isEnabled">
                    Info
                </n-switch>
                <n-switch id="switch-7" color="dark" ariaLabel="Enable this feature" v-model="isEnabled">
                    Dark
                </n-switch>
                <n-switch id="switch-8" color="light" ariaLabel="Enable this feature" v-model="isEnabled">
                    Light
                </n-switch>
            </div>
        </div>
    </section>
    <section class="component-section">
        <h2>Check boxes</h2>
        <div class="component-section__category">
            <h3>Color</h3>
            <div class="component-section__gallery">
                <n-checkbox name="hello" id="switch-1" color="primary" ariaLabel="Enable this feature" v-model="isEnabled">
                    Primary
                </n-checkbox>
                <n-checkbox name="hello" id="switch-2" color="secondary" ariaLabel="Enable this feature"
                    v-model="isEnabled">
                    Secondary
                </n-checkbox>
                <n-checkbox name="hello" id="switch-3" color="success" ariaLabel="Enable this feature" v-model="isEnabled">
                    Success
                </n-checkbox>
                <n-checkbox name="hello" id="switch-4" color="warning" ariaLabel="Enable this feature" v-model="isEnabled">
                    Warning
                </n-checkbox>
                <n-checkbox name="hello" id="switch-5" color="danger" ariaLabel="Enable this feature" v-model="isEnabled">
                    Danger
                </n-checkbox>
                <n-checkbox name="hello" id="switch-6" color="info" ariaLabel="Enable this feature" v-model="isEnabled">
                    Info
                </n-checkbox>
                <n-checkbox name="hello" id="switch-7" color="dark" ariaLabel="Enable this feature" v-model="isEnabled">
                    Dark
                </n-checkbox>
                <n-checkbox name="hello" id="switch-8" color="light" ariaLabel="Enable this feature" v-model="isEnabled">
                    Light
                </n-checkbox>
            </div>
        </div>
    </section>
</template>
