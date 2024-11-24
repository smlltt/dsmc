/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "tmdbId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Movie_id_seq";
