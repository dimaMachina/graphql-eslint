import { Rule, AST, Linter } from 'eslint';
import { GraphQLESTreeNode } from './estree-parser';
import { ASTNode, GraphQLSchema } from 'graphql';
import { GraphQLParseOptions } from '@graphql-tools/utils';
import { GraphQLESlintRuleListener } from './testkit';

export interface ParserOptions {
  schema?: string | string[];
  siblingOperations?: string | string[];
  schemaOptions?: Omit<GraphQLParseOptions, 'assumeValidSDL'>;
  graphQLParserOptions?: Omit<GraphQLParseOptions, 'noLocation'>;
  skipGraphQLConfig?: boolean;
  filePath?: string;
}

export type ParserServices = {
  hasTypeInfo: boolean;
  schema: GraphQLSchema | null;
};

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

export type GraphQLESlintRuleContext<Options = any[]> = Omit<
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

export type GraphQLESLintRule<Options = any[], WithTypeInfo extends boolean = false> = {
  create(context: GraphQLESlintRuleContext<Options>): GraphQLESlintRuleListener<WithTypeInfo>;
  meta?: Rule.RuleMetaData;
};
