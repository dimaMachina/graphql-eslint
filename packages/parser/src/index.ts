import { ParseOptions as GraphQLParseOptions } from "graphql";
import { Linter } from "eslint";
import { parseForESLint } from "./parser";

export { parseForESLint };

export function parse(
  code: string,
  options?: GraphQLParseOptions
): Linter.ESLintParseResult["ast"] {
  return parseForESLint(code, options).ast;
}
