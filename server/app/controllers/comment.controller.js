import { Validator } from 'node-input-validator';

import db from '../models/index.js';

const CommentModel = db.comment;
const UserModel = db.user;

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

export const getComments = async (req, res) => {
  var post_id = req.params.post_id;

  try {
    let data = await CommentModel.findAll({
      where: { postId: post_id },
      include: [UserModel],
    });

    if (data.length > 0) {
      res
        .status(200)
        .json({ status: true, message: 'Data successfully get', data: data });
    } else {
      res.status(404).json({ status: false, message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  var id = req.params.id;

  try {
    await CommentModel.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ status: true, message: 'Data deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
