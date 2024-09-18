import otp from "../../dao/otp.js";
import user from "../../dao/user.js";
import { jsonToken } from "../../middleware/jsonToken.js";
import { ApiError } from "../../utils/apiError.js";
import bcrypt from 'bcrypt'

export default{
    signUp :async(data) => {
      try {
        let result = await user.create(data);
        return result;
      } catch (error) {
         throw error
      }
    },
    signIn : async(data) => {
            try {
                var userData = {};
                if (/\S+@\S+\.\S+/.test(data?.email)) {
                    userData.email = data?.email
                } else {
                    userData.userName = data?.email
                };
                const validUser = await user.findOne(userData);
                if (!validUser || !(await validUser.isPasswordMatch(data?.password))) {
                    throw new ApiError(400, "Invalid credentials", "Invalid credentials");
                };
                return await jsonToken(validUser);
            } catch (error) {
                throw error;
            };
    },
    forgotPassword: async (data) => {
        try {
            const result = await user.findOne({ email: data?.email });
            if (!result) {
                throw new ApiError(404, "Email not found", "Email not exist");
            };
            const otps = 123456;  //generateOTP(); This is for temporary purpose, change it later.
            const updatedOtp = await otp.findOneUpdate({ email: data?.email }, { otp: otps });
            // var emailRequest = { template: CONSTANTS.USERS.FORGOTPASSWORD, to: result?.email, firstName: result?.firstName, otp: otps };
            // mailer.mailSend(emailRequest);
            return await jsonToken(updatedOtp);
        } catch (error) {
            throw error;
        };
    },

    verifyOtp: async (data) => {
        try {
            const result = await otp.findOne({ _id: data?.otpId });
            if (!result || !(await result.isOTPMatch(data?.otp))) {
                throw new ApiError(400, "Invalid verification code", null);
            };
            const User = await user.findOne({ email: result?.email });
            return await jsonToken(User);
        } catch (error) {
            throw error;
        };
    },

    updatePassword: async (data) => {
        try {
            const User = await user.findOne({ _id: data?.userId });
            if (await User.isPasswordMatch(data?.password)) {
                throw new ApiError(400, "This is your old password, please try new", "Old password is same");
            };
            const password = await bcrypt.hash(data?.password, 10);
            return await user.updateOne({ _id: data?.userId }, { password: password });
        } catch (error) {
            throw error;
        };
    },

    me: async (userId) => {
        try {
            var result = {};
            const results = await user.findOne({ _id: userId })
            result = { ...results?._doc };
            return result;
        } catch (error) {
            throw error;
        };
    },
    changePassword: async (data) => {
        try {
            let result = await user.findOne({ _id: data?.userId });
            if (!result) {
                throw new ApiError(404, "User does not exist", "User not found");
            };
            if (!(await result.isPasswordMatch(data?.oldPassword))) {
                throw new ApiError(400, "Current password is wrong", "Wrong Current password");
            };
            if (await result.isPasswordMatch(data?.newPassword)) {
                throw new ApiError(400, "You cannot keep your Current password as new password, Please change new password", "Same Current password");
            };
            let hashedPassword = await bcrypt.hash(data?.newPassword, 10);
            await user.updateOne({ _id: data?.userId, }, { password: hashedPassword });
            return result;
        } catch (error) {
            throw error;
        };
    },

    logout: async (userId, updateBody) => {
        try {
            let result = await user.findOne({ _id: userId });
            if (!result) {
                throw new ApiError(404, "User not found", "User not found");
            };
            Object.assign(result, updateBody);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        };
    },
}