import tailwindRadix from 'tailwindcss-radix';
import tailwindConfig from '@theguild/tailwind-config';

export default {
  ...tailwindConfig,
  content: [
    ...tailwindConfig.content,
    './content/**/*.{md,mdx}'
  ],
  // @ts-expect-error -- fixme
  plugins: [tailwindRadix()],
};
