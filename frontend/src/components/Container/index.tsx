import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  defaultVariants: { color: 'primary' },
  variants: {
    color: {
      third: 'bg-purple-9 text-[12px] uppercase rounded-none p-2',
      secondary: 'flex flex-col gap-1 p-4 rounded-md bg-mauve-a2',
      primary: 'min-w-96 p-4 rounded-md bg-mauve-3'
    }
  }
})

type IProps = React.ComponentProps<'div'> & VariantProps<typeof variant>

export const Container: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <div className={`${variant(props)} ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
