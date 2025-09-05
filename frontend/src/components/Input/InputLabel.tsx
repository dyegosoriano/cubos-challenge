import React from 'react'

type IProps = React.ComponentProps<'label'> & { text: string }

export const InputLabel: React.FC<IProps> = ({ text, ...props }) => (
  <label className="row-start-1 h-8" {...props}>
    {text}
  </label>
)
