<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { SmoothieChart } from 'smoothie';

	import type { PageData, PageServerData } from './$types';
	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	import dashboardStore from '$lib/stores/dashboardStore';
	import { formatBytes } from '$lib/module/ui/bytes';
	import { truncate } from '$lib/module/ui/truncate';

	import VerticalCardComponent from '$lib/comoponents/card/VerticalCardComponent.svelte';
	import CardComponent from '$lib/comoponents/card/CardComponent.svelte';

	import ChipSolidLogo from '$lib/comoponents/svg/ChipSolidLogo.svelte';
	import MemoryLogo from '$lib/comoponents/svg/MemoryLogo.svelte';
	import ScreenLogo from '$lib/comoponents/svg/ScreenLogo.svelte';
	import SignalLogo from '$lib/comoponents/svg/SignalLogo.svelte';
	import ChipLogo from '$lib/comoponents/svg/ChipLogo.svelte';
	import UserLogo from '$lib/comoponents/svg/UserLogo.svelte';
	import DiskLogo from '$lib/comoponents/svg/DiskLogo.svelte';
	import ChartNetworkBytesComponent from '$lib/comoponents/chart/network/ChartNetworkBytesComponent.svelte';
	import ChartNetworkRatesComponent from '$lib/comoponents/chart/network/ChartNetworkRatesComponent.svelte';

	export let data: PageData;

	let interval: any;

	let chartOpt: ChartOpt = {
		delay: 7000,
		tooltip: true,
		timestampFormatter: SmoothieChart.timeFormatter,
		minValue: 0,
		tooltipLine: {
			lineWidth: 2,
			strokeStyle: '#fff'
		},
		lineWidth: 2,
		responsive: true,
		grid: {
			millisPerLine: 5000
		}
	};

	async function getData() {
		const servInfoCall = await fetch('/api/system/services');
		const netInfoCall = await fetch('/api/system/network');
		const diskInfoCall = await fetch('/api/system/disk');
		const cpuInfoCall = await fetch('/api/system/cpu');
		const procInfoCall = await fetch('/api/system/process');
		const memInfoCall = await fetch('/api/system/memory');

		const services = await servInfoCall.json();
		const network = await netInfoCall.json();
		const disk = await diskInfoCall.json();
		const cpu = await cpuInfoCall.json();
		const process = await procInfoCall.json();
		const memory = await memInfoCall.json();

		dashboardStore.set({
			network,
			services,
			disk,
			cpu,
			process,
			memory
		});
	}

	onMount(async () => {
		interval = setInterval(() => {
			getData();
		}, 5000);
	});

	onDestroy(() => clearInterval(interval));
</script>

