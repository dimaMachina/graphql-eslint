/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation';
import { rule as alphabetize } from './alphabetize';
import { rule as descriptionStyle } from './description-style';
import { rule as inputName } from './input-name';
import { rule as loneExecutableDefinition } from './lone-executable-definition';
import { rule as matchDocumentFilename } from './match-document-filename';
import { rule as namingConvention } from './naming-convention';
import { rule as noAnonymousOperations } from './no-anonymous-operations';
import { rule as noCaseInsensitiveEnumValuesDuplicates } from './no-case-insensitive-enum-values-duplicates';
import { rule as noDeprecated } from './no-deprecated';
import { rule as noDuplicateFields } from './no-duplicate-fields';
import { rule as noHashtagDescription } from './no-hashtag-description';
import { rule as noRootType } from './no-root-type';
import { rule as noScalarResultTypeOnMutation } from './no-scalar-result-type-on-mutation';
import { rule as noTypenamePrefix } from './no-typename-prefix';
import { rule as noUnreachableTypes } from './no-unreachable-types';
import { rule as noUnusedFields } from './no-unused-fields';
import { rule as relayArguments } from './relay-arguments';
import { rule as relayConnectionTypes } from './relay-connection-types';
import { rule as relayEdgeTypes } from './relay-edge-types';
import { rule as relayPageInfo } from './relay-page-info';
import { rule as requireDeprecationDate } from './require-deprecation-date';
import { rule as requireDeprecationReason } from './require-deprecation-reason';
import { rule as requireDescription } from './require-description';
import { rule as requireFieldOfTypeQueryInMutationResult } from './require-field-of-type-query-in-mutation-result';
import { rule as requireIdWhenAvailable } from './require-id-when-available';
import { rule as selectionSetDepth } from './selection-set-depth';
import { rule as strictIdInTypes } from './strict-id-in-types';
import { rule as uniqueFragmentName } from './unique-fragment-name';
import { rule as uniqueOperationName } from './unique-operation-name';

export const rules = {
  ...GRAPHQL_JS_VALIDATIONS,
  alphabetize,
  'description-style': descriptionStyle,
  'input-name': inputName,
  'lone-executable-definition': loneExecutableDefinition,
  'match-document-filename': matchDocumentFilename,
  'naming-convention': namingConvention,
  'no-anonymous-operations': noAnonymousOperations,
  'no-case-insensitive-enum-values-duplicates': noCaseInsensitiveEnumValuesDuplicates,
  'no-deprecated': noDeprecated,
  'no-duplicate-fields': noDuplicateFields,
  'no-hashtag-description': noHashtagDescription,
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
  'require-id-when-available': requireIdWhenAvailable,
  'selection-set-depth': selectionSetDepth,
  'strict-id-in-types': strictIdInTypes,
  'unique-fragment-name': uniqueFragmentName,
  'unique-operation-name': uniqueOperationName,
};
