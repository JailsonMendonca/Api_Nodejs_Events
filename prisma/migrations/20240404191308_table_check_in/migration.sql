-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_Code" TEXT NOT NULL,
    CONSTRAINT "check_ins_attendee_Code_fkey" FOREIGN KEY ("attendee_Code") REFERENCES "atendees" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_check_ins" ("attendee_Code", "create_at", "id") SELECT "attendee_Code", "create_at", "id" FROM "check_ins";
DROP TABLE "check_ins";
ALTER TABLE "new_check_ins" RENAME TO "check_ins";
CREATE UNIQUE INDEX "check_ins_attendee_Code_key" ON "check_ins"("attendee_Code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