<div class="grid grid-cols-1 gap-8 pb-20">
	<CardComponent height="h-auto">
		<span slot="title">os info</span>
		<div class="grid grid-cols-3 gap-5 py-5">
			<VerticalCardComponent height="h-auto">
				<ScreenLogo width="2rem" height="auto" className="px-4 py-5 flex items-center border-r" />
				<div class="flex flex-col p-6">
					<span class="block w-full font-bold">{data.sys.os.platform} {data.sys.os.arch}</span>
					<span class="block w-full">{data.sys.os.hostname}</span>
					<span class="block w-full">{data.sys.os.distro}</span>
				</div>
			</VerticalCardComponent>

			<VerticalCardComponent height="h-auto">
				<ChipSolidLogo
					width="2rem"
					height="auto"
					className="px-4 py-5 flex items-center border-r"
				/>
				<div class="flex flex-col p-6">
					{#if $dashboardStore.cpu}
						<span class="block w-full font-bold">
							{Math.floor($dashboardStore.cpu.cpuLoad.currentLoad).toFixed(2)}%, Temp. (&#176;C) {$dashboardStore
								.cpu.cpuTemp.main}
						</span>
						<span class="block w-full">Avg. Load {$dashboardStore.cpu.cpuLoad.avgLoad}</span>
						<span class="block w-full">
							Iddle Load {Math.floor($dashboardStore.cpu.cpuLoad.currentLoadIdle)}%
						</span>
					{/if}
				</div>
			</VerticalCardComponent>

			<VerticalCardComponent height="h-auto">
				<MemoryLogo width="2rem" height="auto" className="px-4 py-5 flex items-center border-r" />
				<div class="flex flex-col p-6">
					{#if $dashboardStore.memory}
						<span class="block w-full font-bold"
							>{formatBytes($dashboardStore.memory.used)} of {formatBytes(
								$dashboardStore.memory.total
							)}
						</span>
						<span class="block w-full"
							>{formatBytes($dashboardStore.memory.available)} of {formatBytes(
								$dashboardStore.memory.total
							)}</span
						>
						<span class="block w-full">Total {formatBytes($dashboardStore.memory.total)}</span>
					{/if}
				</div>
			</VerticalCardComponent>
		</div>

		<div class="grid grid-cols-1 gap-5 py-5">
			<CardComponent height="h-[12em]">
				<span slot="title">user list Info</span>
				<ul>
					{#each data.sys.userDetails as { user }}
						<li class="flex items-center my-3 py-2 px-2 border rounded">
							<UserLogo width="2em" height="auto" className="pr-3" />
							<div class="block w-full">
								<span class="block w-full">{truncate(user, 25)}</span>
							</div>
						</li>
					{/each}
				</ul>
			</CardComponent>
		</div>
	</CardComponent>
</div>

<div class="grid grid-cols-1 gap-8 pb-20">
	<CardComponent height="h-auto">
		<span slot="title">Networking</span>
		{#if $dashboardStore.network}
			<div class="grid grid-cols-2 gap-8">
				<CardComponent height="h-auto">
					<span slot="title">Network Stats Tx/Rx Bytes</span>
					<div class="py-5">
						<ChartNetworkBytesComponent
							chartName="Network Tx/Rx Bytes"
							chartHeight="h-20"
							{chartOpt}
						/>
					</div>
				</CardComponent>

				<CardComponent height="h-auto">
					<span slot="title">Network Stats Tx/Rx Rates</span>
					<div class="py-5">
						<ChartNetworkRatesComponent
							chartName="Network Tx/Rx Rates"
							chartHeight="h-20"
							{chartOpt}
						/>
					</div>
				</CardComponent>
			</div>

			<div class="grid grid-cols-2 gap-8 py-5">
				<CardComponent>
					<span slot="title">Network Stats</span>
					<ul>
						{#each $dashboardStore.network.netStat as { iface, rx_bytes, tx_bytes, rx_sec, tx_sec }}
							<li class="flex items-center my-3 py-2 px-2 border rounded">
								<SignalLogo width="2em" height="auto" className="pr-3" />
								<div class="block w-full">
									<span class="block w-full uppercase font-semibold">{truncate(iface, 25)}</span>
									<div class="w-full flex justify-between">
										<span class="capitalize">received</span>
										<span class="capitalize">{formatBytes(rx_bytes)}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">transfered</span>
										<span class="capitalize">{formatBytes(tx_bytes)}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">received rates / second</span>
										<span class="capitalize">{formatBytes(rx_sec)}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">transfer rates / second</span>
										<span class="capitalize">{formatBytes(tx_sec)}</span>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</CardComponent>

				<CardComponent>
					<span slot="title">Network Interface</span>
					<ul>
						{#each $dashboardStore.network.netIface as { iface, ifaceName, ip4, ip6, mac, type, operstate }}
							<li class="flex items-center my-3 py-2 px-2 border rounded">
								<SignalLogo width="2em" height="auto" className="pr-3" />
								<div class="block w-full">
									<span class="block w-full uppercase font-semibold">{truncate(iface, 25)}</span>

									<div class="w-full flex justify-between">
										<span class="capitalize">Full name</span>
										<span class="capitalize">{ifaceName}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">MAC Address</span>
										<span class="capitalize">{mac}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">IPv4 address</span>
										<span class="capitalize">{ip4}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">IPv6 address</span>
										<span class="capitalize">{ip6}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">connection type</span>
										<span class="capitalize">{type}</span>
									</div>

									<div class="w-full flex justify-between">
										<span class="capitalize">State</span>
										<span class="capitalize">{operstate}</span>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</CardComponent>
			</div>
		{/if}
	</CardComponent>
</div>

<div class="grid grid-cols-3 gap-8">
	<CardComponent>
		<span slot="title">Services List</span>
		{#if $dashboardStore.services}
			{#each $dashboardStore.services as { name, running, mem, cpu, startmode }}
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
		{/if}
	</CardComponent>

	<CardComponent>
		<span slot="title">Disk Info</span>
		<ul>
			{#if $dashboardStore.disk}
				{#each $dashboardStore.disk as { fs, type, size, available, used, use, mount }}
					<li class="flex items-center my-3 py-2 px-2 border rounded">
						<DiskLogo width="2em" height="auto" className="pr-3" />
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
								<span class="capitalize">used (%) </span>
								<span class="capitalize">{use}%</span>
							</div>

							<div class="w-full flex justify-between">
								<span class="capitalize">used</span>
								<span class="capitalize">
									{formatBytes(used)}
								</span>
							</div>

							<div class="w-full flex justify-between">
								<span class="capitalize">free</span>
								<span class="capitalize">{formatBytes(available)}</span>
							</div>

							<div class="w-full flex justify-between">
								<span class="capitalize">size</span>
								<span class="capitalize">{formatBytes(size)}</span>
							</div>
						</div>
					</li>
				{/each}
			{/if}
		</ul>
	</CardComponent>

	<CardComponent>
		<div class="flex justify-between" slot="title">
			<span>Process Info</span>
			<span
				>{#if $dashboardStore.process}{$dashboardStore.process.all}{/if}</span
			>
		</div>

		<ul>
			{#if $dashboardStore.process}
				{#each $dashboardStore.process.list as { cpu, mem, user, name, pid, parentPid, path }}
					<li class="flex items-center my-3 py-2 px-2 border rounded">
						<ChipLogo width="2em" height="auto" className="pr-3" />
						<div class="block w-full">
							<span class="block w-full uppercase font-semibold">{truncate(name, 25)}</span>
							<div class="w-full flex justify-between">
								<span class="capitalize">parent pid: {parentPid}</span>
								<span class="capitalize">pid: {pid}</span>
							</div>

							<div class="w-full flex justify-between">
								<span class="capitalize">path: {truncate(path, 25)}</span>
								<span class="capitalize">User: {user}</span>
							</div>

							<div class="w-full flex justify-between">
								<span class="capitalize">used memory: {Math.floor(mem)}%</span>
								<span class="capitalize">used CPU: {Math.floor(cpu)}%</span>
							</div>
							<div class="block w-full" />
						</div>
					</li>
				{/each}
			{/if}
		</ul>
	</CardComponent>
</div>
