import useAxiosQuery from './useAxiosQuery'

export default function useCurrentUser() {
  const { data, error, isLoading } = useAxiosQuery(
    'currentUser',
    '/api/current'
  )

  return {
    data,
    error,
    isLoading
  }
}
