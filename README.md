# Nethren-UI (Vue 3 version)

Nethren UI is component library built from ground for vue and react.

## Features

- Built with typescript
- Fully customizable color pallete
- User friendly and accessible components

## What's the inspiration

This project was inspired from several component librarie, mainly Chakra UI and Vuesax 4.

Currently vue 3 version is in development and you can install the alpha version from here.

```bash
npm install @nethren-ui/vue
# or
yarn add @nethren-ui/vue
#or
pnpm add @nethren-ui/vue
```

After that, all you have to do to setup it is, call the ```setColorPallete``` function (either in app.vue or main.js/ts) and import the css file.

```ts
// in main.ts or in App.vue script(script setup or legacy) block
import {setColorPallete} from '@nethren-ui/vue';
import "@nethren-ui/vue/dist/style.css";

// call the function
setColorPallete();
```

And in each individula SFC component, you can import the relevant component directly (tree-shakable) and use it.

```ts
<script setup lang="ts">
import { NButton } from '@nethren-ui/vue'
</script>

<template>
    <NButton>Button 1</NButton>
    <n-button>This one also works</n-button>
</template>
```
