import user from "../model/user.js";

export default {
    create: async (obj) => {
        try {
            const result = await user(obj).save();
            return result;
        } catch (error) {
            throw error;
        };
    },
    findOne: async (filter) => {
        try {
            const result = await user.findOne(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    updateOne: async (filter, obj) => {
        try {
            const result = await user.findOneAndUpdate(filter, { $set: obj }, { new: true, projection: '-password -role -otp -status -id' });
            return result;
        } catch (error) {
            throw error;
        };
    },
    getOne: async (filter) => {
        try {
            const result = await user.findOne(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    deleteOne: async (filter) => {
        try {
            const result = await user.findOneAndDelete(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    // pagination: async (filter, options) => {
    //     try {
    //         const result = await user.paginate(filter, options);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     };
    // },
    findAll: async (filter) => {
        try {
            const result = await user.find(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    aggregate: async (filter) => {
        try {
            const result = await user.aggregate(filter);
            return result;
        } catch (error) {
            throw error;
        };
    },
    findById: async (userId) => {
        try {
            const result = await user.findById(userId);
            // if (!result) {
            //     throw new ApiError(404, "User not found", "User does not exist");
            // };
            return result;
        } catch (error) {
            throw error;
        };
    }
};