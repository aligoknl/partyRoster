import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

interface Participant {
  _id?: string; // MongoDB will generate this
  name: string;
  item: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useParticipantStore = defineStore("participant", () => {
  const participants = ref<Participant[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isStoredDarkMode = ref<boolean>(false);

  const fetchParticipants = async () => {
    isLoading.value = true;
    try {
      const { data } = await axios.get<Participant[]>(
        `${API_URL}/participants`
      );
      participants.value = data;
    } catch (err) {
      error.value = (err as Error).message;
    }
    isLoading.value = false;
  };

  const addParticipant = async (newParticipant: Participant) => {
    isLoading.value = true;
    try {
      const { data } = await axios.post<Participant>(
        `${API_URL}/participants`,
        newParticipant
      );
      participants.value.unshift(data);
    } catch (err) {
      error.value = (err as Error).message;
    }
    isLoading.value = false;
  };

  const updateParticipant = async (id: string, updatedData: Participant) => {
    try {
      const { data } = await axios.put<Participant>(
        `${API_URL}/participants/${id}`,
        updatedData
      );
      const index = participants.value.findIndex((p) => p._id === id);
      if (index !== -1) {
        participants.value[index] = data;
      }
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const deleteParticipant = async (id: string) => {
    isLoading.value = true;
    try {
      await axios.delete(`${API_URL}/participants/${id}`);
      participants.value = participants.value.filter((p) => p._id !== id);
    } catch (err) {
      error.value = (err as Error).message;
    }
    isLoading.value = false;
  };

  return {
    participants,
    error,
    isLoading,
    isStoredDarkMode,
    fetchParticipants,
    addParticipant,
    updateParticipant,
    deleteParticipant,
  };
});
