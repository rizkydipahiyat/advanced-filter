import { apiClient } from "./api";
import { useQuery, UseQueryResult } from 'react-query'
import { Product } from "./types";
import { useSearchParams } from 'react-router-dom'


export function useProducts(): UseQueryResult<Product[]> {
  const [keyword] = useSearchParams({
    sort: 'name'
  })
  return useQuery(['product', keyword.toString()], () => apiClient.get('product', {
    params: keyword
  }).then(res => res.data), {
    staleTime: 120000
  })
}