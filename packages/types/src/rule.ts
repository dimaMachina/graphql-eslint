import { Rule, AST } from "eslint";
import { ParserServices } from "./parser-types";
import { GraphQLESTreeNode } from "./estree-ast";
import { ASTNode, ASTKindToNode } from "graphql";

export type GraphQLESlintRuleContext<Options = any[]> = Omit<Rule.RuleContext, "parserServices" | "report" | "options"> & {
  options: Options[];
  report(
    descriptor: Rule.ReportDescriptorMessage &
      Rule.ReportDescriptorOptions & ({ node: GraphQLESTreeNode<ASTNode> } | { loc: AST.SourceLocation | { line: number; column: number } })
  ): void;
  parserServices?: ParserServices;
};

export type GraphQLESLintRule<Options = any[]> = {
  create(context: GraphQLESlintRuleContext<Options>): GraphQLESlintRuleListener;
  meta?: Rule.RuleMetaData;
};

export type GraphQLESlintRuleListener = {
  [K in keyof ASTKindToNode]?: (
    node: GraphQLESTreeNode<ASTKindToNode[K]>
  ) => void;
};
