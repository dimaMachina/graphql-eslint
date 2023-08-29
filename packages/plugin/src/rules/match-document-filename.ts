import { basename, extname } from 'node:path';
import { FragmentDefinitionNode, Kind, OperationDefinitionNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import {
  CaseStyle as _CaseStyle,
  convertCase,
  REPORT_ON_FIRST_CHARACTER,
  VIRTUAL_DOCUMENT_REGEX,
} from '../utils.js';

type CaseStyle = _CaseStyle | 'matchDocumentStyle';

const MATCH_EXTENSION = 'MATCH_EXTENSION';
const MATCH_STYLE = 'MATCH_STYLE';

const CASE_STYLES: CaseStyle[] = [
  'camelCase',
  'PascalCase',
  'snake_case',
  'UPPER_CASE',
  'kebab-case',
  'matchDocumentStyle',
];

const schemaOption = {
  oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asObject' }],
} as const;

const schema = {
  definitions: {
    asString: {
      enum: CASE_STYLES,
      description: `One of: ${CASE_STYLES.map(t => `\`${t}\``).join(', ')}`,
    },
    asObject: {
      type: 'object',
      additionalProperties: false,
      minProperties: 1,
      properties: {
        style: { enum: CASE_STYLES },
        suffix: { type: 'string' },
        prefix: { type: 'string' },
      },
    },
  },
  type: 'array',
  minItems: 1,
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      fileExtension: { enum: ['.gql', '.graphql'] },
      query: schemaOption,
      mutation: schemaOption,
      subscription: schemaOption,
      fragment: schemaOption,
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description:
        'This rule allows you to enforce that the file name should match the operation name.',
      url: 'https://the-guild.dev/graphql/eslint/rules/match-document-filename',
      examples: [
        {
          title: 'Correct',
          usage: [{ fileExtension: '.gql' }],
          code: /* GraphQL */ `
            # user.gql
            type User {
              id: ID!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ query: 'snake_case' }],
          code: /* GraphQL */ `
            # user_by_id.gql
            query UserById {
              userById(id: 5) {
                id
                name
                fullName
              }
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ fragment: { style: 'kebab-case', suffix: '.fragment' } }],
          code: /* GraphQL */ `
            # user-fields.fragment.gql
            fragment user_fields on User {
              id
              email
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ mutation: { style: 'PascalCase', suffix: 'Mutation' } }],
          code: /* GraphQL */ `
            # DeleteUserMutation.gql
            mutation DELETE_USER {
              deleteUser(id: 5)
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ fileExtension: '.graphql' }],
          code: /* GraphQL */ `
            # post.gql
            type Post {
              id: ID!
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ query: 'PascalCase' }],
          code: /* GraphQL */ `
            # user-by-id.gql
            query UserById {
              userById(id: 5) {
                id
                name
                fullName
              }
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ fragment: { style: 'kebab-case', prefix: 'mutation.' } }],
          code: /* GraphQL */ `
            # mutation.add-alert.graphql
            mutation addAlert {
              foo
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ fragment: { prefix: 'query.' } }],
          code: /* GraphQL */ `
            # query.me.graphql
            query me {
              foo
            }
          `,
        },
      ],
      configOptions: [
        {
          query: 'kebab-case',
          mutation: 'kebab-case',
          subscription: 'kebab-case',
          fragment: 'kebab-case',
        },
      ],
    },
    messages: {
      [MATCH_EXTENSION]:
        'File extension "{{ fileExtension }}" don\'t match extension "{{ expectedFileExtension }}"',
      [MATCH_STYLE]: 'Unexpected filename "{{ filename }}". Rename it to "{{ expectedFilename }}"',
    },
    schema,
  },
  create(context) {
    const options = context.options[0] || {
      fileExtension: null,
    };
    const filePath = context.filename;
    const isVirtualFile = VIRTUAL_DOCUMENT_REGEX.test(filePath);

    if (process.env.NODE_ENV !== 'test' && isVirtualFile) {
      // Skip validation for code files
      return {};
    }

    const fileExtension = extname(filePath);
    const filename = basename(filePath, fileExtension);

    return {
      Document(documentNode) {
        if (options.fileExtension && options.fileExtension !== fileExtension) {
          context.report({
            loc: REPORT_ON_FIRST_CHARACTER,
            messageId: MATCH_EXTENSION,
            data: {
              fileExtension,
              expectedFileExtension: options.fileExtension,
            },
          });
        }

        const firstOperation = documentNode.definitions.find(
          n => n.kind === Kind.OPERATION_DEFINITION,
        ) as GraphQLESTreeNode<OperationDefinitionNode>;
        const firstFragment = documentNode.definitions.find(
          n => n.kind === Kind.FRAGMENT_DEFINITION,
        ) as GraphQLESTreeNode<FragmentDefinitionNode>;

        const node = firstOperation || firstFragment;

        if (!node) {
          return;
        }
        const docName = node.name?.value;

        if (!docName) {
          return;
        }
        const docType = 'operation' in node ? node.operation : 'fragment';

        let option = options[docType];
        if (!option) {
          // Config not provided
          return;
        }

        if (typeof option === 'string') {
          option = { style: option };
        }
        const expectedExtension = options.fileExtension || fileExtension;
        let expectedFilename = option.prefix || '';

        if (option.style) {
          expectedFilename +=
            option.style === 'matchDocumentStyle' ? docName : convertCase(option.style, docName);
        } else {
          expectedFilename += filename;
        }
        expectedFilename += (option.suffix || '') + expectedExtension;
        const filenameWithExtension = filename + expectedExtension;

        if (expectedFilename !== filenameWithExtension) {
          context.report({
            loc: REPORT_ON_FIRST_CHARACTER,
            messageId: MATCH_STYLE,
            data: {
              expectedFilename,
              filename: filenameWithExtension,
            },
          });
        }
      },
    };
  },
};
