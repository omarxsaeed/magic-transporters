# Magic Transporters ✨

## Overview

Magic Transporters is a backend API for managing a system of Magic Movers, Magic Items, and Missions. It's built with NestJS, TypeScript, PostgreSQL and TypeORM, providing a robust and scalable solution for tracking and managing magical transportation operations.

## Features

- Manage Magic Movers: Create, update, and retrieve magical movers.
- Item Management: Track Magic Items and their weights. Load and unload items for magical movers.
- Mission Management: Create and track missions for magical movers.
- Quest States: Handle various states of quests for magical movers.
- Detailed Logging: Log activities for missions and item movements.
- Top Completers: Retrieve a list of movers who completed the most missions.

## Architecture

The system is built using the following technologies:

- NestJS
- TypeScript
- PostgreSQL
- Supabase
- TypeORM

The application consists of several key modules:

- Magic Mover Module: Handles operations related to magic movers.
- Magic Item Module: Manages magic items and their associations with movers and missions.
- Mission Module: Manages missions and tracks their progress and completion.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/omarxsaeed/magic-transporters
cd magic-transporters
```

2. Install dependencies:

```bash
npm install
```

3. Set up the environment variables:

Create a .env file in the root directory (you can use the .env.example) and configure the necessary environment variables:

```bash
PORT=5000 # or any other port you want to use

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=magic_transporters
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage

Once the application is running, you can interact with it using the provided API endpoints.
The API documentation will be available at `http://localhost:{PORT}/api`

Here's a quick overview of some of the key endpoints:

### Magic Movers Endpoints

- Create a Magic Mover:

```
POST /api/magic-mover
```

- Get all Magic Movers:

```
GET /api/magic-mover
```

- Get a Magic Mover by ID:

```
GET /api/magic-mover/:id
```

- Update a Magic Mover:

```
PATCH /api/magic-mover/:id
```

- Delete a Magic Mover:

```
DELETE /api/magic-mover/:id
```

- Load item(s) on a Magic Mover:

```
PATCH /api/magic-mover/load/:moverId
```

### Magic Items Endpoints

- Create a Magic Item:

```
POST /api/magic-item
```

- Get all magic items:

```
GET /api/magic-item
```

- Get a magic item by ID:

```
GET /api/magic-item/:id
```

- Update a magic item:

```
PATCH /api/magic-item/:id
```

- Delete a magic item:

```
DELETE /api/magic-item/:id
```

### Mission Endpoints

- Create a Mission:

```
POST /api/mission
```

- Get all missions:

```
GET /api/mission
```

- Get a mission by ID:

```
GET /api/mission/:id
```

- Get Top Completers:

```
GET /api/mission/top-completers
```

- Update a mission:

```
PATCH /api/mission/:id
```

- Delete a mission:

```
DELETE /api/mission/:id
```

<!-- ## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->

## License

Nest is [MIT licensed](LICENSE).

```

```
