<template>

	<Panel
		:slots_amount="store.getters.colorSlotsAmount"
		@generatecolors="generateColors"
		@removecolorslot="geleteColorSlot()"
		@addcolorslot="addColorSlot()"
	/>

	<div class="cols">

		<div
			class="col"
			v-for="(colorSlot, index) in store.getters.colorSlots"
			:key="colorSlot.id"
			:style="{ background: colorSlot.color }"
		>

			<div class="color_name" @click="copyToClipboard(colorSlot.color)" v-tooltip="{ text: 'Нажмите, чтобы скопировать код цвета', position: 'bottom' }">{{ colorSlot.color }}</div>

			<div
				class="status"
				:class="{ lock: colorSlot.lock }"
				@click="toggleLock(colorSlot.id)"
			></div>

			<div class="show_shades" @click="generateShades(colorSlot.color)">Оттенки</div>

			<div class="arrows">
				<div class="l_arrow" @click="moveColorSlot('l', index)"></div>
				<div class="r_arrow" @click="moveColorSlot('r', index)"></div>
			</div>

			<div class="delete_color" @click="geleteColorSlot(colorSlot.id)"></div>

			<div
				class="shades"
				:class="{
					show: store.getters.colorShades(colorSlot.id).length,
				}"
			>
				<div
					class="shade"
					v-for="shade in store.getters.colorShades(colorSlot.id)"
					:key="shade"
					:style="{ background: shade }"
					@click="changeColor(shade, colorSlot.id)"
				>
					<span>{{ shade }}</span>
				</div>
			</div>
		</div>

	</div>

	<Message :options="message" @isHide="message.show = false" />

</template>


<script setup>
import { onMounted, onBeforeUpdate, onBeforeUnmount, reactive } from 'vue';
import { useStore } from 'vuex';
import Panel from '@/components/Panel';
import Message from '@/components/Message';

const store = useStore()

const message = reactive({
	text: 'Код скопирован в буфер обмена',
	show: false,
	duration: 3000,
	time: null,
})


function getRandomColor() {

	const characters = '0123456789abcdef'

	let color = ''

	for (let i = 0; i < 6; i++) {
		color += characters[Math.floor(Math.random() * characters.length)]
	}

	return color

}

function generateColors(e) {
	if (e !== undefined) {
		if (e.code === 'Space') {
			store.state.colorSlots.forEach((colorSlot) => {
				if (!colorSlot.lock) {
					store.commit('SET_COLOR', { id: colorSlot.id, newColor: getRandomColor() })
				}
			})
		}
	}
	else {
		if ( document.location.hash.length > 0 ) {
			getColorsFromString(document.location.hash)
		}
		else {
			for (let i = 0; i < store.state.default_colors_num; i++) {
				store.commit('SET_COLOR_SLOT', getRandomColor())
			}
		}
	}
}

function generateShades(color) {
	let tints = calculate(color.slice(1), rgbTint)
	let shade = calculate(color.slice(1), rgbShade).slice(1)
	store.commit('SET_SHADES', { color: color, shades: tints.reverse().concat(shade) })
}

function toggleLock(id) {
	store.commit('TOGGLE_LOCK', id)
}

function changeColor(newColor, id) {
	store.commit('SET_COLOR', { id: id, newColor: newColor.slice(1) })
}

function updateHash() {
	document.location.hash = store.getters.colorsWithoutHash.join('-')
}

function getColorsFromString(string) {

	store.commit('DELETE_ALL_COLOR_SLOTS')
	
	string.slice(1).split('-').forEach((color) => {
		if ( /^[0123456789abcdef]{6,6}/.test(color) ) {
			store.commit('SET_COLOR_SLOT', color)
		}
	})
}

function copyToClipboard(text) {
	message.show = true
	message.time = Date.now()
	return navigator.clipboard.writeText(text)
}

function geleteColorSlot(id) {
	if ( id ) {
		store.commit('DELETE_COLOR_SLOT', id)
	}
	else {
		store.commit('DELETE_LAST_COLOR_SLOT')
	}
}

function addColorSlot() {
	store.commit('SET_COLOR_SLOT', getRandomColor())
}

function moveColorSlot(direction, index) {
	store.commit('CHANGE_COLOR_SLOT_POSITION', { direction: direction, index: index })
}


function pad(number, length) {
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}

function intToHex(rgbint) {
	return pad(Math.min(Math.max(Math.round(rgbint), 0), 255).toString(16), 2);
}

function hexToRGB(colorValue) {
	return {
		red: parseInt(colorValue.substr(0, 2), 16),
		green: parseInt(colorValue.substr(2, 2), 16),
		blue: parseInt(colorValue.substr(4, 2), 16)
	}
}

function rgbToHex(rgb) {
	return intToHex(rgb.red) + intToHex(rgb.green) + intToHex(rgb.blue);
}

function rgbShade(rgb, i) {
	return {
		red: rgb.red * (1 - 0.1 * i),
		green: rgb.green * (1 - 0.1 * i),
		blue: rgb.blue * (1 - 0.1 * i)
	}
}

function rgbTint(rgb, i) {
	return {
		red: rgb.red + (255 - rgb.red) * i * 0.1,
		green: rgb.green + (255 - rgb.green) * i * 0.1,
		blue: rgb.blue + (255 - rgb.blue) * i * 0.1
	}
}

function calculate(colorValue, shadeOrTint) {
	var color = hexToRGB(colorValue);
	var shadeValues = [];

	for (var i = 0; i < 20; i++) {
		shadeValues[i] = rgbToHex(shadeOrTint(color, (i/2)));
	}
	return shadeValues;
}


onMounted(() => {
	generateColors()
	document.addEventListener('keydown', generateColors)
})

onBeforeUpdate(() => {
	updateHash()
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

html,
body {
	height: 100%;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.cols {
	display: flex;
	flex: 1;
}

.col {
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;

	&:hover {
		.show_shades {
			visibility: visible;
		}

		.delete_color {
			visibility: visible;
		}

		.arrows {
			visibility: visible;
		}
	}
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

.show_shades {
	visibility: hidden;
	margin-top: 20px;
	padding: 6px 10px;
	font-size: 16px;
	font-family: sans-serif;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.15s;

	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}
}

.shades {
	display: none;
	flex-direction: column;
	position: absolute;
	height: 100%;
	width: 100%;

	&.show {
		display: flex;
	}
}

.shade {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	& > span {
		padding: 2px 8px;
		font-size: 12px;
		font-family: sans-serif;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 6px;
		opacity: 0;
		user-select: none;
	}

	&:hover {
		& > span {
			opacity: 1;
		}
	}
}

.delete_color {
	visibility: hidden;
	margin-top: 20px;
	width: 24px;
	height: 24px;
	background: rgba(255, 255, 255, 0.5) url(@/assets/images/delete.svg);
	border-radius: 6px;
	cursor: pointer;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}
}

.arrows {
	visibility: hidden;
	position: relative;
	display: flex;
	margin-top: 20px;
	width: 80px;
	height: 36px;
	border-radius: 6px;
	overflow: hidden;
}

.l_arrow {
	position: relative;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.5);
	cursor: pointer;

	&:before {
		content: '';
		display: block;
		width: 14px;
		height: 14px;
		border-left: 2px solid #000;
		border-bottom: 2px solid #000;
		transform: rotate(45deg);
	}

	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}
}

.r_arrow {
	@extend .l_arrow;
	border: none;

	&:before {
		transform: rotate(225deg);
	}
}

</style>
