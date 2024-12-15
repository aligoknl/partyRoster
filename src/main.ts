import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "./App.vue";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";

import ThemeSwitcher from "./components/ThemeSwitcher.vue";

// @ts-ignore
import AppState from "./plugins/appState.js";
// @ts-ignore
import Noir from "./presets/Noir.js";

import "./style.css";
import "primeicons/primeicons.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: "p",
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  },
});
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Message", Message);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Card", Card);
app.component("ThemeSwitcher", ThemeSwitcher);

app.mount("#app");
