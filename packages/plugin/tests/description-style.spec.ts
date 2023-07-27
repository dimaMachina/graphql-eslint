import { RuleTester } from '../src/testkit';
import { rule, RuleOptions } from '../src/rules/description-style';

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

const ruleTester = new RuleTester();

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
