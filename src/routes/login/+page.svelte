<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import UserLogo from '$lib/comoponents/svg/UserLogo.svelte';
	import SendLogo from '$lib/comoponents/svg/SendLogo.svelte';
	import KeyLogo from '$lib/comoponents/svg/KeyLogo.svelte';

	export let form: ActionData;
</script>

<div class="login-page block relative">
	<div class="flex flex-col items-center justify-center w-full h-screen">
		<div class="w-[30%] shadow-lg border-gray-200 border-[1px] rounded p-3">
			<h1 class="text-center text-xl font-semibold uppercase pb-3 mb-4">Hello 👋</h1>

			{#if form?.invalid}
				<p class="text-red-400 pb-3 text-center">Username and password is required</p>
			{/if}

			{#if form?.credentials}
				<p class="text-red-400 pb-3 text-center">You have entered the wrong credentials</p>
			{/if}

			<form class="flex flex-col" action="/login" method="post" use:enhance>
				<div class="form-wrapper flex items-center justify-center py-2">
					<label for="username">
						<UserLogo />
					</label>
					<input
						class="login-reset-form ring-transparent border-gray-200 p-[3px] rounded"
						type="text"
						name="username"
						id="username"
					/>
				</div>

				<div class="form-wrapper flex items-center justify-center py-2">
					<label for="password">
						<KeyLogo />
					</label>
					<input
						class="login-reset-form ring-transparent border-gray-200 p-[3px] rounded"
						type="password"
						name="password"
						id="password"
					/>
				</div>

				<button
					class="py-[.4em] mt-[.5rem] rounded shadow bg-[#dddddf] flex items-center justify-center"
					type="submit"
				>
					<span>Login</span>
					<SendLogo height="1.7em" width="1.7em" className="pl-2" />
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.login-reset-form:focus {
		box-shadow: none !important;
		outline: none !important;
	}

	.form-wrapper > label {
		padding-right: 1.4rem;
	}
</style>
