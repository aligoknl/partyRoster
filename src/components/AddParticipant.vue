<script lang="ts" setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

import { useParticipantStore } from "../stores/participantStore";
import Header from "./Header.vue";
const toast = useToast();

const name = ref("");
const item = ref("");
const errors = ref<{ name?: string; item?: string }>({});

const participantStore = useParticipantStore();

const validateForm = () => {
  const newErrors: { name?: string; item?: string } = {};

  if (!name.value.trim()) {
    newErrors.name = "Name is required.";
  }

  if (!item.value.trim()) {
    newErrors.item = "Item is required.";
  }

  errors.value = newErrors;

  return Object.keys(newErrors).length === 0;
};

const onFormSubmit = async () => {
  if (validateForm()) {
    await participantStore.addParticipant({
      name: name.value,
      item: item.value,
    });

    toast.add({
      severity: "success",
      summary: `Thanks for coming ${name.value}, see you at the party!`,
      life: 3000,
    });

    name.value = "";
    item.value = "";
    errors.value = {};
  }
};
</script>

<template>
  <div class="card flex justify-center mt-2">
    <form
      @submit.prevent="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-96"
    >
      <Header />
      <!-- Name Input -->
      <div class="flex flex-col gap-1">
        <InputText v-model="name" type="text" placeholder="Name" fluid />
        <Message
          v-if="errors.name"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.name }}
        </Message>
      </div>

      <!-- Item Input -->
      <div class="flex flex-col gap-1">
        <InputText
          v-model="item"
          type="text"
          placeholder="Item to bring"
          fluid
        />
        <Message
          v-if="errors.item"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.item }}
        </Message>
      </div>

      <!-- Submit Button -->
      <Button type="submit" label="LET'S-A GO!" class="!bg-primary" />
    </form>
  </div>
</template>
