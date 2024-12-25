import { selectShow, useLoadStore } from '@/services/zustand/loadStore'
import Loader from '@assets/screen-loader.svg?react'
import { Transition, TransitionChild } from '@headlessui/react'

import { Fragment } from 'react/jsx-runtime'

/*
    This is a screen loader component that will be displayed when the app is loading data from the server
    or when the app is processing data. Currently the style is rough and will be updated later.

    To use this you just need to call the isLoading() and isLoaded() functions from the useLoadStore hook.
    Example:
    
        const onSubmit = async (values: any) => {
            isLoading()
                *do something here like calling api*
            isLoaded()
        }
    
*/

const ScreenLoader = () => {
  const loading = useLoadStore(selectShow)
  return (
    <Transition appear show={loading} as={Fragment}>
      <TransitionChild
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-80'>
          <Loader className='h-10 w-10' />
        </div>
      </TransitionChild>
    </Transition>
  )
}

export default ScreenLoader
