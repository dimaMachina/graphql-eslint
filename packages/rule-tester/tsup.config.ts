import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'eslint-rule-tester',
  entry: ['src/*.ts'],
  clean: true,
  format: 'esm',
  dts: true,
});
