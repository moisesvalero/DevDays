import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.{js,ts}'],
		passWithNoTests: true
	},
	resolve: {
		conditions: ['browser']
	}
});
