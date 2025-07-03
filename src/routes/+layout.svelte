<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="vignette"></div>

<main>
	{@render children()}
</main>
