import { UploadVideoMetaData } from "../../../../../packages/types/video";
import db from '@infra/db';


export const videoService = {
  async getVideosAndThumbnails() {
    // prisma によるデータベースアクセス
    const videosAndThumbnails = await prisma.videos.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        uploader: true,
        createdAt: true,
        updatedAt: true,
        thumbnail: {
          select: {
            url: true,
          },
        },
      },
    });


    if (!videosAndThumbnails) {
      throw new Error("No videos found");
    }

    return videosAndThumbnails;
  },

  async getVideoDetail(id: number) {
    // prisma によるデータベースアクセス
    const videoDetail = await prisma.videos.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        uploader: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!videoDetail) {
      throw new Error("No video found");
    }

    return videoDetail;
  },

  async upload(data: UploadVideoMetaData) {
    try {
      const videoUrl = "";


      const uploader = 1;
      if (!uploader) {
        throw new Error("Uploader not found");
      }

      // 動画情報を登録
      const newVideo = await prisma.videos.create({
        data: {
          title: data.title,
          description: data.description,
          url: videoUrl,
          uploader: uploader,
        },
      });

      // サムネイルを登録
      if (data.thumbnailData) {
      const thumbnailUrl = `${data.actors}/${data.thumbnailData}`;

        const newThumbnail = await prisma.thumbnails.create({
          data: {
            url: thumbnailUrl,
            video: {
              connect: {
                id: newVideo.id,
              },
            }
          },
        });
      }

    } catch (error) {
      console.error('Error in videoService.upload:', error);
      return { error: 'Internal server error' };
    }

    return { message: 'Video uploaded successfully' };
  },
};
