const {Router}=require('express');
const {createPost,editPost,deletePost,getPosts,getPost,getCatPost,getUserPosts,removeEventListener}=require('../controllers/postControllers');
const authMiddleware=require('../middleware/authMiddleware');
const router=Router();

router.post('/',authMiddleware,createPost);
router.get('/',getPosts);
router.get('/:id',getPost);
router.patch('/:id',authMiddleware,editPost);
router.get('/categories/:category',getCatPost);
router.get('/users/:id',getUserPosts);
router.patch('/:id',deletePost);

module.exports=router;