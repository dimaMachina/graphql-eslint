/*
 * 🚨 IMPORTANT! Do not manually modify this file. Run: `yarn generate-configs`
 */

import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation';
import avoidDuplicateFields from './avoid-duplicate-fields';
import avoidOperationNamePrefix from './avoid-operation-name-prefix';
import avoidTypenamePrefix from './avoid-typename-prefix';
import descriptionStyle from './description-style';
import inputName from './input-name';
import matchDocumentFilename from './match-document-filename';
import namingConvention from './naming-convention';
import noAnonymousOperations from './no-anonymous-operations';
import noCaseInsensitiveEnumValuesDuplicates from './no-case-insensitive-enum-values-duplicates';
import noDeprecated from './no-deprecated';
import noHashtagDescription from './no-hashtag-description';
import noOperationNameSuffix from './no-operation-name-suffix';
import noUnreachableTypes from './no-unreachable-types';
import noUnusedFields from './no-unused-fields';
import requireDeprecationDate from './require-deprecation-date';
import requireDeprecationReason from './require-deprecation-reason';
import requireDescription from './require-description';
import requireIdWhenAvailable from './require-id-when-available';
import selectionSetDepth from './selection-set-depth';
import strictIdInTypes from './strict-id-in-types';
import uniqueFragmentName from './unique-fragment-name';
import uniqueOperationName from './unique-operation-name';

export const rules = {
  ...GRAPHQL_JS_VALIDATIONS,
  'avoid-duplicate-fields': avoidDuplicateFields,
  'avoid-operation-name-prefix': avoidOperationNamePrefix,
  'avoid-typename-prefix': avoidTypenamePrefix,
  'description-style': descriptionStyle,
  'input-name': inputName,
  'match-document-filename': matchDocumentFilename,
  'naming-convention': namingConvention,
  'no-anonymous-operations': noAnonymousOperations,
  'no-case-insensitive-enum-values-duplicates': noCaseInsensitiveEnumValuesDuplicates,
  'no-deprecated': noDeprecated,
  'no-hashtag-description': noHashtagDescription,
  'no-operation-name-suffix': noOperationNameSuffix,
  'no-unreachable-types': noUnreachableTypes,
  'no-unused-fields': noUnusedFields,
  'require-deprecation-date': requireDeprecationDate,
  'require-deprecation-reason': requireDeprecationReason,
  'require-description': requireDescription,
  'require-id-when-available': requireIdWhenAvailable,
  'selection-set-depth': selectionSetDepth,
  'strict-id-in-types': strictIdInTypes,
  'unique-fragment-name': uniqueFragmentName,
  'unique-operation-name': uniqueOperationName,
};
