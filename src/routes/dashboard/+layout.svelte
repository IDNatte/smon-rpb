<script lang="ts">
	import SidebarComponent from '$lib/comoponents/sidebar/SidebarComponent.svelte';
</script>

<div class="dashboard h-screen">
	<div class="flex">
		<div class="w-[5%] h-screen fixed bg-white">
			<SidebarComponent />
		</div>
		<div class="main-content w-[95%] ml-[5em] p-[3em]">
			<slot />
		</div>
	</div>
</div>
