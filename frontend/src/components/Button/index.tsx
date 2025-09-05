import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  base: 'flex justify-center items-center min-w-12 min-h-10 font-medium rounded-sm px-4 cursor-pointer',
  defaultVariants: { mode: 'normal', color: 'primary' },
  variants: {
    color: {
      secondary: 'bg-purple-a2 hover:bg-purple-a3 active:bg-purple-a1 disabled:bg-mauve-a3 text-purple-a12 transition-colors duration-200',
      primary: 'bg-purple-9 hover:bg-purple-1 active:bg-purple-8 disabled:bg-mauve-9 text-white transition-colors duration-200',
      paginate: 'bg-mauve-3 hover:bg-mauve-2 active:bg-mauve-4 disabled:bg-mauve-5 transition-colors duration-200'
    }
  }
})

type IProps = React.ComponentProps<'button'> & VariantProps<typeof variant>

export const Button: React.FC<IProps> = ({ className, children, ...props }) => {
  return (
    <button className={`${variant(props)} ${className || ''}`} {...props}>
      {children}
    </button>
  )
}
