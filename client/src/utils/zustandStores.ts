import type { Comment, User } from "@/types"
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

type CommentStore = {
    comment: Comment[]
    setComment: (comment: Comment) => void
    setComments: (comments: Comment[]) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
    comment: [],
    setComment: (newComment: Comment) => set((state) => ({ comment: [newComment, ...state.comment] })),
    setComments: (comments: Comment[]) => set({ comment: comments })
}))
