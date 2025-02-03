# GraphQL Authorization Demo--React Frontend (Vite + Apollo)

This is a **React + TypeScript** application powered by **Vite**. It provides a UI to interact with a GraphQL backend secured by _GraphQL Shield_. While the **authorization** approach standard practices, the UI design, data handling, and other details are deliberately minimal and not production-ready.

## Key Features

- **User Selection:** The UI lets you pick a user (Supervisor, Agent, or Customer) to simulate logging in. This sets a token passed in the GraphQL request headers.
- **Accounts View:** Displays different customer accounts. Depending on the selected user’s role and account ownership, certain operations (like editing the balance) may be restricted by the backend’s Shield rules.

## Prerequisites

- **PNPM 8+**: [Install PNPM](https://pnpm.io/installation) if you haven’t already.
- **Backend Running:** Ensure the backend service is running on `http://localhost:8080/api/graphql` before starting this app.

## Setup & Run

1.  From `packages/frontend`, run `pnpm install` to install dependencies.
2.  Copy the contents of the .env.example and create `.env` file.
3.  Start the dev server by running `pnpm dev`.
4.  Open `http://localhost:3000` in your browser. You can pick from the available users (e.g. Jane Doe, John Dough, Pam Wozniak, etc.) to change the token sent to the backend.

## Agent–Customer Relationships

#### Jane Doe (Supervisor)

- Supervisor of all accounts.

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

Overall, supervisors can freely access and modify all data, agents can see and manage only their assigned customers’ accounts, and customers can only view their own accounts. This setup underlines how RBAC (role-based access control) and ABAC (attribute-based access control) work together in the demo.

## Notes

- **No Real Authentication:** There is no real login flow. The “logged-in” user is picked via a series of buttons, which merely swaps out the `authorization` header token.
- **Apollo Client:** The token set in the UI is sent to the backend through `context: { headers }`. Check `Accounts` or `Users` components for how these requests are made.
- **Minimal Error Handling:** Error messages from the server are displayed in alerts, primarily to show how GraphQL Shield denies unauthorized actions.
- **ENVs:** The env file can contain a copy of the `.env.example` file.
