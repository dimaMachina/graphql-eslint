import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { ESLint } from 'eslint';
import { CWD as PROJECT_CWD } from '../src/utils.js';

const CWD = join(PROJECT_CWD, '..', '..');

function countErrors(results: ESLint.LintResult[]): number {
  return results.reduce<number>((acc, curr: ESLint.LintResult & { fatalErrorCount: number }) => {
    if (curr.fatalErrorCount > 0) {
      throw new Error(`Found fatal error:

${results.map(result => result.messages.map(m => m.message)).join('\n\n')}
      `);
    }
    return acc + curr.errorCount;
  }, 0);
}

function getESLintOutput(cwd: string): ESLint.LintResult[] {
  const { stdout, stderr } = spawnSync('eslint', ['.', '--format', 'json'], { cwd });
  const errorOutput = stderr
    .toString()
    .replace(
      /\(node:\d{4,5}\) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time/,
      '',
    )
    .replace(
      /\(node:\d{4}\) ExperimentalWarning: Import assertions are not a stable feature of the JavaScript language. Avoid relying on their current behavior and syntax as those might change in a future version of Node.js./,
      '',
    )
    .replace('(Use `node --trace-warnings ...` to show where the warning was created)', '')
    .trimEnd();
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
      filePath: relative(CWD, result.filePath),
      messages: result.messages,
    }))
    .filter(result => result.messages.length > 0);

  expect(normalizedResults).toMatchSnapshot();
}

describe('Examples', () => {
  it('should work programmatically', () => {
    const cwd = join(CWD, 'examples/programmatic');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(6);
    testSnapshot(results);
  });

  it('should work on `.js` files', () => {
    const cwd = join(CWD, 'examples/code-file');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(4);
    testSnapshot(results);
  });

  it('should work with `graphql-config`', () => {
    const cwd = join(CWD, 'examples/graphql-config');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work with `eslint-plugin-prettier`', () => {
    const cwd = join(CWD, 'examples/prettier');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(23);
    testSnapshot(results);
  });

  it('should work in monorepo', () => {
    const cwd = join(CWD, 'examples/monorepo');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(11);
    testSnapshot(results);
  });

  it('should work in svelte', () => {
    const cwd = join(CWD, 'examples/svelte-code-file');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work in vue', () => {
    const cwd = join(CWD, 'examples/vue-code-file');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(2);
    testSnapshot(results);
  });

  it('should work in multiple projects', () => {
    const cwd = join(CWD, 'examples/multiple-projects-graphql-config');
    const results = getESLintOutput(cwd);
    expect(countErrors(results)).toBe(4);
    testSnapshot(results);
  });
});
