<script lang="ts">
	import PageloadComponent from '$lib/comoponents/loader/PageloadComponent.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import navigationStore from '$lib/stores/navigationStore';
	import { fade } from 'svelte/transition';

	import '../app.css';

	beforeNavigate(() => {
		$navigationStore = 'loading';
	});

	afterNavigate(() => {
		$navigationStore = 'loaded';
	});
</script>

{#if $navigationStore === 'loading'}
	<div out:fade={{ delay: 500 }}>
		<PageloadComponent />
	</div>
{/if}

<slot />
