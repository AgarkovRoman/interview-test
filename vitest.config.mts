/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    test: {
        globals: true,
    },
})
