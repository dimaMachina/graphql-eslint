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

function getFlatESLintOutput(cwd: string): ESLint.LintResult[] {
  const { stdout, stderr } = spawnSync('eslint', ['--format', 'json', '.'], { cwd });

  return parseESLintOutput({ stdout, stderr });
}

function getLegacyESLintOutput(cwd: string): ESLint.LintResult[] {
  const { stdout, stderr } = spawnSync(
    'eslint',
    ['--format', 'json', '--ignore-pattern', 'eslint.config.js', '.'],
    {
      cwd,
      env: { ...process.env, ESLINT_USE_FLAT_CONFIG: 'false' },
    },
  );

  return parseESLintOutput({ stdout, stderr });
}

function parseESLintOutput({
  stdout,
  stderr,
}: {
  stdout: Buffer;
  stderr: Buffer;
}): ESLint.LintResult[] {
  const errorOutput = stderr
    .toString()
    .replace(
      /\(node:\d{4,7}\) \[DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead./,
      '',
    )
    .replace('(Use `node --trace-deprecation ...` to show where the warning was created)', '')
    .trimEnd();
  if (errorOutput) {
    throw new Error(errorOutput);
  }
  const output = stdout.toString();
  const start = output.indexOf('[{');
  const end = output.lastIndexOf('}]') + 2;
  return JSON.parse(output.slice(start, end));
}

function normalizeResults(results: ESLint.LintResult[]) {
  return results
    .map(result => ({
      filePath: relative(CWD, result.filePath),
      messages: result.messages,
    }))
    .filter(result => result.messages.length > 0);
}

describe('Examples', () => {
  it('should work programmatically', () => {
    const cwd = join(CWD, 'examples/programmatic');
    testESLintOutput(cwd, 6);
  });

  it('should work on `.js` files', () => {
    const cwd = join(CWD, 'examples/code-file');
    testESLintOutput(cwd, 4);
  });

  it('should work with `graphql-config`', () => {
    const cwd = join(CWD, 'examples/graphql-config');
    testESLintOutput(cwd, 2);
  });

  it('should work with `eslint-plugin-prettier`', () => {
    const cwd = join(CWD, 'examples/prettier');
    testESLintOutput(cwd, 23);
  });

  it('should work in monorepo', () => {
    const cwd = join(CWD, 'examples/monorepo');
    testESLintOutput(cwd, 11);
  });

  it('should work in svelte', () => {
    const cwd = join(CWD, 'examples/svelte-code-file');
    testESLintOutput(cwd, 2);
  });

  it('should work in vue', () => {
    const cwd = join(CWD, 'examples/vue-code-file');
    testESLintOutput(cwd, 2);
  });

  it('should work in multiple projects', () => {
    const cwd = join(CWD, 'examples/multiple-projects-graphql-config');
    testESLintOutput(cwd, 4);
  });
});

function testESLintOutput(cwd: string, errorCount: number): void {
  const flatResults = getFlatESLintOutput(cwd);
  expect(countErrors(flatResults)).toBe(errorCount);
  expect(normalizeResults(flatResults)).toMatchSnapshot();

  const results = getLegacyESLintOutput(cwd);
  expect(countErrors(results)).toBe(errorCount);
  expect(normalizeResults(results)).toMatchSnapshot();
}
