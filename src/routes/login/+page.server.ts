import type { PageServerLoad, Actions, Action } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt'

import { database } from "$lib/module/database/database";


export const load: PageServerLoad = async () => {
  // todo
}

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username ||
      !password
    ) {
      return fail(400, { invalid: true })
    }

    const user = await database.user.findUnique({
      where: { username }
    })

    if (!user) {
      return fail(400, { credentials: true })
    }

    const userPassword = await bcrypt.compare(password, user.password)

    if (!userPassword) {
      return fail(400, { credentials: true })
    }

    const authenticated = await database.user.update({
      where: {
        username: user.username
      },
      data: {
        userAuthToken: crypto.randomUUID()
      }
    })

    cookies.set('auth', authenticated.userAuthToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30
    })

    throw redirect(302, '/dashboard')
  }
};