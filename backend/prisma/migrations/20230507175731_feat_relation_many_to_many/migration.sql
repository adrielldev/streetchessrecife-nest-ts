/*
  Warnings:

  - You are about to drop the `_GameToPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `jogador_brancas` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `jogador_negras` on the `Game` table. All the data in the column will be lost.
  - Added the required column `black_player_id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `white_player_id` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_GameToPlayer_B_index";

-- DropIndex
DROP INDEX "_GameToPlayer_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameToPlayer";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_game" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ganhador" TEXT NOT NULL,
    "white_player_id" INTEGER NOT NULL,
    "black_player_id" INTEGER NOT NULL,
    CONSTRAINT "Game_white_player_id_fkey" FOREIGN KEY ("white_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_black_player_id_fkey" FOREIGN KEY ("black_player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("date_game", "ganhador", "id") SELECT "date_game", "ganhador", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
