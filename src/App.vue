<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Toast from "primevue/toast";
import { useParticipantStore } from "./stores/participantStore";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import AddParticipant from "./components/AddParticipant.vue";
import ParticipantList from "./components/ParticipantList.vue";
import Footer from "./components/Footer.vue";

const participantStore = useParticipantStore();
const { isStoredDarkMode } = storeToRefs(participantStore);

const handleThemeToggle = (iconClass: string) => {
  if (iconClass === "pi-sun") {
    return (isStoredDarkMode.value = true);
  }
  return (isStoredDarkMode.value = false);
};

onMounted(async () => {
  await participantStore.fetchParticipants();
});
</script>
<template>
  <div>
    <Toast />
    <ThemeSwitcher @toggle-theme="handleThemeToggle" />
    <AddParticipant />
    <ParticipantList />
    <Footer />
  </div>
</template>
