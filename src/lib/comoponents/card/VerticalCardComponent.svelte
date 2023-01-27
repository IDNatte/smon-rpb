<script lang="ts">
	export let height: string = 'h-6';
</script>

<div class="flex rounded border {height}">
	<slot />
</div>
