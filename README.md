# Event Manager

Event Manager is a web application designed to facilitate the management of participants in live events. It allows organizers to create events, manage participant registrations, and facilitate event check-ins.

## Installation

To get started with the Event Manager project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.
4. Set up the database by running `npx prisma migrate dev`.
5. Start the development server with `npm run dev`.

## Technologies Used

- Node.js
- TypeScript
- Fastify
- Prisma
- SQLite (for development)


### Functional Requirements

- [x] Organizers can register new events.
- [x]  Organizers can view event details and participant lists.
- [x]  Participants can register for events.
- [x]  Participants can view their registration badges.
- [x]  Participants can check in to events.

### Business Rules

- [x] Participants can only register for an event once.
- [x] Participants can only register for events with available slots.
- [x]  Participants can only check in to an event once.

### Non-functional Requirements

- [x] Event check-in is facilitated through QR codes.



### To build Project Event Manager API

## 1st Step

```bash
npm init -y
```

## 2nd Step

Create the src folder and server.ts file.

## 3rd Step

Install TypeScript (development dependency):
```bash
npm install typescript @types/node -D
```

## 4th Step

Create tsconfig.json file:
```bash
npx tsc --init
```

## 5th Step

Configure tsconfig.json:

- Go to the [tsconfig repository](https://github.com/tsconfig/bases?tab=readme-ov-file) (Node20 version).
- Copy the configuration and paste it into tsconfig.json.

## 6th Step

```bash
npm install tsx -D
```


## 7th Step

Add script to package.json:

```json
"scripts": {
    "dev": "tsx watch --env-file .env src/server.ts"
}
```
## 8th Step
Install Fastify micro framework for node (for route creation):

```bash
npm install fastify
```

## 9th Install ORM (Prisma):

```bash
npm install prisma -D

npx prisma init --datasource-provider SQLite
```
## 10th Run the API:

```bash
npm run dev
```
Visit http://localhost:3333



### REST API
- HTTP methods: GET, POST, PUT, DELETE, PATCH, HERD, OPTIONS ...
- Request body
- Search params or Query params (http://localhost:3333/user?id=235cvf)
- Route parameters (resource identification -> PUT: http://localhost:3333/235cvf)
- Headers (request context -> information: identification, location, language)
- Relational database (SQLite)
- Prisma (ORM)
- Notes
- REST API Summary
- HTTP methods: GET, POST, PUT, DELETE, PATCH, HERD, OPTIONS ...
- Request body
- Search params or Query params (http://localhost:3333/user?id=235cvf)
- Route parameters (resource identification -> PUT: http://localhost:3333/235cvf)
- Headers (request context -> information: identification, location, language)
- Relational database (SQLite)
- 20x => Success
- 30x => Redirection
- 40x => Client error
- 50x => Internal Server Error



## API Documentation (Swagger)

For API documentation, please visit the link: 

## Database

In this application, we will be using a relational database (SQL). For development environment, we will proceed with SQLite due to its ease of use.

## SQL Structure

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```