<script lang="ts">
	import { SmoothieChart, TimeSeries } from 'smoothie';
	import { onDestroy, onMount } from 'svelte';

	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	import { formatToMB } from '$lib/module/ui/bytes';
	import dashboardStore from '$lib/stores/dashboardStore';

	export let chartHeight: string = 'h-auto';
	export let chartWidth: string = 'w-full';
	export let chartOpt: ChartOpt;
	export let chartName: string;

	let canvas: HTMLCanvasElement;

	let clearChartData: any;

	onMount(() => {
		let chart = new SmoothieChart(chartOpt);

		chart.streamTo(canvas, chartOpt.delay);

		let rxBytesSeries = new TimeSeries();
		let txBytesSeries = new TimeSeries();

		clearChartData = dashboardStore.subscribe((value) => {
			rxBytesSeries.append(Date.now(), formatToMB(value.network.netStat[0].rx_bytes));
			txBytesSeries.append(Date.now(), formatToMB(value.network.netStat[0].tx_bytes));
		});

		chart.addTimeSeries(rxBytesSeries, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: '#ff6347',
			fillStyle: 'rgba(255, 99, 71, 0.3)'
		});

		chart.addTimeSeries(txBytesSeries, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: '#6bd9ea',
			fillStyle: 'rgba(107, 217, 234, 0.3)'
		});
	});

	onDestroy(clearChartData);
</script>

<canvas bind:this={canvas} class="{chartName} {chartHeight} {chartWidth} rounded" />
