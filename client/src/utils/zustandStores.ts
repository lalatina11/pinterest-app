import type { User } from "@/types"
import { create } from "zustand"
type AuthStore = {
    currentUser: User | null,
    setCurrentUser: (newUser: User) => void
    removeCurrentUser: () => void
    updateCurrentUser: (updatedUser: User) => void
}
export const useAuthStore = create<AuthStore>((set) => ({
    currentUser: null,
    setCurrentUser: (newUser: User) => set({ currentUser: newUser }),
    removeCurrentUser: () => set({ currentUser: null }),
    updateCurrentUser: (updatedUser: User) => set({ currentUser: updatedUser }),
}))