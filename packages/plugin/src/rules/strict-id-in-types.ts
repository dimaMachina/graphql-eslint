import { GraphQLESLintRule } from '../types';

type StrictIdInTypesRuleConfig = [
  {
    acceptedIdNames?: string[];
    acceptedIdTypes?: string[];
    exceptions?: {
      suffixes?: string[];
    };
  }
];

const rule: GraphQLESLintRule<StrictIdInTypesRuleConfig> = {
  create(context) {
    return {
      FieldDefinition(node) {},
    };
  },
};

export default rule;
