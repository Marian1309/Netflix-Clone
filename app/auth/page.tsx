'use client'

import Image from 'next/image'
import { ChangeEvent, useCallback, useState } from 'react'

import { Input } from '@components'

import { FormFields, UserFormFields } from '@types'

export default function AuthPage() {
  const [formFields, setFormFields] = useState<UserFormFields>({
    userName: '',
    email: '',
    password: ''
  })
  const [authVariant, setAuthVariant] = useState<'login' | 'register'>('login')

  const FORM_FIELDS: FormFields[] = [
    {
      label: 'Username',
      name: 'userName',
      value: formFields.userName,
      type: 'text',
      ban: true
    },
    {
      label: 'Email',
      name: 'email',
      value: formFields.email,
      type: 'email'
    },
    {
      label: 'Password',
      name: 'password',
      value: formFields.password,
      type: 'password'
    }
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const toggleAuthVariant = useCallback(() => {
    setAuthVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  return (
    <div className='relative h-[100vh] w-full bg-[url("../public/images/hero.jpg")] bg-fixed bg-center bg-no-repeat'>
      <div className='h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image src='/images/logo.png' alt='Logo' height={48} width={48} />
        </nav>

        <div className='flex justify-center'>
          <div className='mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md'>
            <h2 className='mb-8 text-3xl font-semibold text-white'>
              {authVariant === 'login' ? 'Sign In' : 'Register '}
            </h2>

            <div className='flex flex-col gap-4 text-[12px]'>
              {FORM_FIELDS.map(({ label, name, value, type, ban }) => {
                if (authVariant === 'register') {
                  return (
                    <Input
                      key={name}
                      label={label}
                      name={name}
                      value={value}
                      type={type}
                      onChange={handleChange}
                    />
                  )
                }
                if (!ban) {
                  return (
                    <Input
                      key={name}
                      label={label}
                      name={name}
                      value={value}
                      type={type}
                      onChange={handleChange}
                    />
                  )
                }
              })}
            </div>

            <button className='mt-10 w-full rounded-md bg-red-600 py-3 text-white transition-colors hover:bg-red-700'>
              Login
            </button>

            <p className='mt-12 text-neutral-500 selection:hidden'>
              {authVariant === 'login'
                ? ' First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleAuthVariant}
                className='ml-1 cursor-pointer text-white hover:underline'
              >
                {authVariant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
