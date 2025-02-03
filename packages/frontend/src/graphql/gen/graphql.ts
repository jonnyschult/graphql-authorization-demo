/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  Date: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  accountType: Scalars['String']['output'];
  balanceMinorUnits: Scalars['Float']['output'];
  id: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateBalance?: Maybe<UpdateAccountResult>;
};

export type MutationUpdateBalanceArgs = {
  accountId: Scalars['String']['input'];
  amountMinorUnits: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  accountDetails?: Maybe<Account>;
};

export type QueryAccountDetailsArgs = {
  accountId: Scalars['String']['input'];
};

export type UpdateAccountResult = {
  __typename?: 'UpdateAccountResult';
  success: Scalars['Boolean']['output'];
};

export type UpdateBalanceMutationVariables = Exact<{
  accountId: Scalars['String']['input'];
  amountMinorUnits: Scalars['Int']['input'];
}>;

export type UpdateBalanceMutation = {
  __typename?: 'Mutation';
  updateBalance?: {
    __typename?: 'UpdateAccountResult';
    success: boolean;
  } | null;
};

export type AccountDetailsQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;

export type AccountDetailsQuery = {
  __typename?: 'Query';
  accountDetails?: {
    __typename?: 'Account';
    accountType: string;
    id: string;
    balanceMinorUnits: number;
  } | null;
};

export const UpdateBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBalance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'amountMinorUnits' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBalance' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amountMinorUnits' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'amountMinorUnits' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBalanceMutation,
  UpdateBalanceMutationVariables
>;
export const AccountDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accountType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceMinorUnits' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountDetailsQuery, AccountDetailsQueryVariables>;
