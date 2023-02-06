<script lang="ts">
	import { SmoothieChart, TimeSeries } from 'smoothie';
	import { onMount } from 'svelte';

	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	export let chartName: string;
	export let chartOpt: ChartOpt;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let chart = new SmoothieChart(chartOpt);
		let timeData = new TimeSeries();

		chart.streamTo(canvas, chartOpt.delay);

		setInterval(() => {
			timeData.append(Date.now(), Math.random());
		}, 5000);

		chart.addTimeSeries(timeData, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: chartOpt.strokeStyle,
			fillStyle: chartOpt.fillStyle
		});
	});
</script>

<canvas bind:this={canvas} class={chartName} width="400" height="100" />
