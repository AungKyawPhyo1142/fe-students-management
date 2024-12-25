import { create } from 'zustand'

type LoadStore = {
  show: boolean
  isLoading: () => void
  isLoaded: () => void
}

export const useLoadStore = create<LoadStore>((set) => ({
  show: false,
  isLoading: () => set({ show: true }),
  isLoaded: () => set({ show: false }),
}))

export const selectShow = (state: LoadStore) => state.show
export const isLoading = () => useLoadStore.getState().isLoading()
export const isLoaded = () => useLoadStore.getState().isLoaded()
