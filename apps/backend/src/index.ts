import { serve } from "@hono/node-server";
import app from "./app/routes/index";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const wrappedApp = {
  async fetch(req: Request) {
    console.log("Incoming request method:", req.method);

    if (req.method.toUpperCase() === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

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
};

// Node 環境で起動
serve({
  fetch: wrappedApp.fetch,
  port: 3001,
});
