<script setup lang="ts">
import { ref, watch } from 'vue';
import { NButton, NSwitch, NCheckbox, NInput, NModal } from './components';
import ClosedEye from './components/builtin-icons/ClosedEye.vue';

const isLoading = ref(false);
const colorMode = ref<'light' | 'dark'>('light');

const isEnabled = ref(false);

watch(colorMode, () => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
        if (colorMode.value === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }
});

watch(isEnabled, () => {
    console.log('isEnabled changed to', isEnabled.value);
});

function toggleColorMode() {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
}

function setLoading() {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
}

const inputs = ref({
    input1: ''
});

const modal = ref<InstanceType<typeof NModal>>();
const modal2 = ref<InstanceType<typeof NModal>>();
</script>

<template>
    <h1>Components Showcase</h1>

    <n-button @click="toggleColorMode"> Switch to {{ colorMode === 'light' ? 'dark' : 'light' }} mode </n-button>
    <h1>Components Showcase</h1>
    <section class="component-section">
        <h2>Modals</h2>
        <div class="component-section__category">
            <div class="component-section__gallery">
                <n-button @click="modal?.openModal"> Open Modal </n-button>
                <NModal ref="modal" :close-on-outside-click="false">
                    <template #modal-header> Modal Header </template>
                    <template #modal-body>
                        <p>Let's try opening another modal !</p>
                        <n-button @click="modal2?.openModal"> Open Modal 2 </n-button>
                        <NModal ref="modal2">
                            <template #modal-header> Modal Header </template>
                            <template #modal-body>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, quod! Ducimus soluta vel quod quas assumenda ea porro quibusdam fuga quasi at ipsa repellat error
                                    possimus, voluptatibus voluptates, perspiciatis culpa molestiae esse animi facere libero ut. Ratione nihil tempora porro delectus natus autem culpa, magni nostrum
                                    consequuntur, ullam minus veniam itaque reprehenderit nam cumque, praesentium deleniti velit incidunt provident accusamus architecto dolore placeat excepturi sint.
                                    Nemo quisquam quam ducimus delectus, consequatur consequuntur quis. Voluptatibus iste veniam sapiente architecto quae eligendi, eveniet quaerat ipsa corporis, ipsum
                                    alias molestiae magnam accusantium illum fuga fugit. Ipsa adipisci id quas dignissimos qui vitae assumenda.
                                </p>
                            </template>
                            <template #modal-footer>
                                <div style="display: flex; align-items: center; gap: 1rem">
                                    <NButton mode="text" color="danger">Cancel</NButton>
                                    <NButton>Submit</NButton>
                                </div>
                            </template>
                        </NModal>
                    </template>
                    <template #modal-footer>
                        <h1>Modal Footer</h1>
                    </template>
                </NModal>
            </div>
        </div>
    </section>
    <section class="component-section">
        <h2>Inputs</h2>
        <div class="component-section__category">
            <h3>{{ inputs.input1 }}</h3>
            <div class="component-section__gallery">
                <n-input
                    v-model="inputs.input1"
                    label="Input 3"
                    id="input-3"
                    name="input-3"
                    :label-attrs="{
                        style: { backgroundColor: 'red' }
                    }"
                >
                    <template #leftIcon>
                        <ClosedEye />
                    </template>
                </n-input>
                <n-input type="password" v-model="inputs.input1" label="Input 4" id="input-4" name="input-4" :errors="['Password must have 3 letters', 'Password mut have 4 digits']">
                    <template #rightIcon> <ClosedEye /> </template
                ></n-input>
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
                <n-button color="primary"> Primary </n-button>
                <n-button color="secondary"> Secondary </n-button>
                <n-button color="success"> Success </n-button>
                <n-button color="warning"> Warning </n-button>
                <n-button color="danger"> Danger </n-button>
                <n-button color="info"> Info </n-button>
                <n-button color="dark"> Dark </n-button>
                <n-button color="light"> Light </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Size</h3>
            <div class="component-section__gallery">
                <n-button color="secondary" size="sm"> Small </n-button>
                <n-button color="success" size="md"> Medium </n-button>
                <n-button color="primary" size="normal"> Normal </n-button>
                <n-button color="warning" size="lg"> Large </n-button>
                <n-button color="danger" size="xl"> Extra Large </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Mode</h3>
            <div class="component-section__gallery">
                <n-button mode="solid"> Solid </n-button>
                <n-button mode="outline"> Outline </n-button>
                <n-button mode="text"> Text </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Icon buttons</h3>
            <div class="component-section__gallery">
                <n-button>
                    <template #leftIcon> 😂 </template>
                    With left icon
                </n-button>
                <n-button>
                    With right icon
                    <template #rightIcon> 😂 </template>
                </n-button>
                <n-button>
                    <template #leftIcon> 😂 </template>
                    With left and right icon
                    <template #rightIcon> 😂 </template>
                </n-button>
            </div>
        </div>
        <div class="component-section__category">
            <h3>Loading Buttons</h3>
            <div class="component-section__gallery">
                <n-button color="success" :is-loading="isLoading" @click="setLoading">
                    <template #leftIcon> 😂 </template>
                    Click to load without loading text
                </n-button>
                <n-button color="danger" :is-loading="isLoading" loading-text="Deleting" @click="setLoading"> Click to load with loading text </n-button>
            </div>
        </div>
    </section>
    <section class="component-section">
        <h2>Switches</h2>
        <div class="component-section__category">
            <h3>Color</h3>
            <div class="component-section__gallery">
                <n-switch id="switch-1" color="primary" aria-label="Enable this feature" v-model="isEnabled"> Primary </n-switch>
                <n-switch id="switch-2" color="secondary" aria-label="Enable this feature" v-model="isEnabled"> Secondary </n-switch>
                <n-switch id="switch-3" color="success" aria-label="Enable this feature" v-model="isEnabled"> Success </n-switch>
                <n-switch id="switch-4" color="warning" aria-label="Enable this feature" v-model="isEnabled"> Warning </n-switch>
                <n-switch id="switch-5" color="danger" aria-label="Enable this feature" v-model="isEnabled"> Danger </n-switch>
                <n-switch id="switch-6" color="info" aria-label="Enable this feature" v-model="isEnabled"> Info </n-switch>
                <n-switch id="switch-7" color="dark" aria-label="Enable this feature" v-model="isEnabled"> Dark </n-switch>
                <n-switch id="switch-8" color="light" aria-label="Enable this feature" v-model="isEnabled"> Light </n-switch>
            </div>
        </div>
    </section>
    <section class="component-section">
        <h2>Check boxes</h2>
        <div class="component-section__category">
            <h3>Color</h3>
            <div class="component-section__gallery">
                <n-checkbox name="hello" id="switch-1" color="primary" aria-label="Enable this feature" v-model="isEnabled"> Primary </n-checkbox>
                <n-checkbox name="hello" id="switch-2" color="secondary" aria-label="Enable this feature" v-model="isEnabled"> Secondary </n-checkbox>
                <n-checkbox name="hello" id="switch-3" color="success" aria-label="Enable this feature" v-model="isEnabled"> Success </n-checkbox>
                <n-checkbox name="hello" id="switch-4" color="warning" aria-label="Enable this feature" v-model="isEnabled"> Warning </n-checkbox>
                <n-checkbox name="hello" id="switch-5" color="danger" aria-label="Enable this feature" v-model="isEnabled"> Danger </n-checkbox>
                <n-checkbox name="hello" id="switch-6" color="info" aria-label="Enable this feature" v-model="isEnabled"> Info </n-checkbox>
                <n-checkbox name="hello" id="switch-7" color="dark" aria-label="Enable this feature" v-model="isEnabled"> Dark </n-checkbox>
                <n-checkbox name="hello" id="switch-8" color="light" aria-label="Enable this feature" v-model="isEnabled"> Light </n-checkbox>
            </div>
        </div>
    </section>
</template>
