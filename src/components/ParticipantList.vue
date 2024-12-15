<script setup>
import { storeToRefs } from "pinia";
import { useParticipantStore } from "../stores/participantStore";
import ProgressSpinner from "primevue/progressspinner";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();

const participantStore = useParticipantStore();
const { participants, isLoading } = storeToRefs(participantStore);
const onCellEditComplete = async (event, name, item) => {
  const { data, field, newValue } = event;

  const hasEnteredData = localStorage.getItem("hasEnteredData");
  const storedName = localStorage.getItem("storedName");
  const storedItem = localStorage.getItem("storedItem");

  if (
    hasEnteredData === "true" &&
    storedName === data.name &&
    storedItem === data.item
  ) {
    if (typeof newValue === "string" && newValue.trim().length > 0) {
      data[field] = newValue;

      await participantStore.updateParticipant(data._id, data);
    }
    toast.add({
      severity: "info",
      summary: "Updated! Looking forward to it!",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "You must enter this information to edit!",
      life: 3000,
    });
  }
};

const confirmDelete = (id) => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "You are deleting this enrty",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: async () => {
      await deleteParticipant(id);
      toast.add({
        severity: "info",
        summary: "Deleted! Maybe next time!",
        life: 3000,
      });
    },
    reject: () => {},
  });
};

const deleteParticipant = async (id) => {
  await participantStore.deleteParticipant(id);
};
</script>

<template>
  <div v-if="!isLoading" class="card">
    <Message severity="success">
      <template #icon>
        <i class="pi pi-users"></i>
      </template>
      <span class="ml-2">Party Animals</span>
    </Message>
    <ConfirmDialog></ConfirmDialog>
    <DataTable
      :value="participants"
      editMode="cell"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      @cell-edit-complete="onCellEditComplete"
      :pt="{
        table: { style: 'min-width: 5rem' },
        column: {
          bodycell: ({ state }) => ({
            class: [{ '!py-0': state['d_editing'] }],
          }),
        },
      }"
    >
      <Column
        field="name"
        header="NAME"
        style="width: 40%"
        headerClass="font-bold"
      >
        <template #body="{ data, field }">{{ data[field] }}</template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid autofocus />
        </template>
      </Column>

      <Column
        field="item"
        header="BRINGINGS"
        style="width: 40%"
        headerClass="font-bold"
      >
        <template #body="{ data, field }">{{ data[field] }}</template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid autofocus />
        </template>
      </Column>

      <Column style="width: 10%" bodyClass="text-center">
        <template #body="{ data }">
          <Button
            label="Delete"
            variant="text"
            class="!text-[green] p-button"
            @click="confirmDelete(data._id)"
          />
        </template>
      </Column>
      <template
        #paginatorcontainer="{
          first,
          last,
          page,
          pageCount,
          prevPageCallback,
          nextPageCallback,
          totalRecords,
        }"
      >
        <div
          class="flex items-center gap-4 border border-primary bg-transparent rounded-full w-full py-1 px-2 justify-between"
        >
          <Button
            icon="pi pi-chevron-left"
            rounded
            text
            @click="prevPageCallback"
            :disabled="page === 0"
          />
          <div class="text-color font-medium">
            <span class="hidden sm:block"
              >Showing {{ first }} to {{ last }} of {{ totalRecords }}</span
            >
            <span class="block sm:hidden"
              >Page {{ page + 1 }} of {{ pageCount }}</span
            >
          </div>
          <Button
            icon="pi pi-chevron-right"
            rounded
            text
            @click="nextPageCallback"
            :disabled="page === pageCount - 1"
          />
        </div>
      </template>
    </DataTable>
  </div>
  <div v-else class="card flex justify-center">
    <ProgressSpinner
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="transparent"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
</template>
