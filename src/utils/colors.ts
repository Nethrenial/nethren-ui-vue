export type NColorSwatchNumbering = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface NColorSwatch {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

export interface NColorPallete {
    primary: NColorSwatch;
    secondary: NColorSwatch;
    success: NColorSwatch;
    info: NColorSwatch;
    warning: NColorSwatch;
    danger: NColorSwatch;
    light: NColorSwatch;
    dark: NColorSwatch;
    [key: string]: NColorSwatch;
}

export type NColorPaletteKeyRaw =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
    | Omit<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'>;
export type NColorPalleteKey = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' | string;

export const builtinColorNames = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

export function isBuiltinColorName(colorName: NColorPaletteKeyRaw) {
    return builtinColorNames.includes(colorName as string);
}

export function hexToRGBIntegers(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

export function hexToRGB(hex: string, alpha = 1) {
    if (alpha >= 0 && alpha <= 1) {
        return `rgba(${hexToRGBIntegers(hex)}, ${alpha})`;
    } else {
        return `rgb(${hexToRGBIntegers(hex)})`;
    }
}

export const colors: Partial<NColorPallete> = {
    primary: {
        50: '#e8eaff',
        100: '#c0c2f5',
        200: '#9799e8',
        300: '#6f70de',
        400: '#4647d3',
        500: '#2c2db9',
        600: '#212391',
        700: '#171969',
        800: '#0c0e41',
        900: '#04041c'
    },

    secondary: {
        50: '#fbfbdf',
        100: '#f0f0bc',
        200: '#e7e695',
        300: '#dddc6e',
        400: '#d3d246',
        500: '#b9b82c',
        600: '#908f20',
        700: '#676614',
        800: '#3e3d09',
        900: '#161400'
    },
    success: {
        50: '#e2fbed',
        100: '#c2ebd4',
        200: '#9fddb9',
        300: '#7ccf9e',
        400: '#58c184',
        500: '#3ea76a',
        600: '#2e8251',
        700: '#1f5d3a',
        800: '#0f3921',
        900: '#001506'
    },

    warning: {
        50: '#fff8de',
        100: '#f9eab6',
        200: '#f3dc8b',
        300: '#eecf5e',
        400: '#e9c131',
        500: '#d0a719',
        600: '#a18211',
        700: '#735d09',
        800: '#453802',
        900: '#191300'
    },

    info: {
        50: '#e5eeff',
        100: '#b9cbfb',
        200: '#8da9f3',
        300: '#6186eb',
        400: '#3564e4',
        500: '#1b4aca',
        600: '#123abd',
        700: '#0a2972',
        800: '#031947',
        900: '#00081d'
    },

    danger: {
        50: '#ffe4e4',
        100: '#fcb8b8',
        200: '#f48c8c',
        300: '#ee5e5e',
        400: '#e73131',
        500: '#ce1818',
        600: '#a11011',
        700: '#73090b',
        800: '#480405',
        900: '#1f0000'
    },

    light: {
        50: '#ffffff',
        100: '#fefefe',
        200: '#fdfdfd',
        300: '#fcfcfc',
        400: '#fbfbfb',
        500: '#fafafa',
        600: '#e6e6e6',
        700: '#bfbfbf',
        800: '#999999',
        900: '#737373'
    },

    dark: {
        50: '#666666',
        100: '#555555',
        200: '#444444',
        300: '#333333',
        400: '#222222',
        500: '#151515',
        600: '#121212',
        700: '#0f0f0f',
        800: '#0d0d0d',
        900: '#000000'
    }
};

export function setColorPallete(pallete?: Partial<NColorPallete>) {
    if (pallete) {
        Object.keys(pallete).forEach((key) => {
            colors[key as NColorPalleteKey] = pallete[key as NColorPalleteKey];
        });
    }
    // set css variables
    const html = document.querySelector('html');
    // write style tags and inject to head
    // for light mode (when htm tag doesn't have 'dark' class)
    const lightModeStyleTag = document.createElement('style');

    let lightModeStyle = 'html { ';
    Object.keys(colors).forEach((key) => {
        const swatch = colors[key as NColorPalleteKey];
        if (swatch) {
            Object.keys(swatch).forEach((swatchKey) => {
                const colorValue = swatch[swatchKey as unknown as NColorSwatchNumbering];
                // console.log(`--n-color-${key}-${swatchKey}: ${hexToRGB(colorValue)};`);
                lightModeStyle += `--n-color-${key}-${swatchKey}: ${hexToRGB(colorValue)};`;
                lightModeStyle += `--n-color-${key}-${swatchKey}-transparent: ${hexToRGB(colorValue, 0.3)};`;
            });
        }
    });

    lightModeStyle += '}';
    lightModeStyleTag.innerHTML = lightModeStyle;
    html?.appendChild(lightModeStyleTag);
}
