<script lang="ts">
	export let height: string = 'h-[20rem]';
</script>

<div class="block rounded-lg shadow-lg bg-white divide-y">
	<div class="text-gray-900 text-xl leading-tight font-medium mb-2 py-4 px-4 uppercase">
		<slot name="title" />
	</div>
	<div class="text-gray-700 text-base mb-4 {height} overflow-y-auto">
		<div class="px-4">
			<slot />
		</div>
	</div>
</div>
