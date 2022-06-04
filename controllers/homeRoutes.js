const router = require("express").Router();
const { Post, Comment, User } = require("../models");


router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
          include: [
            {
              model: Comment,
              attributes: ['comment'],
            },
          ],
        });

    const comments = commentData.map((Comment) => Comment.get({ plain: true }));

    res.render('homepage', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
  
      const users = userData.map((User) => User.get({ plain: true }));
  
      res.render('homepage', { users });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: Post,
              attributes: ['id'],
            },
          ],
        });
    
        const posts = postData.get({ plain: true });
    
        res.render('post', {
          ...project,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('login');
    });

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('signup');
    });

module.exports = router;