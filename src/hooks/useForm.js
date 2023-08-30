import useSWR from 'swr'

export default function useForm(id) {
  let url = ''
  if (!id) {
    url = `/api/acs/forms`
  } else {
    url = `/api/acs/forms/${id}`
  }

  const { data, error } = useSWR(url)

  return { data, error }
}
