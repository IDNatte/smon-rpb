<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="/login" method="post" use:enhance>
	<label for="">username</label>
	<input type="text" name="username" id="username" />

	<input type="submit" value="test" />
</form>
