import service from "./service.js";
import pkg from 'http-status';
import { sendSuccessResponse } from "../../utils/response.js";
import { jsonToken } from "../../middleware/jsonToken.js";
const { CREATED, OK } = pkg;

export default {
    checkExistence: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await service.checkExistence(data);
            if (result) {
                sendSuccessResponse(res, OK, "Verification code send successfully", result);
            };
        } catch (error) {
            next(error);
        };
    },

    verifyOtp: async (req, res, next) => {
        try {
            const data = req.body;
            data.otpId = req?.user?._id;
            const result = await service.verifyOtp(data);
            sendSuccessResponse(res, OK, "Verification code verify successfully", result);
        } catch (error) {
            next(error);
        };
    },

    signUp: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await service.signUp(data);
            if (result) {
                const token = await jsonToken(result);
                sendSuccessResponse(res, CREATED, "User signup successfully", token);
            };
        } catch (error) {
            next(error);
        };
    },

    signIn: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await service.signIn(data);
            sendSuccessResponse(res, OK, "User signIn successfully", result)
        } catch (error) {
            next(error);
        };
    },

    forgotPassword: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await service.forgotPassword(data);
            sendSuccessResponse(res, OK, "Verification code send successfully", result);
        } catch (error) {
            next(error);
        };
    },

    updatePassword: async (req, res, next) => {
        try {
            const data = req.body;
            data.userId = req?.user?._id;
            const result = await service.updatePassword(data);
            sendSuccessResponse(res, OK, "Password update successfully", null);
        } catch (error) {
            next(error);
        };
    },

    me: async (req, res, next) => {
        try {
            const result = await service.me(req?.user?._id);
            await sendSuccessResponse(res, OK, "Profile fetch successfully", result);
        } catch (error) {
            next(error);
        };
    },

    changePassword: async (req, res, next) => {
        try {
            const data = req.body;
            data.userId = req?.user?._id;
            await service.changePassword(data);
            await sendSuccessResponse(res, OK, "Password update successfully", null);
        } catch (error) {
            next(error);
        };
    },

    logout: async (req, res, next) => {
        try {
            const result = await service.logout(req?.user?._id, req.body);
            await sendSuccessResponse(res, 200, "Logout successfully", null);
        } catch (error) {
            next(error);
        };
    },
};