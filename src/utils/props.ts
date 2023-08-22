import type { HTMLAttributes, LabelHTMLAttributes, InputHTMLAttributes, ReservedProps } from 'vue';
import { NColorPaletteKeyRaw } from '.';

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

interface ComponentProps {
    color?: NColorPaletteKeyRaw;
}

interface InputComponentProps extends ComponentProps {
    // type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
}

// Define Props
export interface NComponentProps extends SimpleSpread<HTMLAttributes & ReservedProps, ComponentProps> {}
export interface NInputComponentProps extends SimpleSpread<InputHTMLAttributes & ReservedProps, InputComponentProps> {}

// some useful element types

export type NHtmlDivProps = HTMLAttributes & ReservedProps;
export type NHtmLabelProps = LabelHTMLAttributes & ReservedProps;
export type NHtmlInputProps = InputHTMLAttributes & ReservedProps;
