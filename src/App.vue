<template>

	<div class="cols">
		<div class="col" v-for="colorSlot in store.getters.colorSlots" :key="colorSlot.id" :style="{ background: colorSlot.color }">
			<div class="color_name">{{ colorSlot.color }}</div>
			<div class="status" :class="{ lock: colorSlot.lock }" @click="toggleLock(colorSlot.id)"></div>
		</div>
	</div>

</template>


<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

function getRandomColor() {

	const characters = '0123456789abcdef'

	let color = ''

	for (let i = 0; i < 6; i++) {
		color += characters[Math.floor(Math.random() * characters.length )]
	}

	return '#' + color

}

function generateColors(e) {
	if ( e !== undefined ) {
		if ( e.code === 'Space' ) {
			store.state.colorSlots.forEach((colorSlot) => {
				if ( !colorSlot.lock ) {
					store.commit('SET_COLOR', { id: colorSlot.id, newColor: getRandomColor() })
				}
			})
		}
	}
	else {
		store.state.colorSlots.forEach((colorSlot) => {
			if ( !colorSlot.lock ) {
				store.commit('SET_COLOR', { id: colorSlot.id, newColor: getRandomColor() })
			}
		})
	}
}

function toggleLock(id) {
	store.commit('TOGGLE_LOCK', id)
}


onMounted(() => {
	generateColors()
	document.addEventListener('keydown', generateColors)
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', generateColors)
})

</script>


<style lang="scss">

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html, body {
	min-height: 100vh;
}

.cols {
	display: flex;
	min-height: 100vh;
}

.col {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.color_name {
	margin-top: 20px;
	padding: 10px 20px;
	font-size: 20px;
	font-family: sans-serif;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.15s;

	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}
}

.status {
	margin-top: 20px;
	width: 36px;
	height: 36px;
	background-image: url(@/assets/images/unlock.svg);
	background-repeat: no-repeat;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.15s;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	&.lock {
		background-image: url(@/assets/images/lock.svg);
	}
}

</style>
