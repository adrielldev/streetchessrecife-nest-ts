-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_blitz" INTEGER DEFAULT 1500,
    "rating_rapid" INTEGER DEFAULT 1500,
    "vitorias" INTEGER DEFAULT 0,
    "empates" INTEGER DEFAULT 0,
    "derrotas" INTEGER DEFAULT 0,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Player" ("created_at", "derrotas", "empates", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username", "vitorias") SELECT "created_at", "derrotas", "empates", "id", "name", "rating_blitz", "rating_rapid", "updated_at", "username", "vitorias" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
