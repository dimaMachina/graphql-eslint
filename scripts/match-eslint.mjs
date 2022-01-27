import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const version = process.argv[2];

if (version && !version.startsWith('8')) {
  if (version.startsWith('7')) {
    const eslint7Patch = `
diff --git a/node_modules/eslint/lib/rule-tester/rule-tester.js b/node_modules/eslint/lib/rule-tester/rule-tester.js
index 2b55249..89e82dc 100644
--- a/node_modules/eslint/lib/rule-tester/rule-tester.js
+++ b/node_modules/eslint/lib/rule-tester/rule-tester.js
@@ -911,14 +911,25 @@ class RuleTester {
                         "Expected no autofixes to be suggested"
                     );
                 } else {
-                    assert.strictEqual(result.output, item.output, "Output is incorrect.");
+                    if (item.output.includes('# normalize graphql')) {
+                        const graphql = require('graphql');
+
+                        function normalize(value) {
+                            return graphql.print(graphql.parse(value.replace('# normalize graphql', '')));
+                        }
+
+                        assert.strictEqual(normalize(result.output), normalize(item.output), 'Output is incorrect.');
+                    } else {
+                        assert.strictEqual(result.output, item.output, 'Output is incorrect.');
+                    }
                 }
             } else {
-                assert.strictEqual(
-                    result.output,
-                    item.code,
-                    "The rule fixed the code. Please add 'output' property."
-                );
+                // 🚨 Don't need, as we assert autofix output with snapshots
+                // assert.strictEqual(
+                //     result.output,
+                //     item.code,
+                //     "The rule fixed the code. Please add 'output' property."
+                // );
             }

             // Rules that produce fixes must have \`meta.fixable\` property.
`.trimStart();
    writeFileSync(resolve(process.cwd(), `patches/eslint+${version}.patch`), eslint7Patch, 'utf8');

    const eslint8PatchFilename = readdirSync(resolve(process.cwd(), 'patches')).find(filename =>
      filename.startsWith('eslint+8')
    );
    unlinkSync(resolve(process.cwd(), 'patches', eslint8PatchFilename));
  }

  const pkgPath = resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath));
  pkg.resolutions.eslint = `^${version}`;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
}
