<script lang="ts" setup>
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
const user = useSupabaseUser()

const logout = async () => {
  const { error } = await useSupabaseClient().auth.signOut()
  if (error) {
    toast.error('Logout failed', {
      description: error.message,
      duration: 5000
    })
  } else {
    navigateTo('/login')
  }
}
</script>

<template>
  <div>
    <div class="navbar bg-base-100 shadow-sm mb-4">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">La Gusgueria</a>
      </div>
      <div class="flex-none">
        <button class="btn" @click="logout" v-if="user">
          Logout
        </button>
      </div>
    </div>
    <NuxtPage />
    <Toaster richColors/>
  </div>
</template>
