/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

import { rule as alphabetize } from './alphabetize.js';
import { rule as descriptionStyle } from './description-style.js';
import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation.js';
import { rule as inputName } from './input-name.js';
import { rule as loneExecutableDefinition } from './lone-executable-definition.js';
import { rule as matchDocumentFilename } from './match-document-filename.js';
import { rule as namingConvention } from './naming-convention.js';
import { rule as noAnonymousOperations } from './no-anonymous-operations.js';
import { rule as noDeprecated } from './no-deprecated.js';
import { rule as noDuplicateFields } from './no-duplicate-fields.js';
import { rule as noHashtagDescription } from './no-hashtag-description.js';
import { rule as noOnePlaceFragments } from './no-one-place-fragments.js';
import { rule as noRootType } from './no-root-type.js';
import { rule as noScalarResultTypeOnMutation } from './no-scalar-result-type-on-mutation.js';
import { rule as noTypenamePrefix } from './no-typename-prefix.js';
import { rule as noUnreachableTypes } from './no-unreachable-types.js';
import { rule as noUnusedFields } from './no-unused-fields.js';
import { rule as relayArguments } from './relay-arguments.js';
import { rule as relayConnectionTypes } from './relay-connection-types.js';
import { rule as relayEdgeTypes } from './relay-edge-types.js';
import { rule as relayPageInfo } from './relay-page-info.js';
import { rule as requireDeprecationDate } from './require-deprecation-date.js';
import { rule as requireDeprecationReason } from './require-deprecation-reason.js';
import { rule as requireDescription } from './require-description.js';
import { rule as requireFieldOfTypeQueryInMutationResult } from './require-field-of-type-query-in-mutation-result.js';
import { rule as requireImportFragment } from './require-import-fragment.js';
import { rule as requireNullableFieldsWithOneof } from './require-nullable-fields-with-oneof.js';
import { rule as requireNullableResultInRoot } from './require-nullable-result-in-root.js';
import { rule as requireSelections } from './require-selections.js';
import { rule as requireTypePatternWithOneof } from './require-type-pattern-with-oneof.js';
import { rule as selectionSetDepth } from './selection-set-depth.js';
import { rule as strictIdInTypes } from './strict-id-in-types.js';
import { rule as uniqueEnumValueNames } from './unique-enum-value-names.js';
import { rule as uniqueFragmentName } from './unique-fragment-name.js';
import { rule as uniqueOperationName } from './unique-operation-name.js';

export const rules = {
  ...GRAPHQL_JS_VALIDATIONS,
  alphabetize,
  'description-style': descriptionStyle,
  'input-name': inputName,
  'lone-executable-definition': loneExecutableDefinition,
  'match-document-filename': matchDocumentFilename,
  'naming-convention': namingConvention,
  'no-anonymous-operations': noAnonymousOperations,
  'no-deprecated': noDeprecated,
  'no-duplicate-fields': noDuplicateFields,
  'no-hashtag-description': noHashtagDescription,
  'no-one-place-fragments': noOnePlaceFragments,
  'no-root-type': noRootType,
  'no-scalar-result-type-on-mutation': noScalarResultTypeOnMutation,
  'no-typename-prefix': noTypenamePrefix,
  'no-unreachable-types': noUnreachableTypes,
  'no-unused-fields': noUnusedFields,
  'relay-arguments': relayArguments,
  'relay-connection-types': relayConnectionTypes,
  'relay-edge-types': relayEdgeTypes,
  'relay-page-info': relayPageInfo,
  'require-deprecation-date': requireDeprecationDate,
  'require-deprecation-reason': requireDeprecationReason,
  'require-description': requireDescription,
  'require-field-of-type-query-in-mutation-result': requireFieldOfTypeQueryInMutationResult,
  'require-import-fragment': requireImportFragment,
  'require-nullable-fields-with-oneof': requireNullableFieldsWithOneof,
  'require-nullable-result-in-root': requireNullableResultInRoot,
  'require-selections': requireSelections,
  'require-type-pattern-with-oneof': requireTypePatternWithOneof,
  'selection-set-depth': selectionSetDepth,
  'strict-id-in-types': strictIdInTypes,
  'unique-enum-value-names': uniqueEnumValueNames,
  'unique-fragment-name': uniqueFragmentName,
  'unique-operation-name': uniqueOperationName,
};
