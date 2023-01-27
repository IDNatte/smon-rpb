<script lang="ts">
	import type { PageServerData } from './$types';

	import { JsonView } from '@zerodevx/svelte-json-view';
	import CardComponent from '$lib/comoponents/card/CardComponent.svelte';
	import ChipLogo from '$lib/comoponents/svg/ChipLogo.svelte';

	import { truncate } from '$lib/module/ui/truncate';
	import UserLogo from '$lib/comoponents/svg/UserLogo.svelte';
	import ScreenLogo from '$lib/comoponents/svg/ScreenLogo.svelte';
	import VerticalCardComponent from '$lib/comoponents/card/VerticalCardComponent.svelte';

	export let data: PageServerData;
</script>

<div class="grid grid-cols-1 gap-8 pb-20">
	<CardComponent height="h-auto">
		<span slot="title">os info</span>
		<div class="flex justify-around py-5">
			<VerticalCardComponent height="h-auto">
				<ScreenLogo width="2rem" height="auto" className="px-4 py-5 flex items-center border-r" />
				<div class="flex flex-col p-6">
					<span class="block w-full font-bold">{data.sys.os.platform} {data.sys.os.arch}</span>
					<span class="block w-full">{data.sys.os.hostname}</span>
					<span class="block w-full">{data.sys.os.distro}</span>
				</div>
			</VerticalCardComponent>

			<VerticalCardComponent height="h-auto">
				<UserLogo width="2rem" height="auto" className="px-4 py-5 flex items-center border-r" />
				<div class="flex flex-col p-6">
					<span class="block w-full font-bold">{data.sys.os.platform} {data.sys.os.arch}</span>
					<span class="block w-full">{data.sys.os.hostname}</span>
					<span class="block w-full">{data.sys.os.distro}</span>
				</div>
			</VerticalCardComponent>
		</div>
	</CardComponent>
</div>

<div class="grid grid-cols-4 gap-8 pb-20">
	<CardComponent>
		<span slot="title">CPU Info</span>
		<span>Temp {data.cpu.cpuTemp.main}</span>
		<span>CPU average Load {data.cpu.cpuLoad.avgLoad}</span>
		<span>CPU current Load {Math.round(data.cpu.cpuLoad.currentLoad)}%</span>
		<span>CPU Iddle load {Math.round(data.cpu.cpuLoad.currentLoadIdle)}%</span>
	</CardComponent>

	<CardComponent>
		<span slot="title">Memory Info</span>
		<span>Total Memory {new Intl.NumberFormat().format(data.memory.total)}</span>
		<span>used Memory {new Intl.NumberFormat().format(data.memory.used)}</span>
		<span>available Memory {new Intl.NumberFormat().format(data.memory.available)}</span>
	</CardComponent>

	<CardComponent>
		<span slot="title">Disk Info</span>
		<ul>
			{#each data.disk as { fs, type, size, available, used, use, mount }}
				<li class="flex items-center my-3 py-2 px-2 border rounded">
					<ChipLogo width="2em" height="auto" className="pr-3" />
					<div class="block w-full">
						<span class="block w-full uppercase font-semibold">{truncate(fs, 25)}</span>
						<div class="w-full flex justify-between">
							<span class="capitalize">disk Type</span>
							<span class="capitalize">{type}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">mount point</span>
							<span class="capitalize">{mount}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">size (bytes)</span>
							<span class="capitalize">{new Intl.NumberFormat().format(size)}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">free (bytes)</span>
							<span class="capitalize">{new Intl.NumberFormat().format(available)}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">used (bytes): </span>
							<span class="capitalize">{new Intl.NumberFormat().format(used)}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">used (%): </span>
							<span class="capitalize">{use}%</span>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</CardComponent>

	<CardComponent>
		<span slot="title">Network Info</span>
		<JsonView json={data.network} />
	</CardComponent>
</div>

<div class="grid grid-cols-2 gap-8">
	<CardComponent>
		<span slot="title">Services List</span>
		{#each data.services as { name, running, mem, cpu, startmode }}
			<ul>
				<li class="flex items-center my-3 py-2 px-2 border rounded">
					<ChipLogo width="2em" height="auto" className="pr-3" />
					<div class="block w-full">
						<span class="block w-full uppercase font-semibold">{truncate(name, 25)}</span>
						<div class="w-full flex justify-between">
							<span class="capitalize">status: {running ? 'running' : 'not running'}</span>
							<span class="capitalize">start mode: {startmode}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">used memory: {mem}%</span>
							<span class="capitalize">used CPU: {cpu}%</span>
						</div>
						<div class="block w-full" />
					</div>
				</li>
			</ul>
		{/each}
	</CardComponent>

	<CardComponent>
		<div class="flex justify-between" slot="title">
			<span class="text-amber-600">Process Info</span>
			<span class="text-amber-600">{data.process.all}</span>
		</div>

		<ul>
			{#each data.process.list as { cpu, mem, user, name, priority, tty, path }}
				<li class="flex items-center my-3 py-2 px-2 border rounded">
					<ChipLogo width="2em" height="auto" className="pr-3" />
					<div class="block w-full">
						<span class="block w-full uppercase font-semibold">{truncate(name, 25)}</span>
						<div class="w-full flex justify-between">
							<span class="capitalize">User: {user}</span>
							<span class="capitalize">start mode: {priority}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">path: {truncate(path, 25)}</span>
							<span class="capitalize">runner: {tty}</span>
						</div>

						<div class="w-full flex justify-between">
							<span class="capitalize">used memory: {Math.round(mem)}%</span>
							<span class="capitalize">used CPU: {Math.round(cpu)}%</span>
						</div>
						<div class="block w-full" />
					</div>
				</li>
			{/each}
		</ul>
	</CardComponent>
</div>
