// rewrite exports because we don't need `processors` export that has fs related dependencies

export { parser } from './parser.js';
export { rules } from './rules/index.js';
export * from './types.js';
export { flatConfigs } from './flat-configs.js';
