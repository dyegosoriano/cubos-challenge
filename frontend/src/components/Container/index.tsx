import React from 'react'

type IProps = React.ComponentProps<'div'>

export const Container: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <div className={`min-w-96 p-4 bg-mauve-3 rounded-md ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
