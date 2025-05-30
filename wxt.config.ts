import { defineConfig } from 'wxt';
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'uuuUnForget',
    permissions: ['activeTab', 'notifications', 'scripting'],
  },
  // outDir: '.'
});
