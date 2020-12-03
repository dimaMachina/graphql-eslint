import { Source, Lexer, GraphQLSchema } from 'graphql';
import { GraphQLESlintRuleContext } from './types';
import { AST } from 'eslint';
import { SiblingOperations } from './sibling-operations';

export function requireSiblingsOperations(ruleName: string, context: GraphQLESlintRuleContext<any>): SiblingOperations {
  if (!context || !context.parserServices) {
    throw new Error(
      `You have used a rule ("${ruleName}") which requires parserServices to be generated with operations. You must therefore provide a value for the "parserOptions.operations" property for "@typescript-graphql/parser", or use graphql-config!`
    );
  }

  if (!context.parserServices.siblingOperations.available) {
    throw new Error(
      `You have used a rule which requires GraphQL operations to be loaded. Found "parserServices" generated, but unable to load your GraphQL operations.`
    );
  }

  return context.parserServices.siblingOperations;
}

export function requireGraphQLSchemaFromContext(
  ruleName: string,
  context: GraphQLESlintRuleContext<any>
): GraphQLSchema {
  if (!context || !context.parserServices) {
    throw new Error(
      `You have used a rule ("${ruleName}") which requires parserServices to be generated with GraphQL schema. You must therefore provide a value for the "parserOptions.schema" property for "@typescript-graphql/parser", or use graphql-config!`
    );
  }

  if (!context.parserServices.hasTypeInfo) {
    throw new Error(
      `You have used a rule which requires GraphQL Schema to be loaded. Found "parserServices" generated, but unable to load your GraphQL schema and it's type-info!`
    );
  }

  return context.parserServices.schema;
}

function getLexer(source: Source): Lexer {
  // GraphQL v14
  const gqlLanguage = require('graphql/language');
  if (gqlLanguage && gqlLanguage.createLexer) {
    return gqlLanguage.createLexer(source, {});
  }

  // GraphQL v15
  const { Lexer: LexerCls } = require('graphql');
  if (LexerCls && typeof LexerCls === 'function') {
    return new LexerCls(source);
  }

  throw new Error(`Unsupported GraphQL version! Please make sure to use GraphQL v14 or newer!`);
}

export function extractTokens(source: string): AST.Token[] {
  const lexer = getLexer(new Source(source));
  const tokens: AST.Token[] = [];
  let token = lexer.advance();

  while (token && token.kind !== '<EOF>') {
    tokens.push({
      type: token.kind as any,
      loc: {
        start: {
          line: token.line,
          column: token.column,
        },
        end: {
          line: token.line,
          column: token.column,
        },
      },
      value: token.value,
      range: [token.start, token.end],
    });
    token = lexer.advance();
  }

  return tokens;
}
