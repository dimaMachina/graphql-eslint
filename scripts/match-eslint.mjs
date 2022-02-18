import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const version = process.argv[2];

if (version && !version.startsWith('8')) {
  if (version.startsWith('7')) {
    const eslint7Patch = `
diff --git a/node_modules/eslint/lib/linter/linter.js b/node_modules/eslint/lib/linter/linter.js
index 4e80926..cc486c1 100644
--- a/node_modules/eslint/lib/linter/linter.js
+++ b/node_modules/eslint/lib/linter/linter.js
@@ -35,7 +35,8 @@ const
     ruleReplacements = require("../../conf/replacements.json");
 
 const debug = require("debug")("eslint:linter");
-const MAX_AUTOFIX_PASSES = 10;
+// 🚨 10 is not enough for alphabetize test with definitions sorting
+const MAX_AUTOFIX_PASSES = 20;
 const DEFAULT_PARSER_NAME = "espree";
 const DEFAULT_ECMA_VERSION = 5;
 const commentParser = new ConfigCommentParser();
diff --git a/node_modules/eslint/lib/rule-tester/rule-tester.js b/node_modules/eslint/lib/rule-tester/rule-tester.js
index 2b55249..0a5e5a6 100644
--- a/node_modules/eslint/lib/rule-tester/rule-tester.js
+++ b/node_modules/eslint/lib/rule-tester/rule-tester.js
@@ -914,11 +914,12 @@ class RuleTester {
                     assert.strictEqual(result.output, item.output, "Output is incorrect.");
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
