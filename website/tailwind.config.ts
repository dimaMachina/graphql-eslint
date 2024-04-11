import tailwindConfig from '@theguild/tailwind-config';
import tailwindRadix from 'tailwindcss-radix'

// eslint-disable-next-line import/no-default-export
export default {
  ...tailwindConfig,
  // @ts-expect-error -- fixme
  plugins: [tailwindRadix()],
};
