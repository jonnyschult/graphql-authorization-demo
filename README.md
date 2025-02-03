# GraphQL Shield Demo

## Overview

Welcome to the GraphQL Shield Authorization Demo project, a monorepo demo companion app to the "Fintech Security with GraphQL Shield" blog hosted at [https://www.yeti.co/blog](yeti.co/blog). It features a GraphQL backend (secured by GraphQL Shield) and a React frontend built with Vite. This project showcases role-based and attribute-based access control patterns in a fintech-like scenario. Although the authorization layer is modeled with best practices, other aspects of the code (frontend design, database schema, etc.) are intentionally simplified and not intended for production.

## Permissions, Roles, Attributes, and Relations

Below is a brief summary of how the users, accounts, and roles are related in this seeding script:

### Roles & Permissions

- Supervisor (Jane Doe): Has all permissions (READ/WRITE for both User and Account).
- Agent (John Dough, George King): Has effectively all permissions as well but is logically restricted to the accounts tied to their agent IDs.
- Customer (Barbara Barbar, Pam Wozniak, Mike Wozniak, Henry Paker, Ben Partridge): Can only read their own user data and accounts.

### Agent–Customer Relationships

#### John Dough (Agent)

- Agent for Barbara Barbar’s checking account (cmnf3ra9iecyo9g0e826t69jx).
- Agent for Pam Wozniak’s checking account (cm3g28hdtfsg042ixlprajb7s).
- Agent for Mike Wozniak’s savings account (cmczch9pkaba3qjs9xbqyyhaa).

#### George King (Agent)

- Agent for Mike Wozniak’s checking account (cm0ifs4whyg0yc6fpfpwo9kub).
- Agent for Henry Paker’s checking account (cmk5zhrxenbfrcibwl4y0wi5r).
- Agent for Ben Partridge’s checking account (cmkrfed3difqrc9ue1me67mfq).

### Multiple Accounts

- Mike Wozniak has two accounts, one with John Dough (Savings) and one with George King (Checking). This demonstrates how a single customer can have multiple agents across different accounts.

Overall, supervisors can freely access and modify all data, agents can see and manage only their assigned customers’ accounts, and customers can only view (and potentially update) their own accounts. This setup underlines how RBAC (role-based access control) and ABAC (attribute-based access control) work together in the demo.

## Repository Structure

- packages/backend: Contains the Node.js / TypeScript backend with Prisma, Nexus, and Apollo Server.
- packages/frontend: Contains the React app using Vite and Apollo Client.
- docker-compose.yml: Defines local services for running a PostgreSQL database (and any other needed services).
- docker-compose.jest.yml: Defines a test database environment for Jest.

## Getting Started (High-Level Steps)

### Install node

```bash
nvm install 20.11
```

The `.nvmrc` file in the root of this project should default to node 20.11 if you run `nvm use`.
Confirm that this is the case by running `node --version` on the command line.

### Install pnpm

Follow the [pnpm installation instructions](https://pnpm.io/installation).

### Install dependencies

We use [pnpm workspaces](https://pnpm.io/workspaces), which allows for dependency sharing between packages. This allows us to just do a single install at the root folder.

```bash
pnpm install
```

## Running the App

1. Start the Database:
   From the project root, run:
   `docker compose up -d`

2. This will start a local PostgreSQL instance.
   Set Up the Backend:

   - Navigate to packages/backend.
   - Copy the contents of the `.env.example` and create `.env` file.
   - Run `pnpm install` to install dependencies.
   - Run `pnpm migrate:deploy` to apply database migrations.
   - Run `pnpm generate` to generate Prisma and Nexus schemas.
   - Run `pnpm seed` to generate example data.
   - Finally, run `pnpm dev` to start the backend server (by default on port 8080).

3. Set Up the Frontend:

   - Navigate to packages/frontend.
   - Copy the contents of the `.env.example` and create `.env` file.
   - Run `pnpm install` to install dependencies.
   - Run `pnpm dev` to start the Vite dev server (configured to be on port 3000).

4. Open the App:
   - Visit http://localhost:3000 in your browser to interact with the frontend.
   - You can switch between different users (Supervisor, Agent, or Customer) to see how access controls work.

### Note: See each package’s README for more details on building, testing, and deployment specifics.
