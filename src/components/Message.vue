<template>
	<Teleport to="body">
		<div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-[20px] py-[10px] rounded-md text-[#eee] bg-[#000000]/[.6] select-none pointer-events-none transition-all opacity-0" :class="{ 'opacity-100': show }">{{ options.text }}</div>
	</Teleport>
</template>



<script setup>
import { watch, ref } from 'vue'

const { options } = defineProps({ options: {} })
const emit = defineEmits(['isHide'])

let show = ref(false)


watch(options, (newValue) => {
	if ( newValue.show === true ) {
		show.value = true
		setTimeout(() => {
			emit('isHide')
		}, newValue.time)
	}

	if ( newValue.show === false ) {
		show.value = false
	}
})

</script>



<style lang="scss" scoped>
</style>