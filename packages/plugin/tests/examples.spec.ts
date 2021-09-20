import { spawnSync } from 'child_process';
import { relative, join } from 'path';
import type { ESLint } from 'eslint';

function countErrors(results: ESLint.LintResult[]): number {
  return results.reduce<number>((acc, curr: { fatalErrorCount: number } & ESLint.LintResult) => {
    if (curr.fatalErrorCount > 0) {
      throw new Error('Found fatal error');
    }
    return acc + curr.errorCount;
  }, 0);
}

function getEslintOutput(cwd: string): ESLint.LintResult[] {
  const output = spawnSync('eslint', ['.', '--format', 'json'], { cwd }).stdout.toString();
  const start = output.indexOf('[');
  const end = output.lastIndexOf(']') + 1;
  return JSON.parse(output.slice(start, end));
}

function testSnapshot(results: ESLint.LintResult[]): void {
  const normalizedResults = results
    .map(result => ({
      filePath: relative(process.cwd(), result.filePath),
      messages: result.messages.map(msg => ({
        ruleId: msg.ruleId,
        message: msg.message,
      })),
    }))
    .filter(result => result.messages.length > 0);

  expect(normalizedResults).toMatchSnapshot();
}

describe('Examples', () => {
  it('should work on `.graphql` files', () => {
    const cwd = join(process.cwd(), 'examples/basic');
    const results = getEslintOutput(cwd);
    expect(countErrors(results)).toBe(6);
    testSnapshot(results);
  });

  it('should work on `.js` files', () => {
    const cwd = join(process.cwd(), 'examples/code-file');
    const results = getEslintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work with `graphql-config`', () => {
    const cwd = join(process.cwd(), 'examples/graphql-config');
    const results = getEslintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work with `graphql-config` on `.js` files', () => {
    const cwd = join(process.cwd(), 'examples/graphql-config-code-file');
    const results = getEslintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work with `eslint-plugin-prettier`', () => {
    const cwd = join(process.cwd(), 'examples/prettier');
    const results = getEslintOutput(cwd);
    expect(countErrors(results)).toBe(23);
    testSnapshot(results);
  });
});
