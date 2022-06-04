const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Comment.belongTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});


module.exports = {
    User,
    Comment,
    Post
};