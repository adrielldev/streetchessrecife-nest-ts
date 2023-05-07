/*
  Warnings:

  - Added the required column `ganhador` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jogador_brancas` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jogador_negras` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_game" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ganhador" TEXT NOT NULL,
    "jogador_brancas" TEXT NOT NULL,
    "jogador_negras" TEXT NOT NULL
);
INSERT INTO "new_Game" ("date_game", "id") SELECT "date_game", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
