import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello, Viddly backend'));

export default app;
