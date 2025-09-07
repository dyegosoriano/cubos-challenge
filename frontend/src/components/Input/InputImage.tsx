import { tv, type VariantProps } from 'tailwind-variants/lite'
import React, { useRef, useState } from 'react'

const variant = tv({
  base: 'row-start-2 w-min-80 h-12 rounded-sm border-2 border-mauve-6 bg-mauve-2 pl-2 placeholder:text-mauve-9 focus:border-purple-9 focus:outline-none transition-colors duration-200 cursor-pointer file:hidden'
})

type IProps = Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> &
  VariantProps<typeof variant> & {
    onImageSelect: (base64: string) => void
    acceptedFormats?: string[]
  }

export const InputImage: React.FC<IProps> = ({
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  onImageSelect,
  className,
  ...props
}) => {
  const [fileName, setFileName] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!acceptedFormats.includes(file.type)) {
      alert(`Formato não suportado. Aceitos: ${acceptedFormats.join(', ')}`)
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      const base64 = e.target?.result as string
      setFileName(file.name)
      onImageSelect(base64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative">
      <input
        className={`${variant(props)} ${className || ''}`}
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
        {...props}
      />
      {fileName && <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-mauve-11">{fileName}</span>}
    </div>
  )
}
