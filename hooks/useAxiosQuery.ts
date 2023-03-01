import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useAxiosQuery = (queryId: string, url: string) => {
  const { data, error, refetch, isLoading, isSuccess, isError, status } =
    useQuery([queryId], async () => {
      return await axios.get(url).then(({ data }) => data)
    })

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    status,
    refetch
  }
}

export default useAxiosQuery
