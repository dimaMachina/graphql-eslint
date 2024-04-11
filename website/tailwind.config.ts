import tailwindRadix from 'tailwindcss-radix';
import tailwindConfig from '@theguild/tailwind-config';

// eslint-disable-next-line import/no-default-export
export default {
  ...tailwindConfig,
  // @ts-expect-error -- fixme
  plugins: [tailwindRadix()],
};
