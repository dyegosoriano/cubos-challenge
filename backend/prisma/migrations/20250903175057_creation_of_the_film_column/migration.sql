-- CreateEnum
CREATE TYPE "public"."MovieLanguage" AS ENUM ('PORTUGUESE', 'NORWEGIAN', 'JAPANESE', 'ITALIAN', 'TURKISH', 'CHINESE', 'RUSSIAN', 'ENGLISH', 'SWEDISH', 'SPANISH', 'FRENCH', 'GERMAN', 'HEBREW', 'KOREAN', 'DANISH', 'POLISH', 'ARABIC', 'DUTCH', 'GREEK', 'HINDI');

-- CreateEnum
CREATE TYPE "public"."MovieStatus" AS ENUM ('POST_PRODUCTION', 'IN_PRODUCTION', 'RELEASED', 'CANCELED', 'PLANNED', 'RUMORED');

-- CreateEnum
CREATE TYPE "public"."MovieGenre" AS ENUM ('SCIENCE_FICTION', 'DOCUMENTARY', 'ADVENTURE', 'ANIMATION', 'THRILLER', 'BIOGRAPHY', 'WESTERN', 'MYSTERY', 'FANTASY', 'ROMANCE', 'HISTORY', 'HORROR', 'FAMILY', 'COMEDY', 'ACTION', 'CRIME', 'MUSIC', 'DRAMA', 'SPORT', 'WAR');

-- CreateTable
CREATE TABLE "public"."movies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "owner_id" TEXT NOT NULL,
    "background" TEXT,
    "trailer" TEXT,
    "cover" TEXT,
    "release" TIMESTAMP(3) NOT NULL,
    "popularity" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "budget" DECIMAL(65,30),
    "revenue" DECIMAL(65,30),
    "profit" DECIMAL(65,30),
    "language" "public"."MovieLanguage"[],
    "genres" "public"."MovieGenre"[],
    "status" "public"."MovieStatus" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "public"."movies"("id");

-- AddForeignKey
ALTER TABLE "public"."movies" ADD CONSTRAINT "movies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
