-- AlterTable
CREATE SEQUENCE comments_id_seq;
ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT nextval('comments_id_seq');
ALTER SEQUENCE comments_id_seq OWNED BY "comments"."id";

-- AlterTable
CREATE SEQUENCE likes_id_seq;
ALTER TABLE "likes" ALTER COLUMN "id" SET DEFAULT nextval('likes_id_seq');
ALTER SEQUENCE likes_id_seq OWNED BY "likes"."id";

-- AlterTable
CREATE SEQUENCE tags_id_seq;
ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT nextval('tags_id_seq');
ALTER SEQUENCE tags_id_seq OWNED BY "tags"."id";

-- AlterTable
CREATE SEQUENCE thumbnails_id_seq;
ALTER TABLE "thumbnails" ALTER COLUMN "id" SET DEFAULT nextval('thumbnails_id_seq');
ALTER SEQUENCE thumbnails_id_seq OWNED BY "thumbnails"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";

-- AlterTable
CREATE SEQUENCE video_tags_id_seq;
ALTER TABLE "video_tags" ALTER COLUMN "id" SET DEFAULT nextval('video_tags_id_seq');
ALTER SEQUENCE video_tags_id_seq OWNED BY "video_tags"."id";

-- AlterTable
CREATE SEQUENCE videos_id_seq;
ALTER TABLE "videos" ALTER COLUMN "id" SET DEFAULT nextval('videos_id_seq');
ALTER SEQUENCE videos_id_seq OWNED BY "videos"."id";
