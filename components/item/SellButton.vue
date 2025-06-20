<script lang="ts" setup>
const amount = ref(0);
const SellItem = () => {
    // Logic to sell the item
    // This could be an API call to update the item's amount and price
    console.log("Item sold");
    // Close the modal after selling
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
    modal.close();
};
</script>
<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-circle btn-ghost" onclick="my_modal_2.showModal()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </button>
    <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">How mouch did you sell?</h3>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            <div class="space-y-4">
                <label class="floating-label">
                    <input type="number" placeholder="Type here" class="input" v-model="amount" />
                    <span class="label">Amount</span>
                </label>
            </div>
            <div class="modal-action">
                <form method="dialog" class="space-x-2">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary" @click.stop="SellItem">Save</button>
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>