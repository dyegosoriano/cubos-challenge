import { tv, type VariantProps } from 'tailwind-variants/lite'
import React from 'react'

const variant = tv({
  base: 'row-start-2 w-min-80 h-12 rounded-sm border-2 border-mauve-6 bg-mauve-2 pl-2 placeholder:text-mauve-9 focus:border-purple-9 focus:outline-none transition-colors duration-200'
})

type IProps = React.ComponentProps<'select'> & VariantProps<typeof variant> & { listOptions: Record<string, string> }

export const InputSelect: React.FC<IProps> = ({ className, ...props }) => (
  <select className={`${variant(props)} ${className || ''}`} {...props}>
    <option value="">Todos</option>
    {Object.entries(props.listOptions).map(([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    ))}
  </select>
)
