import { Rule, AST, Linter } from "eslint";
import { GraphQLESTreeNode } from "../../plugin/src/estree-parser/estree-ast";
import { ASTNode, ASTKindToNode, GraphQLSchema } from "graphql";
import type { RuleTester } from "eslint";
import { GraphQLParseOptions } from "@graphql-tools/utils";
import { GraphQLProjectConfig } from "graphql-config";

export interface ParserOptions extends Omit<GraphQLParseOptions, "noLocation"> {
  schema?: string | string[];
  skipGraphQLConfig?: boolean;
  filePath?: string;
}

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

export type ParserServices = {
  graphqlConfigProject: GraphQLProjectConfig | null;
  hasTypeInfo: boolean;
  schema: GraphQLSchema | null;
};

export type GraphQLESlintRuleContext<Options = any[]> = Omit<
  Rule.RuleContext,
  "parserServices" | "report" | "options"
> & {
  options: Options[];
  report(
    descriptor: Rule.ReportDescriptorMessage &
      Rule.ReportDescriptorOptions &
      (
        | { node: GraphQLESTreeNode<ASTNode> }
        | { loc: AST.SourceLocation | { line: number; column: number } }
      )
  ): void;
  parserServices?: ParserServices;
};

export type GraphQLESLintRule<
  Options = any[],
  WithTypeInfo extends boolean = false
> = {
  create(
    context: GraphQLESlintRuleContext<Options>
  ): GraphQLESlintRuleListener<WithTypeInfo>;
  meta?: Rule.RuleMetaData;
};

export type GraphQLESlintRuleListener<WithTypeInfo extends boolean> = {
  [K in keyof ASTKindToNode]?: (
    node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>
  ) => void;
} &
  Record<string, any>;

export type GraphQLValidTestCase<Options> = Omit<
  RuleTester.ValidTestCase,
  "options" | "parserOptions"
> & { options?: [Options]; parserOptions?: ParserOptions };

export type GraphQLInvalidTestCase<T> = GraphQLValidTestCase<T> & {
  errors: number | Array<RuleTester.TestCaseError | string>;
  output?: string | null;
};

export class GraphQLRuleTester extends require("eslint").RuleTester {
  constructor(parserOptions: ParserOptions = {}) {
    super({
      parser: require.resolve("@graphql-eslint/parser"),
      parserOptions: {
        ...(parserOptions || {}),
        skipGraphQLConfig: true,
      },
    });
  }

  runGraphQLTests<Config>(
    name: string,
    rule: GraphQLESLintRule<Config>,
    tests: {
      valid?: Array<string | GraphQLValidTestCase<Config>>;
      invalid?: Array<string | GraphQLInvalidTestCase<Config>>;
    }
  ): void {
    super.run(name, rule as any, tests);
  }
}
