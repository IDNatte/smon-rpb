import { writable } from 'svelte/store';

type DashboardStore = {
  network: any,
  services: any,
  disk: any,
  cpu: any,
  process: any,
  memory: any
}

export default writable<DashboardStore>({
  network: null,
  services: null,
  disk: null,
  cpu: null,
  process: null,
  memory: null
});
