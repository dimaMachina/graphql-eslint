import { Rule, AST, Linter } from 'eslint';
import { GraphQLESTreeNode } from './estree-parser';
import { ASTNode, GraphQLSchema } from 'graphql';
import { GraphQLParseOptions } from '@graphql-tools/utils';
import { GraphQLESLintRuleListener } from './testkit';
import { SiblingOperations } from './sibling-operations';
import { FieldsCache } from './graphql-ast';

export interface ParserOptions {
  schema?: string | string[];
  operations?: string | string[];
  schemaOptions?: Omit<GraphQLParseOptions, 'assumeValidSDL'>;
  graphQLParserOptions?: Omit<GraphQLParseOptions, 'noLocation'>;
  skipGraphQLConfig?: boolean;
  filePath?: string;
}

export type ParserServices = {
  siblingOperations: SiblingOperations;
  hasTypeInfo: boolean;
  schema: GraphQLSchema | null;
  getReachableTypes: () => Set<string> | null;
  getUsedFields: () => FieldsCache | null;
};

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

export type GraphQLESLintRuleContext<Options = any[]> = Omit<
  Rule.RuleContext,
  'parserServices' | 'report' | 'options'
> & {
  options: Options;
  report(
    descriptor: Rule.ReportDescriptorMessage &
      Rule.ReportDescriptorOptions &
      ({ node: GraphQLESTreeNode<ASTNode> } | { loc: AST.SourceLocation | { line: number; column: number } })
  ): void;
  parserServices?: ParserServices;
};

export type RuleDocsInfo<T> = Rule.RuleMetaData & {
  docs: {
    category: 'Best Practices' | 'Stylistic Issues' | 'Validation';
    requiresSchema?: boolean;
    requiresSiblings?: boolean;
    examples?: {
      title: string;
      code: string;
      usage?: T;
    }[];
  };
};

export type GraphQLESLintRule<Options = any[], WithTypeInfo extends boolean = false> = {
  create(context: GraphQLESLintRuleContext<Options>): GraphQLESLintRuleListener<WithTypeInfo>;
  meta?: Rule.RuleMetaData & RuleDocsInfo<Options>;
};
