import { Rule, AST } from "eslint";
import { ParserServices } from "./parser-types";
import { GraphQLESTreeNode } from "./estree-ast";
import { ASTNode, ASTKindToNode } from "graphql";

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

export type GraphQLESLintRule<Options = any[], WithTypeInfo extends boolean = false> = {
  create(context: GraphQLESlintRuleContext<Options>): GraphQLESlintRuleListener<WithTypeInfo>;
  meta?: Rule.RuleMetaData;
};

export type GraphQLESlintRuleListener<WithTypeInfo extends boolean> = {
  [K in keyof ASTKindToNode]?: (
    node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>
  ) => void;
};

// export type GraphQLValidTestCase<T> = Omit<RuleTester.ValidTestCase, "options"> & { options: T };

// export type GraphQLInvalidTestCase<T> = GraphQLValidTestCase<T> & {
//   errors: number | Array<RuleTester.TestCaseError | string>;
//   output?: string | null;
// }

// export class GraphQLRuleTester extends RuleTester {
//   runGraphQLTests<Config>(
//     name: string,
//     rule: GraphQLESLintRule<Config>,
//     tests: {
//         valid?: Array<string | RuleTester.ValidTestCase | GraphQLValidTestCase<Config>>;
//         invalid?: (RuleTester.InvalidTestCase | GraphQLInvalidTestCase<Config>)[];
//     },
//   ): void {
//     super.run(name, rule as any, tests);
//   }
// }
