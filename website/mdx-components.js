import { useMDXComponents as getDocsMDXComponents } from '@theguild/components/server';

const docsComponents = getDocsMDXComponents({});

export const useMDXComponents = components => ({
  ...docsComponents,
  ...components,
});
