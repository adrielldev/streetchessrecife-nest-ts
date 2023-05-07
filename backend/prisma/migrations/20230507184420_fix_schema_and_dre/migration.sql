/*
  Warnings:

  - You are about to drop the column `ganhador` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `derrotas` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `empates` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `vitorias` on the `Player` table. All the data in the column will be lost.
  - Added the required column `rating_loser` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_winner` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_of_game` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_game" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winner" TEXT NOT NULL,
    "type_of_game" TEXT NOT NULL,
    "rating_winner" INTEGER NOT NULL,
    "rating_loser" INTEGER NOT NULL,
    "white_player_id" INTEGER NOT NULL,
    "black_player_id" INTEGER NOT NULL,
    CONSTRAINT "Game_white_player_id_fkey" FOREIGN KEY ("white_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_black_player_id_fkey" FOREIGN KEY ("black_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("black_player_id", "date_game", "id", "white_player_id") SELECT "black_player_id", "date_game", "id", "white_player_id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_blitz" INTEGER NOT NULL DEFAULT 1500,
    "rating_rapid" INTEGER NOT NULL DEFAULT 1500,
    "victories" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("created_at", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username") SELECT "created_at", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
