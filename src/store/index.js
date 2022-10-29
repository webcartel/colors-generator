import { createStore } from 'vuex'

export default createStore({

	state: {
		colorSlots: [],
		default_colors_num: 6,
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
			state.colorSlots = state.colorSlots.map((colorSlot) => {
				if ( colorSlot.id === id ) {
					colorSlot.color = '#' + newColor
					colorSlot.shades = []
				}

				return colorSlot
			})
		},

		SET_COLOR_SLOT(state, color) {
			state.colorSlots.push({
				id: state.colorSlots.length + 1,
				color: '#' + color,
				lock: false,
				shades: [],
			})
		},

		DELETE_COLOR_SLOT(state, id) {
			state.colorSlots = state.colorSlots.filter((colorSlot) => {
				if ( colorSlot.id !== id ) {
					return true
				}
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
					colorSlot.shades = shades.map((clr) => {
						return '#' + clr
					})
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
