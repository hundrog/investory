<script setup lang="ts">
import { toast } from 'vue-sonner'
const props = defineProps<{
    productId?: string,
    productName?: string
}>();
const modalName = computed(() => `refillModal-${props.productId}`)

const openModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.showModal()
};
const closeModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.close()
};
const amount = ref(0);
const cost = ref(0.0);
const refillItem = async () => {
    if (amount.value <= 0) {
        toast.error('Amount must be greater than 0', {
            duration: 5000
        });
        return;
    }
    if (cost.value <= 0) {
        toast.error('Cost must be greater than 0', {
            duration: 5000
        });
        return;
    }
    try {
        await $fetch('/api/refill', {
            method: 'POST',
            body: {
                productId: props.productId,
                amount: amount.value,
                cost: cost.value,
            }
        });

    closeModal
    } catch (error) {
        toast.error('Error refilling item', {
            description: error || 'An error occurred while refilling the item.',
            duration: 5000
        });
        return;
    }
};
</script>
<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-circle btn-ghost" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </button>
    <dialog :id="modalName" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">Refill your {{ productName }}</h3>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            <div class="space-y-4">
                <label class="floating-label">
                    <input type="number" placeholder="Type here" class="input" v-model="amount" />
                    <span class="label">Amount</span>
                </label>
                <label class="floating-label">
                    <input type="text" placeholder="Type here" class="input" v-model="cost"/>
                    <span class="label">Cost</span>
                </label>
            </div>
            <div class="modal-action">
                <form method="dialog" class="space-x-2">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary" @click.stop="refillItem">Save</button>
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>
