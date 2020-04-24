import express from 'express';
var router = express.Router();

import UserController from './controller/UserController';
import TweetController from './controller/TweetController';

router.post('/signUp', UserController.signUp);
router.post('/signIn', [UserController.signIn]);

router.get('/profile/:userId', [UserController.profile]);
//router.post('/home', [HomeController.home]);

router.post('/tweet', TweetController.newTweet);
router.post('/retweet', TweetController.retweet);

module.exports = router;