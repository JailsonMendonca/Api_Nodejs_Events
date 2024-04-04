/*
  Warnings:

  - You are about to drop the column `attendee_id` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `attendee_Code` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_Code" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendee_Code_fkey" FOREIGN KEY ("attendee_Code") REFERENCES "atendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_check_ins" ("create_at", "id") SELECT "create_at", "id" FROM "check_ins";
DROP TABLE "check_ins";
ALTER TABLE "new_check_ins" RENAME TO "check_ins";
CREATE UNIQUE INDEX "check_ins_attendee_Code_key" ON "check_ins"("attendee_Code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
