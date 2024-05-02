import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';
import {generateToken} from '../utils/generateToken.js';



const existingUser = asyncHandler(async(req,res,next)=>{
    console.log('checking for user')
    //! email is not accesssible from the body and hence the validation are not executing.
    const{email} = req.body;
  
    const userExists = await User.findOne({email});
    console.log(userExists)
    if(userExists){
        console.log('error from existing user')
        res.status(400);
        throw new Error('User already exists')
    }
    next()
})


//@desc Auth user set token
//@route POST/api/users/auth
//@access public
const loginUser = asyncHandler( async (req,res)=>{
    const{email,password} = req.body;
    const userExists = await User.findOne({email})

    if(userExists && (await userExists.matchPassword(password))){
        generateToken(res,userExists._id);
        
        res.status(201).json({
            userId:userExists._id,
            email:userExists.email,
            name:userExists.name,
            image:userExists.profileImage
        })
    }else{
        res.status(401);
        throw new Error('Invalid credentials')
    }
});


//@desc register user
//@route POST/api/users
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.file)
    const profileImage ='assets/'+ String(req.file.filename)
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }
    
    const newUser = await User.create({
        message:'user registered',
        name,
        email,
        password,
        profileImage
    });
    if(newUser){
        const token =  generateToken(res,newUser._id);
        console.log(token)
        res.status(201).json({
            message:'user created',
            uid: newUser._id,
            name: newUser.name,
            email:newUser.email,
            image:profileImage
        })
    }else{
        res.status(400);
        throw new Error('Cannot register now')
    }
})

//@desc logout user
//@route POST /api/logout
//@access Public
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('userToken','',{
        httpOnly:true,
        expires: new Date(0)
    })

    
    res.status(200).json({message:'user loggedout'})
})

//@desc get user profile
//@route GET api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res)=>{
    console.log(req.user);
    const user = {
        userId:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
})

//@desc update users profile
//@route PUT api/users/profile
//@access Private
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


export {loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile,existingUser}