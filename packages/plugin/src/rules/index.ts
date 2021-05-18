import validate from './validate-against-schema';
import noUnreachableTypes from './no-unreachable-types';
import noAnonymousOperations from './no-anonymous-operations';
import noOperationNameSuffix from './no-operation-name-suffix';
import requireDeprecationReason from './require-deprecation-reason';
import avoidOperationNamePrefix from './avoid-operation-name-prefix';
import noCaseInsensitiveEnumValuesDuplicates from './no-case-insensitive-enum-values-duplicates';
import requireDescription from './require-description';
import requireIdWhenAvailable from './require-id-when-available';
import descriptionStyle from './description-style';
import namingConvention from './naming-convention';
import inputName from './input-name';
import uniqueFragmentName from './unique-fragment-name';
import uniqueOperationName from './unique-operation-name';
import noDeprecated from './no-deprecated';
import noHashtagDescription from './no-hashtag-description';
import selectionSetDepth from './selection-set-depth';
import avoidDuplicateFields from './avoid-duplicate-fields';
import strictIdInTypes from './strict-id-in-types';
import { GRAPHQL_JS_VALIDATIONS } from './graphql-js-validation';

export const rules = {
  'no-unreachable-types': noUnreachableTypes,
  'no-deprecated': noDeprecated,
  'unique-fragment-name': uniqueFragmentName,
  'unique-operation-name': uniqueOperationName,
  'validate-against-schema': validate,
  'no-hashtag-description': noHashtagDescription,
  'no-anonymous-operations': noAnonymousOperations,
  'no-operation-name-suffix': noOperationNameSuffix,
  'require-deprecation-reason': requireDeprecationReason,
  'avoid-operation-name-prefix': avoidOperationNamePrefix,
  'selection-set-depth': selectionSetDepth,
  'no-case-insensitive-enum-values-duplicates': noCaseInsensitiveEnumValuesDuplicates,
  'require-description': requireDescription,
  'require-id-when-available': requireIdWhenAvailable,
  'description-style': descriptionStyle,
  'avoid-duplicate-fields': avoidDuplicateFields,
  'naming-convention': namingConvention,
  'input-name': inputName,
  'strict-id-in-types': strictIdInTypes,
  ...GRAPHQL_JS_VALIDATIONS,
};
