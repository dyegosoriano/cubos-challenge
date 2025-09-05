import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  base: 'row-start-2 w-min-80 h-12 rounded-sm border-2 border-mauve-6 bg-mauve-2 pl-2 placeholder:text-mauve-9 focus:border-purple-9 focus:outline-none transition-colors duration-200'
})

type IProps = React.ComponentProps<'input'> & VariantProps<typeof variant>

export const InputField: React.FC<IProps> = ({ ...props }) => <input className={variant(props)} {...props} />
