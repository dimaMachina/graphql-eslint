import {
  Kind,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumTypeDefinitionNode,
  EnumTypeExtensionNode,
  EnumValueDefinitionNode,
  DirectiveDefinitionNode,
  ArgumentNode,
  VariableDefinitionNode,
  OperationDefinitionNode,
  FieldNode,
  DirectiveNode,
  SelectionSetNode,
  FragmentSpreadNode,
  ASTKindToNode,
} from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRuleListener } from '../testkit';
import { getLocation } from '../utils';

const ALPHABETIZE = 'ALPHABETIZE';

const fieldsEnum = [Kind.OBJECT_TYPE_DEFINITION, Kind.INTERFACE_TYPE_DEFINITION, Kind.INPUT_OBJECT_TYPE_DEFINITION];
const valuesEnum = [Kind.ENUM_TYPE_DEFINITION];
const selectionsEnum = [Kind.OPERATION_DEFINITION, Kind.FRAGMENT_DEFINITION];
const variablesEnum = [Kind.OPERATION_DEFINITION];
const argumentsEnum = [Kind.FIELD_DEFINITION, Kind.FIELD, Kind.DIRECTIVE_DEFINITION, Kind.DIRECTIVE];

type AlphabetizeConfig = [
  {
    fields?: typeof fieldsEnum;
    values?: typeof valuesEnum;
    selections?: typeof selectionsEnum;
    variables?: typeof variablesEnum;
    arguments?: typeof argumentsEnum;
  }
];

const rule: GraphQLESLintRule<AlphabetizeConfig> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/alphabetize.md',
      examples: [
        {
          title: 'Incorrect',
          usage: [{ fields: [Kind.OBJECT_TYPE_DEFINITION] }],
          code: /* GraphQL */ `
            type User {
              password: String
              firstName: String! # should be before "password"
              age: Int # should be before "firstName"
              lastName: String!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ fields: [Kind.OBJECT_TYPE_DEFINITION] }],
          code: /* GraphQL */ `
            type User {
              age: Int
              firstName: String!
              lastName: String!
              password: String
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ values: [Kind.ENUM_TYPE_DEFINITION] }],
          code: /* GraphQL */ `
            enum Role {
              SUPER_ADMIN
              ADMIN # should be before "SUPER_ADMIN"
              USER
              GOD # should be before "USER"
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ values: [Kind.ENUM_TYPE_DEFINITION] }],
          code: /* GraphQL */ `
            enum Role {
              ADMIN
              GOD
              SUPER_ADMIN
              USER
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ selections: [Kind.OPERATION_DEFINITION] }],
          code: /* GraphQL */ `
            query {
              me {
                firstName
                lastName
                email # should be before "lastName"
              }
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ selections: [Kind.OPERATION_DEFINITION] }],
          code: /* GraphQL */ `
            query {
              me {
                email
                firstName
                lastName
              }
            }
          `,
        },
      ],
      optionsForConfig: [
        {
          fields: fieldsEnum,
          values: valuesEnum,
          selections: selectionsEnum,
          variables: variablesEnum,
          arguments: argumentsEnum,
        },
      ],
    },
    messages: {
      [ALPHABETIZE]: '"{{ currName }}" should be before "{{ prevName }}"',
    },
    schema: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        minProperties: 1,
        properties: {
          fields: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              enum: fieldsEnum,
            },
            description: 'Fields of `type`, `interface`, and `input`',
          },
          values: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              enum: valuesEnum,
            },
            description: 'Values of `enum`',
          },
          selections: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              enum: selectionsEnum,
            },
            description: 'Selections of operations (`query`, `mutation` and `subscription`) and `fragment`',
          },
          variables: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              enum: variablesEnum,
            },
            description: 'Variables of operations (`query`, `mutation` and `subscription`)',
          },
          arguments: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              enum: argumentsEnum,
            },
            description: 'Arguments of fields and directives',
          },
        },
      },
    },
  },
  create(context) {
    function checkNodes(
      nodes: GraphQLESTreeNode<
        | FieldDefinitionNode
        | InputValueDefinitionNode
        | EnumValueDefinitionNode
        | FieldNode
        | FragmentSpreadNode
        | ArgumentNode
        | VariableDefinitionNode['variable']
      >[]
    ) {
      let prevName = null;
      for (const node of nodes) {
        const currName = node.name.value;
        if (prevName && prevName > currName) {
          const isVariableNode = node.kind === Kind.VARIABLE;

          context.report({
            loc: getLocation(node.loc, node.name.value, { offsetEnd: isVariableNode ? 0 : 1 }),
            messageId: ALPHABETIZE,
            data: isVariableNode
              ? {
                  currName: `$${currName}`,
                  prevName: `$${prevName}`,
                }
              : { currName, prevName },
          });
        }
        prevName = currName;
      }
    }

    const opts = context.options[0];
    const fields = new Set(opts.fields ?? []);
    const listeners: GraphQLESLintRuleListener = {};

    const kinds = [
      fields.has(Kind.OBJECT_TYPE_DEFINITION) && [Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION],
      fields.has(Kind.INTERFACE_TYPE_DEFINITION) && [Kind.INTERFACE_TYPE_DEFINITION, Kind.INTERFACE_TYPE_EXTENSION],
      fields.has(Kind.INPUT_OBJECT_TYPE_DEFINITION) && [
        Kind.INPUT_OBJECT_TYPE_DEFINITION,
        Kind.INPUT_OBJECT_TYPE_EXTENSION,
      ],
    ]
      .filter(Boolean)
      .flat();

    const fieldsSelector = kinds.join(',');

    const hasEnumValues = opts.values?.[0] === Kind.ENUM_TYPE_DEFINITION;
    const selectionsSelector = opts.selections?.join(',');
    const hasVariables = opts.variables?.[0] === Kind.OPERATION_DEFINITION;
    const argumentsSelector = opts.arguments?.join(',');

    if (fieldsSelector) {
      type KindToNode = ValueOf<Pick<ASTKindToNode, typeof kinds[number]>>;

      listeners[fieldsSelector] = (node: GraphQLESTreeNode<KindToNode>) => {
        checkNodes(node.fields);
      };
    }

    if (hasEnumValues) {
      const enumValuesSelector = [Kind.ENUM_TYPE_DEFINITION, Kind.ENUM_TYPE_EXTENSION].join(',');
      listeners[enumValuesSelector] = (node: GraphQLESTreeNode<EnumTypeDefinitionNode | EnumTypeExtensionNode>) => {
        checkNodes(node.values);
      };
    }

    if (selectionsSelector) {
      listeners[`:matches(${selectionsSelector}) SelectionSet`] = (node: GraphQLESTreeNode<SelectionSetNode>) => {
        checkNodes(
          node.selections
            // inline fragment don't have name, so we skip them
            .filter(selection => selection.kind !== Kind.INLINE_FRAGMENT)
            .map(selection =>
              // sort by alias is field is renamed
              'alias' in selection && selection.alias ? ({ name: selection.alias } as any) : selection
            )
        );
      };
    }

    if (hasVariables) {
      listeners.OperationDefinition = (node: GraphQLESTreeNode<OperationDefinitionNode>) => {
        checkNodes(node.variableDefinitions.map(varDef => varDef.variable));
      };
    }

    if (argumentsSelector) {
      listeners[argumentsSelector] = (
        node: GraphQLESTreeNode<FieldDefinitionNode | FieldNode | DirectiveDefinitionNode | DirectiveNode>
      ) => {
        checkNodes(node.arguments);
      };
    }

    return listeners;
  },
};

export default rule;
