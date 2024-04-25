import tailwindRadix from 'tailwindcss-radix';
import tailwindConfig from '@theguild/tailwind-config';

export default {
  ...tailwindConfig,
  // @ts-expect-error -- fixme
  plugins: [tailwindRadix()],
};
