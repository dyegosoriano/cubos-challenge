import React from 'react'

type IProps = React.ComponentProps<'span'> & { error_message?: string }

export const InputError: React.FC<IProps> = ({ error_message, ...props }) => (
  <span className="row-start-3 h-4 text-xs text-purple-9" {...props}>
    {error_message}
  </span>
)
