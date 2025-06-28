<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Database } from '~/database.types'
type Product = Database['public']['Tables']['products']['Row']
const items = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await $fetch(`/api/products`)
    items.value = data
  } catch (e) {
    toast.error('Error loading products')
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <PageLoader  v-if="loading"/>
  <ul class="list bg-base-100 rounded-box shadow-md space-y-2" v-else>
    <div class="flex items-center justify-end">
      <NuxtLink to="/product/new" class="btn btn-primary">Add Product</NuxtLink>
    </div>
    <li class="list-row" v-for="item in items" :key="item.id">
      <div></div>
      <div>
        <div class="text-xl">{{ item.name }}</div>
        <div class="text-xs font-semibold opacity-60">{{ item.amount }} restantes</div>
        <div class="text-xs font-semibold">Ganancia: ${{ item.price - item.cost }}</div>
      </div>
      <ItemSellButton :product-name="item.name" :product-id="item.id" />
      <ItemRefillButton :product-name="item.name" :product-id="item.id" />
      <ItemEditButton :product-id="item.id"/>
    </li>
  </ul>
</template>