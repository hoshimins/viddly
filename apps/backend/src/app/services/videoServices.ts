import prisma from './../../db';

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

  async getVideoDetail(id: string) {
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

  async register(username: string, password: string) {

    // const newUser = await prisma.users.create({
    //   data: {
    //     username,
    //     password,
    //   },
    // });

    return { user: "" };
  },

};
