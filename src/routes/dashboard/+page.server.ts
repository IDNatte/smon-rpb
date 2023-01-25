import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const sysInfoCall = await fetch('/api/system/system')
  const servInfoCall = await fetch('/api/system/services')
  const netInfoCall = await fetch('/api/system/network')
  const diskInfoCall = await fetch('/api/system/disk')
  const cpuInfoCall = await fetch('/api/system/cpu')
  const procInfoCall = await fetch('/api/system/process')
  const memInfoCall = await fetch('/api/system/memory')

  const sys = await sysInfoCall.json()
  const services = await servInfoCall.json()
  const network = await netInfoCall.json()
  const disk = await diskInfoCall.json()
  const cpu = await cpuInfoCall.json()
  const process = await procInfoCall.json()
  const memory = await memInfoCall.json()
  return {
    sys,
    network,
    services,
    disk,
    cpu,
    process,
    memory
  };
};
