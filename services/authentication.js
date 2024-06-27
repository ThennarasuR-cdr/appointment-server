import User from "../models/user"

const signUp = async (user) => {
    const foundUser = await User.findOne({email:user.email});

    if(foundUser){
        console.error("User with email id "+user.email+" already exists");
        return;
    }

    await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
    });
};

export {signUp};