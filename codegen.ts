import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http:localhost:6380/graphql",
  documents: ["graphql/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
