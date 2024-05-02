import jwt from 'jsonwebtoken';

export const generateToken = (res,userId)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1hr'
    })

    res.cookie('userToken',token,{
        httpOnly:true,
        secure: false,
        sameSite:'strict',
        maxAge: 1 * 60 * 60 * 1000
    })
    return token;
}

export const generateAdminToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

    res.cookie('adminToken',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:1*60*60*1000
    })
}



