GraphQL Authorization Demo--Node.js Backend

# GraphQL Authorization Demo--Node.js Backend

This directory contains the backend for our **GraphQL Authorization** monorepo demo. It uses:

- **Prisma** for database access
- **Nexus** to build the GraphQL schema
- **Apollo Server** to handle GraphQL requests and responses
- **GraphQL Shield** to enforce fine-grained authorization rules

Although the **authorization** approach is designed with best practices in mind, the rest of the backend (schema design, error handling, etc.) is intentionally kept simple.

## Roles & Account Relationships

The system sets up three main roles:

- **Supervisor**: Full access to read and write any user or account
- **Agent**: Limited to reading and writing accounts belonging to their customers
- **Customer**: Can only read (and partially update) their own accounts

Agents are assigned to specific accounts using an `agentId`. Customers are assigned with a `customerId`. GraphQL Shield checks these fields to confirm which user is allowed to view or modify data.

## Prerequisites

- **PNPM 8+**: [Install PNPM](https://pnpm.io/installation).
- **Docker**: Make sure Docker is running (the local PostgreSQL instance is defined in `docker-compose.yml`).

## Getting Started

1.  In the `packages/backend` directory, run:

        pnpm install

    to install dependencies.

2.  Copy the contents of the `.env.example` and create `.env` file.
3.  Ensure the database is running locally:

        docker compose up -d

4.  Apply database migrations:

        pnpm migrate:deploy

5.  Generate Prisma and Nexus schemas:

        pnpm generate

6.  Generate data by running the seed script:

        pnpm seed

7.  Start the dev server:

        pnpm dev

    By default, this runs on `http://localhost:8080/api/graphql`.

## Modifying the Prisma Schema

If you update `prisma/schema.prisma`, run:

    pnpm generate:prisma
    pnpm migrate:create
    pnpm migrate
    pnpm generate:nexus

This sequence updates the Prisma client, applies your schema changes to the database, and regenerates the Nexus-based GraphQL schema.

## Testing

Use:

    pnpm test

This spins up a separate test database defined in `docker-compose.jest.yml`. You can customize or expand the existing Jest tests as needed.

## Seed Script & Example Users

There is a seed script, `prisma/seed.ts`, that sets up:

- Basic **Supervisor**, **Agent**, and **Customer** roles
- Sample users (e.g., Jane Doe for Supervisor, John Dough for Agent, Pam Wozniak for Customer, etc.)
- A few example accounts, each referencing an `agentId` and `customerId`

As mentioned above, you can run the seed script via:

    pnpm seed

This allows you to immediately test the role and permission logic against actual data.

## Notes

This demo is meant to illustrate authorization patterns with **GraphQL Shield**. If you wish to use these concepts in production, you’ll want to:

- Implement real authentication flows (e.g., JWT, OAuth)
- Refine error handling and logging practices
- Use a more secure configuration for environment variables and secrets
