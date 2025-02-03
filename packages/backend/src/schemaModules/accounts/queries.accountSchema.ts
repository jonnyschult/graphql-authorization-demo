import { extendType, list, nonNull, stringArg } from 'nexus';
import { Account } from './objectTypes.accountSchema';

export const AccountQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('accountDetails', {
      type: Account,
      args: { accountId: nonNull(stringArg()) },
      async resolve(_root, { accountId }, { prisma }) {
        const account = await prisma.account.findUnique({
          where: { id: accountId },
          select: {
            id: true,
            accountType: true,
            balanceMinorUnits: true,
          },
        });

        return account;
      },
    });
  },
});
