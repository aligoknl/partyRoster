<template>
  <button
    type="button"
    class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded !ml2"
    @click="onThemeToggler"
  >
    <i :class="`dark:text-white pi ${iconClass}`" />
  </button>
</template>

<script>
import { $t, updatePreset, updateSurfacePalette } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";
import Nora from "@primevue/themes/nora";

const presets = {
  Aura,
  Lara,
  Nora,
};
export default {
  data() {
    return {
      iconClass: "pi-moon",
      presets: Object.keys(presets),
      selectedPrimaryColor: "noir",
      selectedSurfaceColor: null,
    };
  },
  methods: {
    onThemeToggler() {
      const root = document.getElementsByTagName("html")[0];

      root.classList.toggle("p-dark");
      this.iconClass = this.iconClass === "pi-moon" ? "pi-sun" : "pi-moon";
      this.$emit("toggle-theme", this.iconClass);
    },
    getPresetExt() {
      const color = this.primaryColors.find(
        (c) => c.name === this.selectedPrimaryColor
      );

      if (color.name === "noir") {
        return {
          semantic: {
            primary: {
              50: "{surface.50}",
              100: "{surface.100}",
              200: "{surface.200}",
              300: "{surface.300}",
              400: "{surface.400}",
              500: "{surface.500}",
              600: "{surface.600}",
              700: "{surface.700}",
              800: "{surface.800}",
              900: "{surface.900}",
              950: "{surface.950}",
            },
            colorScheme: {
              light: {
                primary: {
                  color: "{primary.950}",
                  contrastColor: "#ffffff",
                  hoverColor: "{primary.900}",
                  activeColor: "{primary.800}",
                },
                highlight: {
                  background: "{primary.950}",
                  focusBackground: "{primary.700}",
                  color: "#ffffff",
                  focusColor: "#ffffff",
                },
              },
              dark: {
                primary: {
                  color: "{primary.50}",
                  contrastColor: "{primary.950}",
                  hoverColor: "{primary.100}",
                  activeColor: "{primary.200}",
                },
                highlight: {
                  background: "{primary.50}",
                  focusBackground: "{primary.300}",
                  color: "{primary.950}",
                  focusColor: "{primary.950}",
                },
              },
            },
          },
        };
      } else {
        if (this.$appState.theme === "Nora") {
          return {
            semantic: {
              primary: color.palette,
              colorScheme: {
                light: {
                  primary: {
                    color: "{primary.600}",
                    contrastColor: "#ffffff",
                    hoverColor: "{primary.700}",
                    activeColor: "{primary.800}",
                  },
                  highlight: {
                    background: "{primary.600}",
                    focusBackground: "{primary.700}",
                    color: "#ffffff",
                    focusColor: "#ffffff",
                  },
                },
                dark: {
                  primary: {
                    color: "{primary.500}",
                    contrastColor: "{surface.900}",
                    hoverColor: "{primary.400}",
                    activeColor: "{primary.300}",
                  },
                  highlight: {
                    background: "{primary.500}",
                    focusBackground: "{primary.400}",
                    color: "{surface.900}",
                    focusColor: "{surface.900}",
                  },
                },
              },
            },
          };
        } else {
          return {
            semantic: {
              primary: color.palette,
              colorScheme: {
                light: {
                  primary: {
                    color: "{primary.500}",
                    contrastColor: "#ffffff",
                    hoverColor: "{primary.600}",
                    activeColor: "{primary.700}",
                  },
                  highlight: {
                    background: "{primary.50}",
                    focusBackground: "{primary.100}",
                    color: "{primary.700}",
                    focusColor: "{primary.800}",
                  },
                },
                dark: {
                  primary: {
                    color: "{primary.400}",
                    contrastColor: "{surface.900}",
                    hoverColor: "{primary.300}",
                    activeColor: "{primary.200}",
                  },
                  highlight: {
                    background:
                      "color-mix(in srgb, {primary.400}, transparent 84%)",
                    focusBackground:
                      "color-mix(in srgb, {primary.400}, transparent 76%)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)",
                  },
                },
              },
            },
          };
        }
      }
    },
    updateColors(type, color) {
      if (type === "primary") this.selectedPrimaryColor = color.name;
      else if (type === "surface") this.selectedSurfaceColor = color.name;

      this.applyTheme(type, color);
    },
    applyTheme(type, color) {
      if (type === "primary") {
        updatePreset(this.getPresetExt());
      } else if (type === "surface") {
        updateSurfacePalette(color.palette);
      }
    },
    onRippleChange(value) {
      this.$primevue.config.ripple = value;
    },
    onPresetChange(value) {
      this.$appState.theme = value;
      const preset = presets[value];
      const surfacePalette = this.surfaces.find(
        (s) => s.name === this.selectedSurfaceColor
      )?.palette;

      $t()
        .preset(preset)
        .preset(this.getPresetExt())
        .surfacePalette(surfacePalette)
        .use({ useDefaultOptions: true });
    },
  },
  computed: {
    rippleActive() {
      return this.$primevue.config.ripple;
    },
  },
};
</script>
