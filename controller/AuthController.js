const userModel = require("../model/User");
const bcript = require("bcryptjs");
const _ = require("underscore");
const { encode } = require("../util/jwtToken");

const registeration = async (params) => {
    // checking email is alredy present in databse
    const emailExist = await userModel.find({ email: params.email });
    if (!_.isEmpty(emailExist)) {
        throw { errorStatus: 402, errorMessage: " Email is already Exist." };
    }
    // Generate Salt
    const salt = bcript.genSaltSync(10);
    // Creating Hash Password
    const hashPassword = bcript.hashSync(params.password, salt);
    // Store Data in Collection
    const user = new userModel({
        name: params.name,
        email: params.email,
        password: hashPassword,
    });
    const saveUser = await user.save();
    return saveUser;
};

const login = async (params) => {
    // checking email is present in databse
    const user = await userModel.findOne({
        email: params.email,
    });
    if (_.isEmpty(user)) {
        throw { errorStatus: 403, errorMessage: " Email or Password is Wrong." };
    }
    // Ckecking Password
    const validatePassword = bcript.compareSync(params.password, user.password);
    if (!validatePassword) {
        throw { errorStatus: 404, errorMessage: " Password is wrong" };
    }
    // create accesstoken
    const accesstoken = encode({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
    return { _id: user._id, name: user.name, email: user.email, accesstoken };
};
module.exports = {
  registeration,
  login,
};
