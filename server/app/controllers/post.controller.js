import { Validator } from 'node-input-validator';

import db from '../models/index.js';

const Post = db.post;

export const createPost = async (req, res) => {
  // console.log(req.body, 'body');
  const V = new Validator(req.body, {
    userId: 'required',
    username: 'required',
    title: 'required',
    description: 'required',
    category: 'required',
    image: 'required',
  });
  let matched = await V.check().then((val) => val);

  if (!matched) {
    return res.status(400).send({ status: false, errors: V.errors });
  }

  let saveData = {
    userId: req.body.userId,
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  };

  try {
    await Post.create(saveData);

    res.status(200).send({ message: 'Post created successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let posts = await Post.findAll();

    // console.log(posts.every((post) => post instanceof Post));
    res
      .status(200)
      .json({ status: true, message: 'Data successfully get', data: posts });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
