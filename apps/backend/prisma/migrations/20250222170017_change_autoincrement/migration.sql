-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "comments_id_seq";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "likes_id_seq";

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "tags_id_seq";

-- AlterTable
ALTER TABLE "thumbnails" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "thumbnails_id_seq";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "video_tags" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "video_tags_id_seq";

-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "videos_id_seq";
