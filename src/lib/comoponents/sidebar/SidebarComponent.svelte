<script lang="ts">
	import MainLogo from '$lib/comoponents/svg/MainLogo.svelte';
	import LogoutLogo from '$lib/comoponents/svg/LogoutLogo.svelte';
	import SettingsLogo from '$lib/comoponents/svg/SettingsLogo.svelte';
</script>

<div class="sidebar h-screen flex flex-col border-r-[1px] justify-between shadow-md">
	<div class="sidebar-header flex items-center flex-col my-6">
		<a href="/dashboard">
			<MainLogo height="2em" width="2em" />
		</a>
	</div>
	<div class="sidebar-content">
		<ul class="sidebar-menu pb-6">
			<li class="py-4">
				<button class="w-full">
					<SettingsLogo height="1.7em" width="1.7em" className="flex justify-center" />
				</button>
			</li>
			<li class="py-4">
				<a class="w-full" href="/logout">
					<LogoutLogo height="1.7em" width="1.7em" className="flex justify-center" />
				</a>
			</li>
		</ul>
	</div>
</div>

<style>
	.sidebar-menu > li {
		display: flex;
	}
</style>
