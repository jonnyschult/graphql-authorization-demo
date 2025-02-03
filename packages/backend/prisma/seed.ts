import prisma from '~/prismaClient';
import { Permission } from '~/shared/constants';

async function main() {
  await prisma.$transaction(async (tx) => {
    // 1. Create Permissions
    const permissionsData = [
      { action: 'READ', resource: 'User' },
      { action: 'WRITE', resource: 'User' },
      { action: 'READ', resource: 'Account' },
      { action: 'WRITE', resource: 'Account' },
    ];

    const createdPermissions = await Promise.all(
      permissionsData.map((perm) => tx.permission.create({ data: perm })),
    );

    // 2. Create Roles
    const rolesData = [
      { name: 'Supervisor', description: 'Can perform any task for any user.' },
      {
        name: 'Agent',
        description: 'Can read and write date for their customers',
      },
      {
        name: 'Customer',
        description: 'Customers can only read their own data.',
      },
    ];

    const [supervisorRole, agentRole, customerRole] = await Promise.all(
      rolesData.map((role) => tx.role.create({ data: role })),
    );

    // 3. Assign Permissions to Roles
    const supervisorPermissions = createdPermissions; // Supervisor has all permissions
    const agentPermissions = createdPermissions;
    const customerPermissions = createdPermissions.filter((perm) =>
      [Permission.READ_User, Permission.READ_Account].includes(
        `${perm.action}_${perm.resource}` as Permission,
      ),
    );

    await tx.role.update({
      where: { id: supervisorRole.id },
      data: {
        permissions: {
          connect: supervisorPermissions.map((perm) => ({ id: perm.id })),
        },
      },
    });

    await tx.role.update({
      where: { id: agentRole.id },
      data: {
        permissions: {
          connect: agentPermissions.map((perm) => ({ id: perm.id })),
        },
      },
    });

    await tx.role.update({
      where: { id: customerRole.id },
      data: {
        permissions: {
          connect: customerPermissions.map((perm) => ({ id: perm.id })),
        },
      },
    });

    // 4. Create Users
    const usersData = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@authdemo.co',
        roleId: supervisorRole.id,
      },
      {
        firstName: 'John',
        lastName: 'Dough',
        email: 'jon.dough@authdemo.co',
        roleId: agentRole.id,
      },
      {
        firstName: 'George',
        lastName: 'King',
        email: 'george.king@authdemo.co',
        roleId: agentRole.id,
      },
      {
        firstName: 'Barbara',
        lastName: 'Barbar',
        email: 'barbaraB@fakemail.com',
        roleId: customerRole.id,
      },
      {
        firstName: 'Pam',
        lastName: 'Wozniak',
        email: 'pam.woz@fakemail.com',
        roleId: customerRole.id,
      },
      {
        firstName: 'Mike',
        lastName: 'Wozniak',
        email: 'mike.woz@fakemail.com',
        roleId: customerRole.id,
      },
      {
        firstName: 'Henry',
        lastName: 'Paker',
        email: 'pakman@unreal.uk',
        roleId: customerRole.id,
      },
      {
        firstName: 'Ben',
        lastName: 'Partridge',
        email: 'banjomin@fakemail.com',
        roleId: customerRole.id,
      },
    ];

    // Create the users
    const [
      _janeUser,
      johnUser,
      georgeUser,
      barbaraUser,
      pamUser,
      mikeUser,
      henryUser,
      benUser,
    ] = await Promise.all(
      usersData.map((user) => tx.user.create({ data: user })),
    );

    // 5. Create Accounts (Checking) and assign agents
    await tx.account
      .create({
        data: {
          id: 'cmnf3ra9iecyo9g0e826t69jx',
          accountType: 'Checking',
          balanceMinorUnits: Math.floor(Math.random() * 10_000_00),
          agentId: johnUser.id,
          customerId: barbaraUser.id,
        },
      })
      .catch((err) => console.log(err));

    await tx.account.create({
      data: {
        id: 'cm3g28hdtfsg042ixlprajb7s',
        accountType: 'Checking',
        balanceMinorUnits: Math.floor(Math.random() * 10_000_00),
        agentId: johnUser.id,
        customerId: pamUser.id,
      },
    });

    await tx.account.create({
      data: {
        id: 'cm0ifs4whyg0yc6fpfpwo9kub',
        accountType: 'Checking',
        balanceMinorUnits: Math.floor(Math.random() * 10_000_00),
        agentId: georgeUser.id,
        customerId: mikeUser.id,
      },
    });

    await tx.account.create({
      data: {
        id: 'cmczch9pkaba3qjs9xbqyyhaa',
        accountType: 'Savings',
        balanceMinorUnits: Math.floor(Math.random() * 10_000_000_00),
        agentId: johnUser.id,
        customerId: mikeUser.id,
      },
    });

    await tx.account.create({
      data: {
        id: 'cmk5zhrxenbfrcibwl4y0wi5r',
        accountType: 'Checking',
        balanceMinorUnits: Math.floor(Math.random() * 10_000_00),
        agentId: georgeUser.id,
        customerId: henryUser.id,
      },
    });

    await tx.account.create({
      data: {
        id: 'cmkrfed3difqrc9ue1me67mfq',
        accountType: 'Checking',
        balanceMinorUnits: Math.floor(Math.random() * 10_000_00),
        agentId: georgeUser.id,
        customerId: benUser.id,
      },
    });
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
