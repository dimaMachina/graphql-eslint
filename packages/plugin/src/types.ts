import {
  // AST,
  Linter, Rule } from 'eslint';
// import * as ESTree from 'estree';
import { ASTKindToNode, GraphQLSchema } from 'graphql';
import { IGraphQLConfig } from 'graphql-config';
import { GraphQLESTreeNode } from './estree-converter/index.js';
import { SiblingOperations } from './siblings.js';

export type Schema = GraphQLSchema | null;
export type Pointer = string | string[];
export type { GraphQLESTreeNode } from './estree-converter/types.js';

export interface ParserOptions {
  graphQLConfig?: IGraphQLConfig;
  filePath: string;
}

export type ParserServices = {
  schema: Schema;
  siblingOperations: SiblingOperations;
};

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

// type Location = AST.SourceLocation | ESTree.Position;

type ReportDescriptorLocation = any; // { loc: Location } | { node: { loc: Location } };
export type ReportDescriptor = ReportDescriptorLocation &
  Rule.ReportDescriptorMessage &
  Rule.ReportDescriptorOptions;

export type GraphQLESLintRuleContext<Options = any[]> = Omit<
  Rule.RuleContext,
  'options' | 'report'
> & {
  options: Options;
  report(descriptor: ReportDescriptor): void;
};

export type CategoryType = 'schema' | 'operations' | 'schema-and-operations';

type RuleMetaDataDocs = Required<Rule.RuleMetaData>['docs'];

export type RuleDocsInfo<T> = Omit<RuleMetaDataDocs, 'category' | 'suggestion'> & {
  category?: string;
  requiresSchema?: true;
  requiresSiblings?: true;
  examples?: {
    title: string;
    code: string;
    usage?: T;
  }[];
  configOptions?: T | { schema?: T; operations?: T };
  graphQLJSRuleName?: string;
  isDisabledForAllConfig?: true;
  whenNotToUseIt?: string;
};

export type GraphQLESLintRuleListener<WithTypeInfo extends boolean = false> = Record<
  string,
  any
> & {
  [K in keyof ASTKindToNode]?: (node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>) => void;
};

export type GraphQLESLintRule<Options = [], WithTypeInfo extends boolean = false> = {
  meta?: Omit<Rule.RuleMetaData, 'docs'> & {
    docs?: RuleDocsInfo<Options>;
  };
  create(context: GraphQLESLintRuleContext<Options>): GraphQLESLintRuleListener<WithTypeInfo>;
};

export type ValueOf<T> = T[keyof T];

type Id<T> = { [P in keyof T]: T[P] } & {};

type OmitDistributive<T, K extends PropertyKey> = T extends object ? Id<OmitRecursively<T, K>> : T;
export type OmitRecursively<T extends object, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;

export type ConfigName =
  | 'operations-all'
  | 'operations-recommended'
  | 'schema-all'
  | 'schema-recommended'
  | 'schema-relay';
