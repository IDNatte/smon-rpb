<script lang="ts">
	import { SmoothieChart, TimeSeries } from 'smoothie';
	import { onDestroy, onMount } from 'svelte';

	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	import { formatToKB } from '$lib/module/ui/bytes';
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

		let rxRateSeries = new TimeSeries();
		let txRateSeries = new TimeSeries();

		clearChartData = dashboardStore.subscribe((value) => {
			rxRateSeries.append(Date.now(), formatToKB(value.network.netStat[0].rx_sec));
			txRateSeries.append(Date.now(), formatToKB(value.network.netStat[0].tx_sec));
		});

		chart.addTimeSeries(rxRateSeries, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: '#eaa06b',
			fillStyle: 'rgba(234, 160, 107, 0.3)'
		});

		chart.addTimeSeries(txRateSeries, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: '#6bd9ea',
			fillStyle: 'rgba(107, 217, 234, 0.3)'
		});
	});

	onDestroy(clearChartData);
</script>

<canvas bind:this={canvas} class="{chartName} {chartHeight} {chartWidth} rounded" />
