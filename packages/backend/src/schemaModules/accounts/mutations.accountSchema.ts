import { extendType, intArg, list, nonNull, stringArg } from 'nexus';
import { Account, UpdateAccountResult } from './objectTypes.accountSchema';

export const AccountMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateBalance', {
      type: UpdateAccountResult,
      args: {
        accountId: nonNull(stringArg()),
        amountMinorUnits: nonNull(intArg()),
      },
      async resolve(_root, { accountId, amountMinorUnits }, { prisma }) {
        const account = await prisma.account.update({
          where: { id: accountId },
          data: {
            balanceMinorUnits: amountMinorUnits,
          },
        });

        return { success: true };
      },
    });
  },
});
