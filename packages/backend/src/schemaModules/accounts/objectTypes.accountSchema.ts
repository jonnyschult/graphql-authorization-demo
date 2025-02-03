import { objectType } from 'nexus';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('accountType');
    t.nonNull.float('balanceMinorUnits');
  },
});

export const UpdateAccountResult = objectType({
  name: 'UpdateAccountResult',
  definition(t) {
    t.nonNull.boolean('success');
  },
});
