<script lang="ts" setup>
import { toast } from 'vue-sonner'

const props = defineProps<{
    productId?: string,
    productName?: string
}>();
const amount = ref(0);
const modalName = computed(() => `sellModal-${props.productId}`)

const openModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.showModal()
};
const closeModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.close()
};

const performSell = async () => {
    if (amount.value <= 0) {
        toast.error('Amount must be greater than 0', {
            duration: 5000
        });
        return;
    }
    try {
        await $fetch('/api/sell', {
            method: 'POST',
            body: {
                productId: props.productId,
                amount: amount.value,
            }
        });

    closeModal()
    } catch (error) {
        toast.error('Error selling item', {
            description: error || 'An error occurred while selling the item.',
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
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </button>
    <dialog :id="modalName" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">How many {{ productName }} did you sell?</h3>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            <div class="space-y-4">
                <label class="floating-label">
                    <input type="number" placeholder="How mouch did you sell?" class="input" v-model="amount" required
                        min=1 />
                    <span class="label">Amount</span>
                    <p class="validator-hint">Must be greater than 1</p>
                </label>
            </div>
            <div class="modal-action">
                <!-- <form method="dialog" class="space-x-2"> -->
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary" @click.stop="performSell">Save</button>
                <button class="btn" @click="closeModal">Close</button>
                <!-- </form> -->
            </div>
        </div>
    </dialog>
</template>