const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

const {getAllArticles,
       getArticle,
       createArticle,
       updateArticle,
       deleteArticle} = require('../controllers/articleController')


router.route('/').get(getAllArticles).post(authenticateToken,createArticle);
router.route('/:id').get(getArticle).patch(authenticateToken, updateArticle ).delete(authenticateToken,deleteArticle)


module.exports = router