/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment RegularUser on User {\n    id\n    username\n  }\n": types.RegularUserFragmentDoc,
    "\n  mutation ChangePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation CreatePost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      createdAt\n      updatedAt\n      creatorId\n      points\n      text\n      title\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($options: UsernamePasswordInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n        id\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query Me {\n    me {\n      username\n      id\n    }\n  }\n": types.MeDocument,
    "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      id\n      title\n      text\n      createdAt\n    }\n  }\n": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RegularUser on User {\n    id\n    username\n  }\n"): (typeof documents)["\n  fragment RegularUser on User {\n    id\n    username\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($token: String!, $newPassword: String!) {\n    changePassword(token: $token, newPassword: $newPassword) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      createdAt\n      updatedAt\n      creatorId\n      points\n      text\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      createdAt\n      updatedAt\n      creatorId\n      points\n      text\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        username\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($options: UsernamePasswordInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($options: UsernamePasswordInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      username\n      id\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      username\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      id\n      title\n      text\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      id\n      title\n      text\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;