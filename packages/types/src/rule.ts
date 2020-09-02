import { Rule, AST } from "eslint";
import { GraphQLESTree } from "./estree-ast";
import { ParserServices } from "./parser-types";

export type GraphQLESlintRuleContext = Omit<Rule.RuleContext, "parserServices" | "report"> & {
  report(
    descriptor: Rule.ReportDescriptorMessage &
      Rule.ReportDescriptorOptions & ({ node: GraphQLESTree.ASTNode } | { loc: AST.SourceLocation | { line: number; column: number } })
  ): void;
  parserServices?: ParserServices;
};

export type GraphQLESLintRule = {
  create(context: GraphQLESlintRuleContext): GraphQLESlintRuleListener;
  meta?: Rule.RuleMetaData;
};

export type GraphQLESlintRuleListener = {
  [K in keyof GraphQLESTree.ASTKindToNode]?: (
    node: GraphQLESTree.ASTKindToNode[K]
  ) => void;
};
