import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = () => {
  // todo
}

export const actions: Actions = {
  default: async () => {
    // const form = await request.formData()
    // const username = form.get('username')

    return {
      headers: { location: '/dashboard' }
    }
  }
};