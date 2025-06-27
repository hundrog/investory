<script lang="ts" setup>
import { toast } from 'vue-sonner'

const props = defineProps<{
    productId?: string,
    productName?: string
}>();
const modalName = computed(() => `deleteModal-${props.productId}`)

const openModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.showModal()
};
const closeModal = () => {
    const modal = document.getElementById(modalName.value) as HTMLDialogElement;
    modal.close()
};

const performDelete = async () => {
    try {
        await $fetch(`/api/product?id=${props.productId}`, {
            method: 'DELETE',
        });
        closeModal()
        navigateTo('/')
        toast.success(`Product ${props.productName} deleted successfully!`, {
            duration: 5000
        });
    } catch (error) {
        toast.error('Error deleting item', {
            description: error || 'An error occurred while deleting the item.',
            duration: 5000
        });
        return;
    }
};

</script>
<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-circle btn-ghost" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    </button>
    <dialog :id="modalName" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">Do you want to delete {{ productName }}?</h3>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            <!-- <div class="space-y-4">
                <label class="floating-label">
                    <input type="text" placeholder="Write delete to continue" class="input" v-model="confirm" required
                        min=1 />
                    <span class="label">Confirm</span>
                </label>
            </div> -->
            <div class="modal-action">
                <!-- <form method="dialog" class="space-x-2"> -->
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary" @click.stop="performDelete">Accept</button>
                <button class="btn" @click="closeModal">Cancel</button>
                <!-- </form> -->
            </div>
        </div>
    </dialog>
</template>