import { gql } from '../gen';

export const GET_ACCOUNT_DETAILS = gql(/* GraphQL */ `
  query AccountDetails($accountId: String!) {
    accountDetails(accountId: $accountId) {
      accountType
      id
      balanceMinorUnits
    }
  }
`);
