import type { ChangeEvent, FormEvent, ReactNode } from "react";

export interface InputFieldType {
  type: React.HTMLInputTypeAttribute,
  input?:ShareableLinks,
  className?: string,
  placeholder?: string,
  Icon?: ReactNode,
  success?: boolean,
  error?: boolean,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  onClick?: (e:FormEvent<HTMLFormElement>)=>void,
  message?: string,
}

export interface InputTextFieldType {
  name: string,
  value?: string,
  className?: string,
  placeholder?: string,
  Icon?: ReactNode,
  error?: boolean,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  message?: string,
}

export interface InputSubmitButtonType {
  name: string,
  value: string,
  className?: string,
  Icon?: ReactNode
}
  
export interface ButtonType {
  name: string,
  className?: string,
  Icon?: ReactNode,
  success?: boolean,
  disabled?: boolean,
  iconPosition?: 'left' | 'right';
  error?: boolean,
  onClick?: ()=>void
}

export type SelectOptions = {
  label: string;
  value: string;
};

export interface SelectProps {
  options: SelectableOptions[] | null;
  name:string,
  value?: ShareableLinks;
  onChange?: (opt: SelectableOptions) => void,
  placeholder?: string;
  className?: string;
}

export interface SelectableOptions {
  id: string,
  platform: string,
  icon: string,
}

export interface ShareableLinks {
  id: string,
  order?:number,
  platform_id?: string,
  links: { 
    platform: string,
    icon: string,
  },
  url: string,
}

export interface Avatar {
    image: File | string,
    preview: string,
}