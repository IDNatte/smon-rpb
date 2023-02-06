<script lang="ts">
	import ChartComponent from '$lib/comoponents/chart/ChartComponent.svelte';

	import type { ChartOpt } from '$lib/module/ui/types/ui.types';

	let chartOpt: ChartOpt = {
		delay: 5000,
		tooltip: true,
		minValue: 0,
		tooltipLine: {
			lineWidth: 2,
			strokeStyle: '#fff'
		},
		strokeStyle: '#c799dd',
		fillStyle: `rgba(${196}, ${123}, ${208}, ${0.79})`,
		lineWidth: 2
	};
</script>

<div>
	<ChartComponent chartName="testing" {chartOpt} />
</div>

<style>
	:global(div.smoothie-chart-tooltip) {
		background: #444;
		padding: 1em;
		margin-top: 20px;
		font-family: consolas;
		color: white;
		font-size: 10px;
		pointer-events: none;
	}
</style>
