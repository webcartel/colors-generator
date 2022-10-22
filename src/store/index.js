import { createStore } from 'vuex'

export default createStore({

	state: {
		colorSlots: [
			{
				id: 1,
				color: 'transparent',
				lock: false,
			},
			{
				id: 2,
				color: 'transparent',
				lock: false,
			},
			{
				id: 3,
				color: 'transparent',
				lock: false,
			},
			{
				id: 4,
				color: 'transparent',
				lock: false,
			},
			{
				id: 5,
				color: 'transparent',
				lock: false,
			},
			{
				id: 6,
				color: 'transparent',
				lock: false,
			},
		],
	},

	getters: {
		colorSlots(state) {
			return state.colorSlots
		},
	},

	mutations: {
		SET_COLOR(state, {id, newColor}) {
			state.colorSlots  = state.colorSlots.map((colorSlot) => {
				if ( colorSlot.id === id ) {
					colorSlot.color = newColor
				}

				return colorSlot
			})
		},

		TOGGLE_LOCK(state, id) {
			state.colorSlots  = state.colorSlots.map((colorSlot) => {
				if ( colorSlot.id === id ) {
					colorSlot.lock = !colorSlot.lock
				}

				return colorSlot
			})
		},
	},

	actions: {
	},

	modules: {
	}

})
