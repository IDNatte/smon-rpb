<script lang="ts">
	import type { PageServerData } from './$types';

	import { JsonView } from '@zerodevx/svelte-json-view';
	import CardComponent from '$lib/comoponents/card/CardComponent.svelte';
	import ChipLogo from '$lib/comoponents/svg/ChipLogo.svelte';

	export let data: PageServerData;
</script>

<CardComponent>
	<span slot="title">os info</span>
	<JsonView json={data.sys} />
</CardComponent>

<CardComponent>
	<span slot="title">CPU Info</span>
	<JsonView json={data.cpu} />
</CardComponent>

<CardComponent>
	<span slot="title">Memory Info</span>
	<JsonView json={data.memory} />
</CardComponent>

<CardComponent>
	<span slot="title">Disk Info</span>
	<JsonView json={data.disk} />
</CardComponent>

<CardComponent>
	<span slot="title">Process Info</span>
	<JsonView json={data.process} />
</CardComponent>

<CardComponent>
	<span slot="title">Network Info</span>
	<JsonView json={data.network} />
</CardComponent>

<CardComponent>
	<span slot="title">Services List</span>
	{#each data.services as { name, running, mem, cpu }}
		<ul>
			<li class="flex items-center">
				<ChipLogo />
				<div class="block w-full">
					<span class="block w-full">{name}</span>
					<span class="block w-full">{running ? 'running' : 'not running'}</span>
				</div>
			</li>
		</ul>
	{/each}
	<!-- <JsonView json={data.services} /> -->
</CardComponent>

<!-- <CardComponent />
<CardComponent />
<CardComponent /> -->
<!-- <CardComponent />
<CardComponent />
<CardComponent />
<CardComponent />
<CardComponent />
<CardComponent />
<CardComponent />
<CardComponent /> -->
