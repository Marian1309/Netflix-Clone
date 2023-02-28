export interface UserFormFields {
  userName: string
  email: string
  password: string
}

export interface FormFields {
  label: string
  name: string
  value: string
  type: 'text' | 'password' | 'email'
  ban?: boolean
}
