'use client'

import React from 'react'
import { Input as CInput } from '@/components/ui/input'
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: string
  hint?: string
}

type InputState = {
  inputType: React.HTMLInputTypeAttribute
  showPassword: boolean
}

const Input: React.FC<Props> = (props) => {
  const { className, error, defaultValue, type, ...rest } = props
  const [inputState, setInputState] = React.useState<InputState>({
    inputType: type || 'text',
    showPassword: false,
  })

  const onEyeIconClick = () => {
    setInputState((prevState) => ({
      inputType: prevState.inputType === 'password' ? 'text' : 'password',
      showPassword: !prevState.showPassword,
    }))
  }

  const handlePasswordDisplayIcon = () => {
    return inputState.showPassword ? (
      <EyeOpenIcon
        className='absolute right-3 top-4 cursor-pointer w-[20px] h-[20px]'
        onClick={onEyeIconClick}
      />
    ) : (
      <EyeNoneIcon
        className=' absolute right-3 top-4 cursor-pointer w-[20px] h-[20px]'
        onClick={onEyeIconClick}
      />
    )
  }

  return (
    <>
      <div className='relative'>
        <CInput
          {...rest}
          type={inputState.inputType}
          className={className}
          defaultValue={defaultValue}
        />
        {type === 'password' && handlePasswordDisplayIcon()}
      </div>
      {error && <span className='block text-xs text-red-500'>{error}</span>}
    </>
  )
}

export default Input
