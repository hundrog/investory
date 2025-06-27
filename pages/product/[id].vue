<script lang="ts" setup>
import { toast } from 'vue-sonner'
import type { Database } from '~/database.types'

type Product = Database['public']['Tables']['products']['Row']

const loading = ref(true)
const product = ref<Product>()
const route = useRoute()

onMounted(async () => {
  console.log('Loading product', route.params.id)
  try {
    const { data } = await $fetch(`/api/product?id=${route.params.id}`)
    product.value = data
  } catch (e) {
    toast.error('Error loading product')
  } finally {
    loading.value = false
  }
})

const saveProduct = async () => {
  try {
    const { data } = await $fetch('/api/product', {
      method: 'PUT',
      body: product.value,
    })
    product.value = data
    toast.success('Product updated!')
    navigateTo('/')
  } catch (e) {
    toast.error('Error updating product')
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex items-bottom justify-around space-x-2">
      <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
      <ItemDeleteButton :product-id="product?.id" :product-name="product?.name" />
    </div>
    <form class="card bg-base-100 shadow-xl w-full max-w-md p-6 space-y-4" @submit.prevent="saveProduct"
      v-if="!loading && product">
      <div>
        <label class="label">ID</label>
        <input class="input input-bordered w-full" type="text" v-model="product.id" disabled />
      </div>
      <div>
        <label class="label">Name</label>
        <input class="input input-bordered w-full" v-model="product.name" required />
      </div>
      <div>
        <label class="label">Price</label>
        <input class="input input-bordered w-full" type="number" min="0" step="0.01" v-model.number="product.price"
          required />
      </div>
      <div>
        <label class="label">Amount</label>
        <input class="input input-bordered w-full" type="number" min="0" v-model.number="product.amount" disabled />
      </div>
      <div>
        <label class="label">Cost</label>
        <input class="input input-bordered w-full" type="number" min="0" step="0.01" v-model.number="product.cost"
          disabled />
      </div>
      <button class="btn btn-primary w-full mt-4" type="submit">Save</button>
      <NuxtLink to="/" class="btn w-full" type="button">Back</NuxtLink>
    </form>
    <div v-else class="text-center">Loading...</div>
  </div>
</template>