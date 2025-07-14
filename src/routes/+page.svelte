<script lang="ts">
	import logo from '$lib/assets/images/lnox.svg';
	import { bootMessages, type } from '$lib/terminal';
	import { onMount } from 'svelte';

	let input: HTMLInputElement;
	// add seen check, and go faster.

	async function bootSequence() {
		for (const message of bootMessages) {
			await type(message.text, message.delay, message.typed === true);
			await new Promise((resolve) => setTimeout(resolve, message.delay));
		}
		// Show input line after boot sequence
		// input.style.display = 'flex';
		input.focus();
	}

	onMount(() => {
		bootSequence();
	});
</script>

<div class="terminal-container">
	<div class="terminal">
		<img src={logo} alt="LNOX Logo" class="logo" width="200" />
		<div id="output"></div>
		<div id="il" class="input-line">
			<span class="prompt">></span>
			<input type="text" bind:this={input} id="terminal-input" autofocus />
		</div>
	</div>
</div>

<!-- <div>
	<img src={logo} alt="LNOX Logo" class="logo" width="365" />
</div> -->
