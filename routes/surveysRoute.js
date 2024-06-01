// const express = require('express');
// const managersRouter = express.Router();
// const managerController = require('../controllers/surveysController');


// router.get('/', async (req, res) => {
//     try {
//         const result = await postsDataBase.getAllPosts();
//         if (result.hasError) {
//             res.status(404).send('Error');
//         }
//         else {
//             res.status(200).send(['success get all posts', result]);
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     try {
//         const result = await postsDataBase.getPostById(postId);
//         if (result.hasError) {
//             res.status(404).send('Error');
//         }
//         else {
//             res.status(200).send(result);
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }

// });

// router.post('/', async (req, res) => {
//     const newPost = req.body;
//     try {
//         const result = await postsDataBase.addPost(newPost);
//         if (result.insertId > 0) {
//             const insertPost = await postsDataBase.getPostById(result.insertId);
//             res.status(200).send(insertPost.data);
//         } else {
//             res.status(404).send('Error adding post');
//         }
//     } catch (error) {
//         console.error('Error adding post:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.put('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     const updatedPostData = req.body;
//     try {
//         const result = await postsDataBase.updatePost(postId, updatedPostData);
//         if (result.affectedRows > 0) {
//             res.status(200).send(`Post with ID ${postId} updated successfully`);
//         } else {
//             res.status(404).send(`Post with ID ${postId} not found`);
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });


// router.delete('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     try {
//         const result = await postsDataBase.deletePost(postId);
//         if (result.affectedRows > 0) {
//             res.status(200).send(`Post with ID ${postId} deleted successfully`);
//         } else {
//             res.status(404).send(`Post with ID ${postId} not found`);
//         }
//     } catch (error) {
//         console.error('Error deleting post:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;


// routes/surveysRouter.js

const express = require('express');
const surveysRouter = express.Router();
const surveysController = require('../controllers/surveysController'); // עדכן את הנתיב לפי המבנה של הפרויקט שלך

surveysRouter.get('/', surveysController.getAllSurveys);
surveysRouter.get('/:surveyId', surveysController.getSurveyById);
surveysRouter.post('/', surveysController.addSurvey);
surveysRouter.put('/:surveyId', surveysController.updateSurvey);
surveysRouter.delete('/:surveyId', surveysController.deleteSurvey);

module.exports = surveysRouter;
