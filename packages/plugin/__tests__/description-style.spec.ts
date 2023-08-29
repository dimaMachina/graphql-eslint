import { rule, RuleOptions } from '../src/rules/description-style';
import { ruleTester } from './test-utils';

const INLINE_SDL = /* GraphQL */ `
  " Test "
  type CreateOneUserPayload {
    "Created document ID"
    recordId: MongoID

    "Created document"
    record: User
  }
`;

export const BLOCK_SDL = /* GraphQL */ `
  enum EnumUserLanguagesSkill {
    """
    basic
    """
    basic
    """
    fluent
    """
    fluent
    """
    native
    """
    native
  }
`;

ruleTester.run<RuleOptions>('description-style', rule, {
  valid: [
    BLOCK_SDL,
    {
      code: INLINE_SDL,
      options: [{ style: 'inline' }],
    },
  ],
  invalid: [
    {
      code: BLOCK_SDL,
      options: [{ style: 'inline' }],
      errors: 3,
    },
    {
      code: INLINE_SDL,
      errors: 3,
    },
  ],
});
