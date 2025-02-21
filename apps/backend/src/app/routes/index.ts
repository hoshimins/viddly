import { Hono } from 'hono';
import users from './users';
import videos from './videos';

const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok' }));
app.route('/users', users);
app.route('/videos', videos);



export default app;
