
export const validateSignUpForm = (email,password,confirmPassword,name,image)=>{
    const isName = name.trim()!= '' && name.length>2;
    if(!isName) return 'Username must be more than 3 charactors'
    const isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(!isEmail) return 'Invalid email address'
    const isPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);
    if(!isPassword) return 'password must contain special charactors and numbers'
    const samePassword = isPassword && (password == confirmPassword);
    if(!samePassword) return 'Password doesnot match'
    
    const isImage = image? true : false;
    if(!isImage) return 'Please select an profile picture'
    return true;
}

export const validateSignInForm = (email,pasword)=>{
    const isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(!isEmail) return 'Invalid email address'

    const isPassword = pasword.trim() != '';
    if(!isPassword)return 'Enter a valid password'

    return true;
}


