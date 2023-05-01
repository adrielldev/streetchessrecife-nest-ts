-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_blitz" INTEGER NOT NULL DEFAULT 1500,
    "rating_rapid" INTEGER NOT NULL DEFAULT 1500,
    "vitorias" INTEGER NOT NULL,
    "empates" INTEGER NOT NULL,
    "derrotas" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("created_at", "derrotas", "empates", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username", "vitorias") SELECT "created_at", "derrotas", "empates", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username", "vitorias" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
