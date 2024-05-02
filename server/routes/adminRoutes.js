import express from 'express';
import { adminLogin,adminLogout,userDatas,blockUser,updateUser,deleteUser } from '../controllers/adminControllers.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login',adminLogin);
router.post('/logout',adminLogout);
router.get('/dashboard',authenticateAdmin,userDatas)

router.get('/user/:userId')

router.put('/user/updateProfile',authenticateAdmin,updateUser)

router.put('/deleteUser',authenticateAdmin,deleteUser)
export default router