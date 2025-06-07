import { Hono } from 'hono';
import { videoController } from '../controllers/videoControllers';
const videos  = new Hono();

videos.get('/', async (c) => {
    const response = await videoController.getVideosAndThumbnails(c);
    return response;
});

videos.get('/:id', async (c) => {
    const response = await videoController.getVideoDetail(c);
    return response;
});


videos.post('/upload', async (c) => {
    const response = await videoController.upload(c);
    return response;
});


export default videos;