import useSWR from 'swr'

function useResult (slug, vertical = 'healthcare') {
  const { data, error, isLoading } = useSWR(`/api/quiz/results?result=${slug}&vertical=${vertical}`)

  return {
    result: data,
    isLoading,
    isError: error
  }
}

export default useResult
