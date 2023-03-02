import dotenv from 'dotenv';
dotenv.config();

import { verifyToken, catchError } from '../middleware/authJwt.js';

import {
  addComment,
  getComments,
  deleteComment,
} from '../controllers/comment.controller.js';

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Access'
    );
    next();
  });

  app.post('/api/comments', [verifyToken], addComment);
  app.get('/api/comments/:post_id', getComments);
  app.delete('/api/comments/:id', [verifyToken], deleteComment);
}
