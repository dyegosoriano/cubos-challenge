import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  base: 'w-full p-3 bg-mauve-3 border border-mauve-6 rounded-md resize-none h-24 placeholder:text-mauve-9 focus:border-purple-9 focus:outline-none transition-colors duration-200'
})

type IProps = React.ComponentProps<'textarea'> & VariantProps<typeof variant>

export const InputTextArea: React.FC<IProps> = ({ className, ...props }) => (
  <textarea className={`${variant(props)} ${className || ''}`} {...props} />
)
