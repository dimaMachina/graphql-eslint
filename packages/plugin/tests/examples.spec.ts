import { spawnSync } from 'child_process';
import { relative, join } from 'path';
import type { ESLint } from 'eslint';

const ROOT_CWD = process.cwd()

function countErrors(results: ESLint.LintResult[]): number {
  return results.reduce<number>((acc, curr: { fatalErrorCount: number } & ESLint.LintResult) => {
    if (curr.fatalErrorCount > 0) {
      throw new Error('Found fatal error');
    }
    return acc + curr.errorCount;
  }, 0);
}

function getESLintOutput(cwd: string): ESLint.LintResult[] {
  const { stdout, stderr } = spawnSync('eslint', ['.', '--format', 'json'], { cwd });
  const errorOutput = stderr.toString();
  if (errorOutput) {
    throw new Error(errorOutput);
  }
  const output = stdout.toString();
  const start = output.indexOf('[{');
  const end = output.lastIndexOf('}]') + 2;
  return JSON.parse(output.slice(start, end));
}

function testSnapshot(results: ESLint.LintResult[]): void {
  const normalizedResults = results
    .map(result => ({
      filePath: relative(ROOT_CWD, result.filePath),
      messages: result.messages,
    }))
    .filter(result => result.messages.length > 0);

  expect(normalizedResults).toMatchSnapshot();
}

describe('Examples', () => {
  it('should work on `.graphql` files', () => {
    const cwd = join(ROOT_CWD, 'examples/basic');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(6);
    testSnapshot(results);
  });

  it('should work on `.js` files', () => {
    const cwd = join(ROOT_CWD, 'examples/code-file');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(4);
    testSnapshot(results);
  });

  it('should work with `graphql-config`', () => {
    const cwd = join(ROOT_CWD, 'examples/graphql-config');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work with `graphql-config` on `.js` files', () => {
    const cwd = join(ROOT_CWD, 'examples/graphql-config-code-file');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(4);
    testSnapshot(results);
  });

  it('should work with `eslint-plugin-prettier`', () => {
    const cwd = join(ROOT_CWD, 'examples/prettier');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(23);
    testSnapshot(results);
  });
});
