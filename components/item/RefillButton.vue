<script setup lang="ts">
const amount = ref(0);
const price = ref(0.0);
const refillItem = () => {
    // Logic to refill the item
    // This could be an API call to update the item's amount and price
    console.log("Item refilled");
    // Close the modal after refilling
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.close();
};
</script>
<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-circle btn-ghost" onclick="my_modal_1.showModal()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </button>
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">Refill your product</h3>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            <div class="space-y-4">
                <label class="floating-label">
                    <input type="number" placeholder="Type here" class="input" v-model="amount" />
                    <span class="label">Amount</span>
                </label>
                <label class="floating-label">
                    <input type="text" placeholder="Type here" class="input" v-model="price"/>
                    <span class="label">Price</span>
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
