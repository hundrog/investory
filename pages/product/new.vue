<script lang="ts" setup>
import { toast } from 'vue-sonner'

const product = ref({
  name: '',
  price: 0,
})

const saveProduct = async () => {
  try {
    const { data } = await $fetch('/api/product', {
      method: 'POST',
      body: {
        name: product.value.name,
        price: product.value.price,
      }
    })
    product.value = data
    toast.success('Product created!')
    navigateTo('/')
  } catch (e) {
    toast.error('Error creating product')
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Create Product</h1>
    <form class="card bg-base-100 shadow-xl w-full max-w-md p-6 space-y-4" @submit.prevent="saveProduct">
      <div>
        <label class="label">Name</label>
        <input class="input input-bordered w-full" v-model="product.name" required />
      </div>
      <div>
        <label class="label">Price</label>
        <input class="input input-bordered w-full" type="number" min="0" step="0.01" v-model.number="product.price"
          required />
      </div>
      <button class="btn btn-primary w-full mt-4" type="submit">Save</button>
      <NuxtLink to="/" class="btn w-full" type="button">Back</NuxtLink>
    </form>
  </div>
</template>
