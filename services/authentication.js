import User from "../models/user.js"

const signUp = async (user) => {
    await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
    });
};

const userExists = async (email) => {
    const foundUser = await User.findOne({email:email});

    return !!foundUser;
}

export {signUp, userExists};