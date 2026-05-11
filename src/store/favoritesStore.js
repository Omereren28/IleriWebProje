import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (listing) =>
        set((state) => ({
          favorites: [...state.favorites, listing],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: 'favorites-storage' }
  )
)

export default useFavoritesStore
