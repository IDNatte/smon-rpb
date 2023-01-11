<script lang="ts">
	import { page } from '$app/stores';

	import SidebarComponent from '$lib/comoponents/sidebar/SidebarComponent.svelte';
</script>

<div class="dashboard h-screen">
	<div class="flex">
		<div class="w-[25%] h-screen">
			<SidebarComponent username={$page.data.user.name} />
		</div>
		<div class="main-content w-[85%]">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus laboriosam facere error
			tempora nesciunt, beatae veniam libero iure corporis expedita voluptates, vel autem nobis.
			Animi explicabo deleniti dicta incidunt soluta!
		</div>
	</div>
	<a href="/logout">Log out</a>
</div>
