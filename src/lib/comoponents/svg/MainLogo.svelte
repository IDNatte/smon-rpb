<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { navigating } from '$app/stores';

	export let height: string = '1.2em';
	export let width: string = '1.2em';
	export let className: string = '';

	$: loading = false;

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});
</script>

<div class="{className} {loading ? 'animate-pulse' : ''}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#374151" {width} {height}>
		<path
			fill-rule="evenodd"
			d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
			clip-rule="evenodd"
		/>
	</svg>
</div>
