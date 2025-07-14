import { manifest } from './manifest';

export const bootMessages = [
	{ text: 'Initializing LNOX Terminal v1.0.', delay: 500 },
	{ text: 'Memory OK: 640K Base, 64M Extended', delay: 400 },
	{ text: 'Executing manifest app.', delay: 800 },
	{ text: '', delay: 800 },
	...manifest.map((msg) => ({ text: msg, delay: 1000, typed: msg.length > 1 }))
	// { text: '> Type your commands below:', delay: 300 }
	// SOON ^ ^ ^
];

function scroll() {
	const t = document.getElementsByClassName('terminal')[0];
	t.scrollTop = t.scrollHeight;
}

export async function type(text: string, delay = 500, typed = false) {
	const output = document.getElementById('output');
	// const lines = text.split('\n');

	const wrapper = document.createElement('div');
	wrapper.className = 'output-line';

	if (!typed) {
		wrapper.innerHTML = text || `&nbsp;`; // Space charater:
		output.appendChild(wrapper);
	} else {
		output.appendChild(wrapper);
		await typeCharByChar(wrapper, text);
	}
	scroll();

	return;
}

function typeCharByChar(container, text) {
	let speed = 50;
	return new Promise(async (resolve) => {
		let index = 0;
		// Use settimeout for better control over the typing effect and tp use variable speed
		const typeNextChar = () => {
			if (index < text.length) {
				const char = text[index];
				if (char == '~') {
					speed = 1000;
				} else {
					speed = Math.random() * 50 + 5;
					container.innerHTML += char;
				}
				index++;
				setTimeout(typeNextChar, speed);
			} else {
				resolve();
			}
		};
		typeNextChar();
	});
}
