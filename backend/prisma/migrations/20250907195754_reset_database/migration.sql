-- CreateEnum
CREATE TYPE "public"."MovieLanguage" AS ENUM ('PORTUGUESE', 'NORWEGIAN', 'JAPANESE', 'ITALIAN', 'TURKISH', 'CHINESE', 'RUSSIAN', 'ENGLISH', 'SWEDISH', 'SPANISH', 'FRENCH', 'GERMAN', 'HEBREW', 'KOREAN', 'DANISH', 'POLISH', 'ARABIC', 'DUTCH', 'GREEK', 'HINDI');

-- CreateEnum
CREATE TYPE "public"."MovieStatus" AS ENUM ('POST_PRODUCTION', 'IN_PRODUCTION', 'RELEASED', 'CANCELED', 'PLANNED', 'RUMORED');

-- CreateEnum
CREATE TYPE "public"."MovieGenre" AS ENUM ('SCIENCE_FICTION', 'DOCUMENTARY', 'ADVENTURE', 'ANIMATION', 'THRILLER', 'BIOGRAPHY', 'WESTERN', 'MYSTERY', 'FANTASY', 'ROMANCE', 'HISTORY', 'HORROR', 'FAMILY', 'COMEDY', 'ACTION', 'CRIME', 'MUSIC', 'DRAMA', 'SPORT', 'WAR');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

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
    "budget" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "profit" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "language" "public"."MovieLanguage" NOT NULL,
    "status" "public"."MovieStatus" NOT NULL,
    "genres" "public"."MovieGenre" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "public"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_id_key" ON "public"."refresh_tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "public"."refresh_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_refresh_token_key" ON "public"."refresh_tokens"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "public"."movies"("id");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movies" ADD CONSTRAINT "movies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
