import express from 'express';
import { loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile,existingUser } from '../controllers/userControllers.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import multer from 'multer'


const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      console.log('file from multer',file)
      cb(null, "./server/assets");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'.png');
    },
  });

const upload = multer({ storage: storage });

const router = express.Router();

router.use('/register',existingUser)

router.post('/login',loginUser);
router.post('/register',existingUser,upload.single('image'),registerUser)
router.post('/logout',logoutUser)

router.route('/profile')
    .get(authenticateUser,getUserProfile)
    .put(authenticateUser,upload.single('image'),updateUserProfile)


export default router; 