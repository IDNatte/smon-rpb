<script lang="ts">
	import { SmoothieChart, TimeSeries } from 'smoothie';
	import { onMount } from 'svelte';

	import type { ChartDataSeries } from '$lib/module/ui/types/ui.interface';
	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	export let chartHeight: string = 'h-auto';
	export let chartWidth: string = 'w-full';
	export let chartData: ChartDataSeries[];
	export let chartOpt: ChartOpt;
	export let chartName: string;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let chart = new SmoothieChart(chartOpt);
		// let timeData = new TimeSeries();

		chart.streamTo(canvas, chartOpt.delay);

		let timeData1 = new TimeSeries();
		let timeData2 = new TimeSeries();

		console.log(chartData);

		setInterval(() => {
			for (let data in chartData) {
				console.log(chartData[data].data);
				timeData1.append(Date.now(), Math.random());
				timeData2.append(Date.now(), Math.random());
				// timeData2.append(Date.now(), chartData[data].data);
			}
		}, 5000);

		chart.addTimeSeries(timeData1, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: chartOpt.strokeStyle,
			fillStyle: chartOpt.fillStyle
		});

		chart.addTimeSeries(timeData2, {
			lineWidth: chartOpt.lineWidth,
			strokeStyle: chartOpt.strokeStyle,
			fillStyle: chartOpt.fillStyle
		});
	});
</script>

<canvas bind:this={canvas} class="{chartName} {chartHeight} {chartWidth} rounded" />
