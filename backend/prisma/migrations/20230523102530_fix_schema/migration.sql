/*
  Warnings:

  - You are about to drop the column `type_of_game` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rating_blitz` on the `Player` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_game" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,
    "rating_white_player" INTEGER NOT NULL,
    "rating_black_player" INTEGER NOT NULL,
    "white_player_id" INTEGER NOT NULL,
    "black_player_id" INTEGER NOT NULL,
    CONSTRAINT "Game_white_player_id_fkey" FOREIGN KEY ("white_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_black_player_id_fkey" FOREIGN KEY ("black_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("black_player_id", "date_game", "id", "rating_black_player", "rating_white_player", "result", "white_player_id") SELECT "black_player_id", "date_game", "id", "rating_black_player", "rating_white_player", "result", "white_player_id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_rapid" INTEGER NOT NULL DEFAULT 1500,
    "victories" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("created_at", "draws", "id", "loses", "name", "rating_rapid", "updated_at", "username", "victories") SELECT "created_at", "draws", "id", "loses", "name", "rating_rapid", "updated_at", "username", "victories" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
