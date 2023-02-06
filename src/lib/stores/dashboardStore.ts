import { writable } from 'svelte/store';
import type { DashboardStore } from '$lib/module/ui/types/dashboard.types';

export default writable<DashboardStore>({
  network: null,
  services: null,
  disk: null,
  cpu: null,
  process: null,
  memory: null
});
