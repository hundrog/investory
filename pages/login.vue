<script setup lang="ts">
import { toast } from 'vue-sonner'
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithEmail = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    toast.error(error.message, {
      description: 'Please check your email and password.',
      duration: 5000
    })
  } else {
    navigateTo('/confirm')
  }
}
</script>
<template>
  <div class="hero bg-base-200 min-h-screen flex items-center justify-center">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Start managing your inventory and sales with La Gusgueria.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <fieldset class="fieldset">
            <label class="label">Email</label>
            <input type="email" class="input" placeholder="Email" v-model="email"/>
            <label class="label">Password</label>
            <input type="password" class="input" placeholder="Password" v-model="password" />
            <!-- <div><a class="link link-hover">Forgot password?</a></div> -->
            <button class="btn btn-neutral mt-4" @click="signInWithEmail">Login</button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
