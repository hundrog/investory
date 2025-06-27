<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Database } from '~/database.types'
type Product = Database['public']['Tables']['products']['Row']
const client = useSupabaseClient<Database>()
const items = ref<Product[]>([])

onMounted(async () => {
  const { data, error } = await client
    .from('products')
    .select('*')

  if (error) {
    toast.error(error.message, {
      description: 'Something went wrong while fetching the products.',
      duration: 5000
    })
  } else {
    items.value = data
  }
})
</script>
<template>
  <ul class="list bg-base-100 rounded-box shadow-md space-y-2">

    <!-- <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li> -->
    <li class="list-row" v-for="item in items" :key="item.id">
      <div>{{ item.id }}</div>
      <div>
        <div class="text-xl">{{ item.name }}</div>
        <div class="text-xs font-semibold opacity-60">{{ item.amount }} restantes</div>
        <div class="text-xs font-semibold">Ganancia: ${{ item.price - item.cost }}</div>
      </div>
      <ItemSellButton :product-name="item.name" :product-id="item.id" />
      <ItemRefillButton :product-name="item.name" :product-id="item.id" />
      <ItemEditButton />
    </li>
  </ul>
</template>