import React from 'react'

type IProps = React.ComponentProps<'div'>

export const InputContainer: React.FC<IProps> = ({ ...props }) => (
  <div className="grid grid-rows-[32px_48px_16px] h-24 text-mauve-a12" {...props} />
)
