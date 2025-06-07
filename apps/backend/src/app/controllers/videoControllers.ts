import type { Context } from 'hono';
import { UploadVideoMetaData } from "../../../../../packages/types/video";
import { videoService } from '../services/videoServices';

export const videoController = {

  // ビデオ一覧取得
  async getVideosAndThumbnails(c: Context) {
    try {
      const videos = await videoService.getVideosAndThumbnails();

      return c.json(videos);
    } catch (error) {
      console.error('Error in videoController.getVideos:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }

  },

  // ビデオ詳細取得
  async getVideoDetail(c: Context) {
    try {
      const  id  = Number(c.req.param('id'));
      const video = await videoService.getVideoDetail(id);

      return c.json(video);
    } catch (error) {
      console.error('Error in videoController.getVideo:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  },

  // ビデオアップロード
  async upload(c: Context) {
    try {
      const body = await c.req.parseBody();
      const data: UploadVideoMetaData = {
        title: typeof body.title === "string" ? body.title : "",
        description: typeof body.description === "string" ? body.description : "",
        actors: typeof body.actors === "string" ? body.actors :"",
        thumbnailData: typeof body.thumbnail === "string" ? body.thumbnail : "",
      };

      const response = await videoService.upload(data);

      return c.json(response);
    } catch (error) {
      console.error('Error in videoController.upload:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  },

};
