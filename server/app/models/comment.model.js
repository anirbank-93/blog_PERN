const commentModel = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Comment;
};

export default commentModel;
