import { dirname } from 'path';
import { fileURLToPath } from 'url';

function __dirname(importMetaUrl = import.meta.url) {
    return dirname(fileURLToPath(importMetaUrl));
}

export default __dirname;