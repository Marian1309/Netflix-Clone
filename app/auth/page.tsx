'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { TypeAnimation } from 'react-type-animation'

import { Input } from '@components'

import { ToastError } from '@utils'

import { FormFields, UserFormFields } from '@types'

const DEFAULT_FORM_FIELDS = {
  userName: '',
  email: '',
  password: ''
}

export default function AuthPage() {
  const [formFields, setFormFields] =
    useState<UserFormFields>(DEFAULT_FORM_FIELDS)
  const [authVariant, setAuthVariant] = useState<'login' | 'register'>('login')

  const router = useRouter()

  const { userName, email, password } = formFields

  const FORM_FIELDS: FormFields[] = [
    {
      label: 'Username',
      name: 'userName',
      value: userName,
      type: 'text',
      ban: true
    },
    {
      label: 'Email',
      name: 'email',
      value: email,
      type: 'email'
    },
    {
      label: 'Password',
      name: 'password',
      value: password,
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

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name: userName,
        password
      })
      router.push('/')
      setFormFields(DEFAULT_FORM_FIELDS)
    } catch (err: any) {
      ToastError(err.message)
    }
  }, [email, password, userName, router])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })
      router.push('/')
      setFormFields(DEFAULT_FORM_FIELDS)
    } catch (err: any) {
      ToastError(err.message)
    }
  }, [email, password, router])

  return (
    <div className='relative h-[100vh] w-full bg-[url("../public/images/hero.jpg")] bg-fixed bg-center bg-no-repeat'>
      <div className='h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-10'>
          <Image src='/images/logo.png' alt='Logo' height={72} width={72} />
        </nav>

        <div className='flex justify-center'>
          <div className='mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md'>
            <TypeAnimation
              sequence={[authVariant ? 'Sign In' : 'Sign Up']}
              className='mb-8 text-3xl font-semibold text-white'
              speed={1}
              repeat={1}
            />
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
            <button
              onClick={authVariant === 'login' ? login : register}
              className='mt-10 w-full rounded-md bg-red-600 py-3 text-white transition-colors hover:bg-red-700'
            >
              {authVariant === 'login' ? 'Login' : 'Sign Up'}
            </button>

            <div className='mt-8 flex flex-row items-center justify-center gap-4 '>
              <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'>
                <FcGoogle
                  size={30}
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                />
              </div>

              <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black  transition hover:opacity-80'>
                <FaGithub
                  onClick={() => signIn('github', { callbackUrl: '/' })}
                  size={35}
                />
              </div>
            </div>

            <p className='mt-12 text-[8px] text-neutral-500 selection:hidden'>
              {authVariant === 'login'
                ? 'First time using Netflix?'
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
