export interface UserFormFields {
  userName: string
  email: string
  password: string
}

export interface FormFields {
  label: string
  name: string
  type: 'text' | 'password' | 'email'
  value: string
  ban?: boolean
}

export interface InitialState {
  formFields: {
    userName: string
    email: string
    password: string
  }
  authVariant: 'login' | 'register'
  renderedFields: FormFields[]
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
