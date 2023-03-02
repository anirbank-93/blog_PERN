import { Validator } from 'node-input-validator';

import db from '../models/index.js';

const CommentModel = db.comment;

export const addComment = async (req, res) => {
  const V = new Validator(req.body, {
    comment: 'required',
  });

  let matched = await V.check().then((val) => val);

  if (!matched) {
    return res.status(400).json({ status: false, errors: V.errors });
  }

  try {
    await CommentModel.create(req.body);

    res.status(201).send({ message: 'Comment added successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
