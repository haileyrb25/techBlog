const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        
        const postData = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        })
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.get("/new", withAuth, (req, res) => {
  try {
        
    const postData = await Post.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = postData.get({ plain: true });

    res.render('new-posts', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (res, req) => {
    // To be able to find posts by primary key and render the edit post on the dashboard
})

module.exports = router;