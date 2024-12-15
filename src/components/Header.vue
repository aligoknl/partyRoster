<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useParticipantStore } from "../stores/participantStore";

const participantStore = useParticipantStore();
const { isStoredDarkMode } = storeToRefs(participantStore);
</script>
<template>
  <div class="card-container">
    <!-- Christmas Lights -->
    <ul :class="isStoredDarkMode ? 'lights' : ''">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <!-- Card Content -->
    <div
      class="card flex justify-center"
      :class="!isStoredDarkMode ? '!bg-accent' : '!bg-primary'"
    >
      <h3 :class="!isStoredDarkMode ? '!text-primary' : '!text-secondary'">
        <span>
          <i class="pi pi-sparkles"></i>
        </span>
        Join The XMas Party 2024!
        <span>
          <i class="pi pi-sparkles"></i>
        </span>
      </h3>
    </div>
  </div>
</template>
<style scoped>
.card-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card {
  position: relative;
  z-index: 1;
  padding: 30px;
  margin-top: 1.8rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.lights {
  --color-1: 255, 249, 82;
  --color-2: 0, 234, 255;
  --color-3: 247, 0, 148;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 20px;
  pointer-events: none;
}

.lights li {
  flex: none;
  position: relative;
  list-style: none;
  width: 15px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(var(--color-1), 1);
  box-shadow: 0 5px 24px 3px rgba(var(--color-1), 1);
  animation: lighting-1 1.25s infinite linear;
}

.lights li:before {
  position: absolute;
  content: "";
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background-color: #222;
  border-radius: 100%;
}

.lights li:after {
  position: absolute;
  content: "";
  z-index: -1;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 54px;
  height: 5px;
  border-bottom: 1px solid #222;
  border-radius: 100%;
}

.lights li:last-child:after {
  display: none;
}

@keyframes lighting-1 {
  50% {
    background-color: rgba(var(--color-1), 0.25);
    box-shadow: 0 5px 24px 3px rgba(var(--color-1), 0.25);
  }
}

.lights li:nth-child(odd) {
  background-color: rgba(var(--color-2), 1);
  box-shadow: 0 5px 24px 3px rgba(var(--color-2), 0.8);
  animation: lighting-2 1.5s infinite linear;
}

@keyframes lighting-2 {
  50% {
    background-color: rgba(var(--color-2), 0.4);
    box-shadow: 0 5px 24px 3px rgba(var(--color-2), 0.3);
  }
}

.lights li:nth-child(4n + 2) {
  background-color: rgba(var(--color-3), 1);
  box-shadow: 0 5px 24px 3px rgba(var(--color-3), 1);
  animation: lighting-3 1.5s infinite linear;
  animation-delay: 1.25s;
}

@keyframes lighting-3 {
  50% {
    background-color: rgba(var(--color-3), 0.25);
    box-shadow: 0 5px 24px 3px rgba(var(--color-3), 0.25);
  }
}
</style>
