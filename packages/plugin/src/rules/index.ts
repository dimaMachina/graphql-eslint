import validate from "./validate-against-schema";
import noAnonymousOperations  from "./no-anonymous-operations";
import noOperationNameSuffix from "./no-operation-name-suffix";
import deprecationMustHaveReason from "./deprecation-must-have-reason";

export const rules = {
  'validate-against-schema': validate,
  'no-anonymous-operations': noAnonymousOperations,
  'no-operation-name-suffix': noOperationNameSuffix,
  'deprecation-must-have-reason': deprecationMustHaveReason
};
 