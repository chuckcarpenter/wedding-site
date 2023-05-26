import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), UnoCSS()],
});
