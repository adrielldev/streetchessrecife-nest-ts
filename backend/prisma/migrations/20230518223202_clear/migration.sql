/*
  Warnings:

  - You are about to drop the column `rating_loser` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rating_winner` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `Game` table. All the data in the column will be lost.
  - Added the required column `rating_black_player` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_white_player` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_game" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,
    "type_of_game" TEXT NOT NULL,
    "rating_white_player" INTEGER NOT NULL,
    "rating_black_player" INTEGER NOT NULL,
    "white_player_id" INTEGER NOT NULL,
    "black_player_id" INTEGER NOT NULL,
    CONSTRAINT "Game_white_player_id_fkey" FOREIGN KEY ("white_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_black_player_id_fkey" FOREIGN KEY ("black_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("black_player_id", "date_game", "id", "type_of_game", "white_player_id") SELECT "black_player_id", "date_game", "id", "type_of_game", "white_player_id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
