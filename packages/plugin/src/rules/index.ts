import validate from "./validate-against-schema";
import noAnonymousOperations  from "./no-anonymous-operations";
import noOperationNameSuffix from "./no-operation-name-suffix";
import deprecationMustHaveReason from "./deprecation-must-have-reason";
import avoidOperationNamePrefix from "./avoid-operation-name-prefix";
import noCaseInsensitiveEnumValuesDuplicates from "./no-case-insensitive-enum-values-duplicates";
import requireDescription from "./require-description";

export const rules = {
  'validate-against-schema': validate,
  'no-anonymous-operations': noAnonymousOperations,
  'no-operation-name-suffix': noOperationNameSuffix,
  'deprecation-must-have-reason': deprecationMustHaveReason,
  'avoid-operation-name-prefix': avoidOperationNamePrefix,
  'no-case-insensitive-enum-values-duplicates': noCaseInsensitiveEnumValuesDuplicates,
  'require-description': requireDescription,
};
 