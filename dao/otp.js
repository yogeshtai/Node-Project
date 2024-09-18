import otp from "../model/otp.js";

export default {
    create: async (obj) => {
        try {
            const result = await otp(obj).save();
            return result;
        } catch (error) {
            throw error;
        };
    },
    findOne: async (filter) => {
        try {
            const result = await otp.findOne(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    findOneUpdate: async (filter, obj) => {
        try {
            const result = await otp.findOneAndUpdate(filter, { $set: obj }, { new: true });
            return result;
        } catch (error) {
            throw error;
        };
    }
};