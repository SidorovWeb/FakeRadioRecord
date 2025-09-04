import toast from 'react-hot-toast'
import { StateCreator } from 'zustand'

export interface SubscribeData {
	handleSubscribe: () => void
}

export const createSubscribeSlice: StateCreator<SubscribeData> = () => ({
	handleSubscribe: () => {
		toast.dismiss()

		setTimeout(() => {
			toast('', {
				duration: 4000,
			})
		}, 100)
	},
})
