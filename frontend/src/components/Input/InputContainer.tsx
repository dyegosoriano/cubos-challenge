import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  variants: { size: { default: 'grid-rows-[32px_48px_16px] h-24', big: 'grid-rows-[32px_96px_16px]' } },
  defaultVariants: { size: 'default' },
  base: 'grid text-mauve-a12'
})

type IProps = React.ComponentProps<'div'> & VariantProps<typeof variant>

export const InputContainer: React.FC<IProps> = ({ className, ...props }) => (
  <div className={`${variant(props)} ${className || ''}`} {...props} />
)
