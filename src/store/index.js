import { createStore } from 'vuex'

export default createStore({

	state: {
		colorSlots: [
			{
				id: 1,
				color: 'transparent',
				lock: false,
				shades: [],
			},
			{
				id: 2,
				color: 'transparent',
				lock: false,
				shades: [],
			},
			{
				id: 3,
				color: 'transparent',
				lock: false,
				shades: [],
			},
			{
				id: 4,
				color: 'transparent',
				lock: false,
				shades: [],
			},
			{
				id: 5,
				color: 'transparent',
				lock: false,
				shades: [],
			},
			{
				id: 6,
				color: 'transparent',
				lock: false,
				shades: [],
			},
		],
	},

	getters: {

		colorSlots: (state) => {
			return state.colorSlots
		},

		colorsWithoutHash: (state) => {
			return state.colorSlots.map((colorSlot) => {
				return colorSlot.color.slice(1)
			})
		},

		colorShades: (state) => (id) => {
			return state.colorSlots.filter((colorSlot) => {
				if ( colorSlot.id === id ) {
					return colorSlot
				}
			})[0].shades
		},

	},

	mutations: {

		SET_COLOR(state, {id, newColor}) {
			state.colorSlots  = state.colorSlots.map((colorSlot) => {
				if ( colorSlot.id === id ) {
					colorSlot.color = newColor
					colorSlot.shades = []
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

		SET_SHADES(state, { color, shades }) {
			state.colorSlots  = state.colorSlots.map((colorSlot) => {
				if ( colorSlot.color === color ) {
					colorSlot.shades = shades
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
