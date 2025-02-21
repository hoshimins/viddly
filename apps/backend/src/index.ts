import { serve } from 'bun';
import app from './app/routes/index';

serve({
  port: 3000,
  async fetch(req) {
    console.log("Incoming request method:", req.method);

    // CORS ヘッダーを追加
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // OPTIONS メソッドのリクエストを処理
    if (req.method.toUpperCase() === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // レスポンスヘッダーに CORS を追加
    const response = await app.fetch(req);
    const modifiedHeaders = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      modifiedHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      headers: modifiedHeaders,
    });
  },
});
