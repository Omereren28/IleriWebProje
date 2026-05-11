import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listingService } from '@services/listingService'

export const LISTING_KEYS = {
  all: ['listings'],
  lists: () => [...LISTING_KEYS.all, 'list'],
  list: (filters) => [...LISTING_KEYS.lists(), { filters }],
  details: () => [...LISTING_KEYS.all, 'detail'],
  detail: (id) => [...LISTING_KEYS.details(), id],
  featured: () => [...LISTING_KEYS.all, 'featured'],
}

export function useListings(filters) {
  return useQuery({
    queryKey: LISTING_KEYS.list(filters),
    queryFn: () => listingService.getAll(filters),
  })
}

export function useListing(id) {
  return useQuery({
    queryKey: LISTING_KEYS.detail(id),
    queryFn: () => listingService.getById(id),
    enabled: !!id,
  })
}

export function useFeaturedListings() {
  return useQuery({
    queryKey: LISTING_KEYS.featured(),
    queryFn: () => listingService.getFeatured(),
  })
}

export function useCreateListing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: listingService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: LISTING_KEYS.lists() }),
  })
}

export function useDeleteListing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: listingService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: LISTING_KEYS.lists() }),
  })
}
