import { basename, extname } from 'path';
import { existsSync } from 'fs';
import { FragmentDefinitionNode, Kind, OperationDefinitionNode } from 'graphql';
import { CaseStyle, convertCase } from '../utils';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const MATCH_EXTENSION = 'MATCH_EXTENSION';
const MATCH_STYLE = 'MATCH_STYLE';

const ACCEPTED_EXTENSIONS: ['.gql', '.graphql'] = ['.gql', '.graphql'];
const CASE_STYLES: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE', 'kebab-case'] = [
  CaseStyle.camelCase,
  CaseStyle.pascalCase,
  CaseStyle.snakeCase,
  CaseStyle.upperCase,
  CaseStyle.kebabCase,
];

type PropertySchema = {
  style: CaseStyle;
  suffix: string;
};

type MatchDocumentFilenameRuleConfig = [
  {
    fileExtension?: typeof ACCEPTED_EXTENSIONS[number];
    query?: CaseStyle | PropertySchema;
    mutation?: CaseStyle | PropertySchema;
    subscription?: CaseStyle | PropertySchema;
    fragment?: CaseStyle | PropertySchema;
  }
];

const schemaOption = {
  oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asObject' }],
};

const rule: GraphQLESLintRule<MatchDocumentFilenameRuleConfig> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: 'This rule allows you to enforce that the file name should match the operation name.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/match-document-filename.md`,
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
          usage: [{ query: CaseStyle.snakeCase }],
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
          usage: [{ fragment: { style: CaseStyle.kebabCase, suffix: '.fragment' } }],
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
          usage: [{ mutation: { style: CaseStyle.pascalCase, suffix: 'Mutation' } }],
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
          usage: [{ query: CaseStyle.pascalCase }],
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
      ],
    },
    messages: {
      [MATCH_EXTENSION]: `File extension "{{ fileExtension }}" don't match extension "{{ expectedFileExtension }}"`,
      [MATCH_STYLE]: `Unexpected filename "{{ filename }}". Rename it to "{{ expectedFilename }}"`,
    },
    schema: {
      definitions: {
        asString: {
          type: 'string',
          description: `One of: ${CASE_STYLES.map(t => `\`${t}\``).join(', ')}`,
          enum: CASE_STYLES,
        },
        asObject: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: CASE_STYLES,
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fileExtension: {
            type: 'string',
            enum: ACCEPTED_EXTENSIONS,
          },
          query: schemaOption,
          mutation: schemaOption,
          subscription: schemaOption,
          fragment: schemaOption,
        },
      },
    },
  },
  create(context) {
    const options: MatchDocumentFilenameRuleConfig[number] = context.options[0] || {
      fileExtension: null,
    };
    const filePath = context.getFilename();
    const isVirtualFile = !existsSync(filePath);

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
            node: documentNode,
            messageId: MATCH_EXTENSION,
            data: {
              fileExtension,
              expectedFileExtension: options.fileExtension,
            },
          });
        }

        const firstOperation = documentNode.definitions.find(
          n => n.kind === Kind.OPERATION_DEFINITION
        ) as GraphQLESTreeNode<OperationDefinitionNode>;
        const firstFragment = documentNode.definitions.find(
          n => n.kind === Kind.FRAGMENT_DEFINITION
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
          option = { style: option } as PropertySchema;
        }
        const expectedExtension = options.fileExtension || fileExtension;
        const expectedFilename = convertCase(option.style, docName) + (option.suffix || '') + expectedExtension;
        const filenameWithExtension = filename + expectedExtension;

        if (expectedFilename !== filenameWithExtension) {
          context.report({
            node: documentNode,
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

export default rule;
