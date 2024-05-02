import User from "../model/userModel.js"
import asyncHandler from "express-async-handler"
import { generateAdminToken } from "../utils/generateToken.js"

 export const adminLogin = asyncHandler(async(req,res)=>{
    const{email,password} = req.body
    const isAdmin =  await User.findOne({email,isAdmin:true});
    if(isAdmin && (await isAdmin.matchPassword(password))){
        console.log('admin logged in')
        generateAdminToken(res,isAdmin._id);
        res.status(201).json({
            message:'admin loged in',
            name:isAdmin.name,
            email:isAdmin.email,
        })
    }else{
        res.status(401);
        throw new Error('Invalid credentials')
    }
   
 })

 export const adminLogout =asyncHandler( (req,res)=>{
    res.cookie('adminToken','',{
        httpOnly:true,
        expires: new Date(0)
    })

    
    res.status(200).json({message:'admin loggedout'})
 })

export const userDatas = asyncHandler(async(req,res)=>{
    const users = await User.find({isAdmin:{$ne:true}});
    console.log(users)
    res.status(200).json(users)
})

export const user = asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    console.log(userId);
    res.status(200).json({message:'user  blocked'})
})

export const blockUser= asyncHandler(async (req,res)=>{
    const  userId = req.params.userId;
    console.log(userId)
    const user = await  User.findById(userId)
    if(!user){
        throw new Error('User not found');
    }
    user.isBlocked = !(user.isBlocked);
    await user.save()
    res.status(200).json({
        message:'user blocked'
    })
})


export const updateUser = asyncHandler(async (req,res)=>{
    const {email,name,userId} = req.body;
    const user = await User.findById(userId);

    if(user){
        user.name = name ||  user.name;
        user.email = email|| user.email
        const updatedUser =  await user.save();
        const allUsers = await User.find({isAdmin:{$ne:true}})
        res.status(200).json(allUsers)
    }else{
        res.status(404);
        throw new Error('User doesnot found')
    }
    console.log(req.body)
    res.status(200).json({
        message:'user updated'
    })
})



const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    const password = req.body.password ? req.body.password : null;
    const profileImage = req.file ?'assets/'+ String(req.file.filename) : null;
    if(user){
        user.name = req.body.name ||  user.name;
        user.profileImage = profileImage ? profileImage : user.profileImage;
        user.email = user.email,
        user.password = password ? password : user.password;

        const updatedUser =  await user.save();
        
        res.status(200).json({
            message:'profile updated',
            name: updatedUser.name,
            email:updatedUser.email,
            image:updatedUser.profileImage,
            userId:updatedUser._id
        })
    }else{
        res.status(404);
        throw new Error('User doesnot found')
    }
})




export const deleteUser = async (req,res)=>{
    const{userId} = req.body
    const  user = await User.findById(userId)
    res.status(200).json(user)
}