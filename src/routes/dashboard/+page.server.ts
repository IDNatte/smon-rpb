import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const sysInfoCall = await fetch('/api/system/system')
  const sys = await sysInfoCall.json()

  return {
    sys
  };
};
