import { StateCreator } from 'zustand'

export type LayoutData = {
	isGrid: boolean
	changesLayout: (isGrid: boolean) => void
}

export const createLayoutSlice: StateCreator<LayoutData> = set => ({
	isGrid: true,

	changesLayout: isGrid => {
		set({ isGrid })
	},
})
