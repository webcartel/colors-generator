<template>

    <div class="panel">

        <div class="flex">

            <button class="btn mr-[20px] text-[13.333px]" v-tooltip="{ text: 'Обновить цвета можно нажатием пробела', position: 'bottom' }" @mousedown="$emit('generatecolors', {code: 'Space'})">Обновить цвета</button>
            
            <div class="slots_amount">
                <div class="slots_amount__btn" @mousedown="$emit('removecolorslot')">&#65123;</div>
                <div class="slots_amount__counter">{{ slots_amount }}</div>
                <div class="slots_amount__btn" @mousedown="$emit('addcolorslot')">+</div>
            </div>

        </div>

    </div>

</template>


<script setup>
const { slots_amount } = defineProps({ slots_amount: Number })

</script>


<style lang="scss">

.panel {
    display: flex;
    align-items: center;
    padding: 10px;
}

.slots_amount {
    display: flex;
    align-items: center;
    font-family: sans-serif;
    font-size: 26px;

    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border: 1px solid rgb(226, 226, 226);
        border-radius: 50%;
        user-select: none;
        cursor: pointer;
    }

    &__counter {
        padding: 0 20px;
    }

}

.btn {
    padding: 9px 20px;
    font-family: sans-serif;
    border-radius: 22px;
    border: 1px solid rgb(226, 226, 226);
    background: none;
    outline: none;
    cursor: pointer;
}

</style>