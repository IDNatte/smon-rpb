<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="dashboard">
	<span>test dashboard</span>

	<span> hello "{$page.data.user.name}"</span>

	<form action="/logout" method="post">
		<button type="submit">Log out</button>
	</form>
</div>
