<script setup lang="ts">
const items = ref([
    {
        id: 1,
        name: "Banderilla",
        amount: 18,
        cost: 12,
        price: 25
    }
])
</script>
<template>
    <ul class="list bg-base-100 rounded-box shadow-md">

        <!-- <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li> -->

        <li class="list-row" v-for="item in items" :key="item.id">

            <div></div>
            <div>
                <div class="text-xl">{{ item.name }}</div>
                <div class="text-xs font-semibold opacity-60">{{ item.amount }} restantes</div>
                <div class="text-xs font-semibold">Ganancia: {{ item.price - item.cost }}</div>
            </div>
            <ItemRefillButton />
            <ItemSellButton />
            <ItemEditButton />
        </li>
    </ul>
</template>