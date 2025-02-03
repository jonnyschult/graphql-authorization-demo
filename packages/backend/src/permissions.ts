import { shield, rule, deny, race, chain } from 'graphql-shield';
import { Context } from './context';
import { Permission } from '~/shared/constants';
import { NODE_ENV } from './config';

const hasPermission = (permission: string) =>
  rule({ cache: 'contextual' })((_parent, _args, context: Context) => {
    const [action, resource] = permission.split('_');
    const perms = context.user?.role.permissions.some(
      (p) => p.resource === resource && p.action === action,
    );
    return perms ?? false;
  });

const isAccountAgent = rule({ cache: 'contextual' })(async (
  _parent,
  args,
  context: Context,
) => {
  if (!args.accountId) return false;

  const accounts = await context.prisma.account.findUnique({
    where: {
      id: args.accountId,
    },
  });

  let isAgent = accounts?.agentId === context.user?.id;

  return isAgent;
});

const isAccountCustomer = rule({ cache: 'contextual' })(async (
  _parent,
  args,
  context: Context,
) => {
  if (!args.accountId) return false;

  const accounts = await context.prisma.account.findUnique({
    where: {
      id: args.accountId,
    },
  });

  let isCustomer = accounts?.customerId === context.user?.id;

  return isCustomer;
});

const isSupervisor = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  context: Context,
) => {
  const isSupervisor = context.user?.role.name === 'Supervisor';
  return isSupervisor;
});

export const permissions = shield(
  {
    Query: {
      accountDetails: chain(
        hasPermission(Permission.READ_Account),
        race(isAccountAgent, isAccountCustomer, isSupervisor),
      ),
      '*': deny,
    },
    Account: {
      '*': chain(
        race(hasPermission(Permission.READ_Account)),
        race(isAccountAgent, isAccountCustomer, isSupervisor),
      ),
    },
    UpdateAccountResult: {
      success: chain(
        hasPermission('WRITE_Account'),
        race(isAccountAgent, isSupervisor),
      ),
    },
    Mutation: {
      updateBalance: chain(
        hasPermission('WRITE_Account'),
        race(isAccountAgent, isSupervisor),
      ),
    },
  },
  {
    fallbackRule: deny,
    debug: NODE_ENV === 'development',
  },
);

export default permissions;
