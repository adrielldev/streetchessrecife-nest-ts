/*
  Warnings:

  - Made the column `updated_at` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_blitz" INTEGER NOT NULL DEFAULT 1500,
    "rating_rapid" INTEGER NOT NULL DEFAULT 1500,
    "vitorias" INTEGER NOT NULL DEFAULT 0,
    "empates" INTEGER NOT NULL DEFAULT 0,
    "derrotas" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("created_at", "derrotas", "empates", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username", "vitorias") SELECT coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", coalesce("derrotas", 0) AS "derrotas", coalesce("empates", 0) AS "empates", "id", "name", coalesce("rating_blitz", 1500) AS "rating_blitz", coalesce("rating_rapid", 1500) AS "rating_rapid", "updated_at", "username", coalesce("vitorias", 0) AS "vitorias" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
