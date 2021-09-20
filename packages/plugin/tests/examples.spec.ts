import { ESLint } from 'eslint';
import { join } from 'path';

describe('Examples', () => {
  it('should work with `eslint-plugin-prettier`', async () => {
    const eslint = new ESLint({ cwd: join(process.cwd(), 'examples/prettier') });
    const results = await eslint.lintFiles('.');
    const errorCount = results.reduce<number>((acc, curr) => acc + curr.errorCount, 0);
    expect(errorCount).toBe(23);
  });
});
