module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "import/order": [
        "error",
        {
          "groups": [
              "builtin",
              "external",
              "internal",
              ["sibling", "parent", "index"],
              "type",
              "unknown"
          ],
          "pathGroups": [
              {
                  "pattern": "{react*,react*/**}",
                  "group": "external",
                  "position": "before"
              },
              {
                  "pattern": "@saas-fe/**/*.style",
                  "group": "unknown"
              },
              {
                  "pattern": "@pages/**/*.style",
                  "group": "unknown"
              },
              {
                  "pattern": "@components/**/*.style",
                  "group": "unknown"
              },
              {
                  "pattern": "./**/*.style",
                  "group": "unknown"
              },
              {
                  "pattern": "../**/*.style",
                  "group": "unknown"
              },
              {
                  "pattern": "*.style",
                  "group": "unknown"
              }
          ],
          "pathGroupsExcludedImportTypes": ["react", "unknown"],
          "newlines-between": "always",
          "alphabetize": {
              "order": "asc",
              "caseInsensitive": true
          },
        }
    ]
  },
  "ignorePatterns": ["models/**"]
}
