<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="login-page">
	<h1>Login first to access</h1>

	<form action="/login" method="post" use:enhance>
		<label for="username">username</label>
		<input type="text" name="username" id="username" />

		<label for="password">Password</label>
		<input type="password" name="password" id="password" />

		<input type="submit" value="test" />
	</form>

	{#if form?.invalid}
		<p class="error">Username or password is wrong</p>
	{/if}

	{#if form?.credentials}
		<p class="error">Username or password is wrong</p>
	{/if}
</div>
