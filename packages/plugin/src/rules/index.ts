/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation';
import alphabetize from './alphabetize';
import descriptionStyle from './description-style';
import inputName from './input-name';
import matchDocumentFilename from './match-document-filename';
import namingConvention from './naming-convention';
import noAnonymousOperations from './no-anonymous-operations';
import noCaseInsensitiveEnumValuesDuplicates from './no-case-insensitive-enum-values-duplicates';
import noDeprecated from './no-deprecated';
import noDuplicateFields from './no-duplicate-fields';
import noHashtagDescription from './no-hashtag-description';
import noRootType from './no-root-type';
import noScalarResultTypeOnMutation from './no-scalar-result-type-on-mutation';
import noTypenamePrefix from './no-typename-prefix';
import noUnreachableTypes from './no-unreachable-types';
import noUnusedFields from './no-unused-fields';
import relayConnectionTypes from './relay-connection-types';
import relayEdgeTypes from './relay-edge-types';
import relayPageInfo from './relay-page-info';
import requireDeprecationDate from './require-deprecation-date';
import requireDeprecationReason from './require-deprecation-reason';
import requireDescription from './require-description';
import requireFieldOfTypeQueryInMutationResult from './require-field-of-type-query-in-mutation-result';
import requireIdWhenAvailable from './require-id-when-available';
import selectionSetDepth from './selection-set-depth';
import strictIdInTypes from './strict-id-in-types';
import uniqueFragmentName from './unique-fragment-name';
import uniqueOperationName from './unique-operation-name';

export const rules = {
  ...GRAPHQL_JS_VALIDATIONS,
  alphabetize,
  'description-style': descriptionStyle,
  'input-name': inputName,
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
