import { Rule, AST } from "eslint";
import { ParserServices } from "./parser-types";
import { GraphQLESTreeNode } from "./estree-ast";
import { ASTNode, ASTKindToNode } from "graphql";

export type GraphQLESlintRuleContext = Omit<Rule.RuleContext, "parserServices" | "report"> & {
  report(
    descriptor: Rule.ReportDescriptorMessage &
      Rule.ReportDescriptorOptions & ({ node: GraphQLESTreeNode<ASTNode> } | { loc: AST.SourceLocation | { line: number; column: number } })
  ): void;
  parserServices?: ParserServices;
};

export type GraphQLESLintRule = {
  create(context: GraphQLESlintRuleContext): GraphQLESlintRuleListener;
  meta?: Rule.RuleMetaData;
};

export type GraphQLESlintRuleListener = {
  [K in keyof ASTKindToNode]?: (
    node: GraphQLESTreeNode<ASTKindToNode[K]>
  ) => void;
};
