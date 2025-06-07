import type { Context } from 'hono';

export const userController = {
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

  // ログイン
  async login(c: Context) {
    // try {
    //   const { username, password } = await c.req.json();

    //   if (!username || !password) {
    //     return c.json({ error: 'Username and password are required' }, 400);
    //   }

    //   const result = await userService.login(username, password);

    //   if (result.error) {
    //     return c.json({ error: result.error }, 401);
    //   }

    //   return c.json({ message: 'Login successful', token: result.token });
    // } catch (error) {
    //   console.error('Error in userController.login:', error);
    //   return c.json({ error: 'Internal server error' }, 500);
    // }
  },
};
