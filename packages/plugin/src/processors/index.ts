import { createGraphqlProcessor } from './code-files';

const EXTRACTABLE_FILES_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', 'graphql'];
const processor = createGraphqlProcessor();

export const processors = EXTRACTABLE_FILES_EXTENSIONS.reduce((prev, ext) => ({ ...prev, [ext]: processor }), {});
