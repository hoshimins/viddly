import { Hono } from 'hono';

const user  = new Hono();

user.get('/', (c) => {
    return c.text('Hello Hono!');
});

user.post('/register', async (c) => {
    return c.json({ user: { id: 1, username: 'username' } });
});


user.post('/login', async (c) => {
    return c.json({ user: { id: 1, username: 'username' } });
});


export default user;