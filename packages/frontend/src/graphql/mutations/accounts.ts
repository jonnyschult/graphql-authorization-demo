import { gql } from '../gen';

export const UPDATE_BALANCE = gql(/* GraphQL */ `
  mutation UpdateBalance($accountId: String!, $amountMinorUnits: Int!) {
    updateBalance(accountId: $accountId, amountMinorUnits: $amountMinorUnits) {
      success
    }
  }
`);
