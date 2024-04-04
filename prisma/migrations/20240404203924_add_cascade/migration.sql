-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_atendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "atendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_atendees" ("code", "create_at", "email", "event_id", "id", "name") SELECT "code", "create_at", "email", "event_id", "id", "name" FROM "atendees";
DROP TABLE "atendees";
ALTER TABLE "new_atendees" RENAME TO "atendees";
CREATE UNIQUE INDEX "atendees_code_key" ON "atendees"("code");
CREATE UNIQUE INDEX "atendees_event_id_email_key" ON "atendees"("event_id", "email");
CREATE TABLE "new_check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_Code" TEXT NOT NULL,
    CONSTRAINT "check_ins_attendee_Code_fkey" FOREIGN KEY ("attendee_Code") REFERENCES "atendees" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check_ins" ("attendee_Code", "create_at", "id") SELECT "attendee_Code", "create_at", "id" FROM "check_ins";
DROP TABLE "check_ins";
ALTER TABLE "new_check_ins" RENAME TO "check_ins";
CREATE UNIQUE INDEX "check_ins_attendee_Code_key" ON "check_ins"("attendee_Code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
