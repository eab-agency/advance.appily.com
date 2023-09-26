import useSWR from 'swr'

function useResult (slug) {
  const { data, error, isLoading } = useSWR(`/api/quiz/results?result=${slug}`)

  return {
    result: data,
    isLoading,
    isError: error
  }
}

export default useResult
