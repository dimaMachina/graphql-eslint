/* eslint sort-keys: error */
import { Callout } from '@theguild/components';

export default {
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  components: {
    OfficialExampleCallout({ gitFolder }: { gitFolder: string }) {
      return (
        <Callout type="info">
          <strong>Note</strong>: Check out{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/tree/master/examples/${gitFolder}`}
          >
            the official examples
          </Anchor>{' '}
          for{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/eslint.config.js`}
          >
            ESLint Flat Config
          </Anchor>{' '}
          or{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/.eslintrc.cjs`}
          >
            ESLint Legacy Config
          </Anchor>
          .
        </Callout>
      );
    },
    WIP() {
      return (
        <Callout type="warning" emoji="🚧">
          This page is under construction. Help us improve the content by submitting a PR.
        </Callout>
      );
    },
  },
};
