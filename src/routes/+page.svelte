<script lang="ts">
	import logo from '$lib/assets/images/lnox.svg';
	import { bootMessages, bootSound, type } from '$lib/terminal';
	import { onMount } from 'svelte';

	let input: HTMLInputElement;
	// add seen check, and go faster.

	async function bootSequence() {
		setTimeout(bootSound, 1000);

		for (const message of bootMessages) {
			await type(message.text, message.delay, message.typed === true);
			await new Promise((resolve) => setTimeout(resolve, message.delay));
		}
	}

	onMount(() => {
		bootSequence();
	});
</script>

<div class="terminal-container" on:click|once={bootSound}>
	<div class="terminal">
		<img src={logo} alt="LNOX Logo" class="logo" width="200" />
		<div id="output"></div>
		<div id="il" class="input-line">
			<span class="prompt">&#x3E;</span>
			<input type="text" bind:this={input} id="terminal-input" autofocus />
		</div>
	</div>
	<audio id="terminal-sound" src="/sounds/boot2.mp3" preload="auto" autoplay muted></audio>
</div>

<!-- <div>
	<img src={logo} alt="LNOX Logo" class="logo" width="365" />
</div> -->
