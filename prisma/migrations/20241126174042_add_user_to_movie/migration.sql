/*
  Warnings:

  - You are about to drop the column `aga` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `samuel` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `zachariasz` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `tmdbId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "WantToSeeEnum" AS ENUM ('NOT_INTERESTED', 'MAYBE', 'DEFINITELY');

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- AlterTable
CREATE SEQUENCE movie_id_seq;
ALTER TABLE "Movie" DROP COLUMN "aga",
DROP COLUMN "samuel",
DROP COLUMN "zachariasz",
ADD COLUMN     "tmdbId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('movie_id_seq'),
ALTER COLUMN "userId" SET NOT NULL;
ALTER SEQUENCE movie_id_seq OWNED BY "Movie"."id";

-- DropEnum
DROP TYPE "YesMaybeNo";

-- CreateTable
CREATE TABLE "MovieReaction" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "wantToSee" "WantToSeeEnum" NOT NULL,

    CONSTRAINT "MovieReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieReaction" ADD CONSTRAINT "MovieReaction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieReaction" ADD CONSTRAINT "MovieReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
