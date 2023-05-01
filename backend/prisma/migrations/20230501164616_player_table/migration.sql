-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating_blitz" INTEGER NOT NULL DEFAULT 1500,
    "rating_rapid" INTEGER NOT NULL DEFAULT 1500,
    "vitorias" INTEGER NOT NULL,
    "empates" INTEGER NOT NULL,
    "derrotas" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
