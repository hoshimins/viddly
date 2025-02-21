import type { Context } from 'hono';
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
      const  id  = c.req.param('id');
      const video = await videoService.getVideoDetail(id);

      return c.json(video);
    } catch (error) {
      console.error('Error in videoController.getVideo:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  },

  // ユーザー登録
  async register(c: Context) {
    // try {
    //   // リクエストボディからデータを取得
    //   const { username, password } = await c.req.json();

    //   // 必須項目が存在するか確認
    //   if (!username || !password) {
    //     return c.json({ error: 'Username and password are required' }, 400);
    //   }

    //   // サービス層でユーザー登録を実行
    //   const result = await userService.register(username, password);

    //   // エラーが返された場合
    //   if (result.error) {
    //     return c.json({ error: result.error }, 400);
    //   }

    //   // 成功レスポンスを返す
    //   return c.json({ message: 'User registered successfully', user: result.user });
    // } catch (error) {
    //   console.error('Error in userController.register:', error);
    //   return c.json({ error: 'Internal server error' }, 500);
    // }
  },

};
