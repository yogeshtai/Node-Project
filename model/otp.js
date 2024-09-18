import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: { type: String, lowercase: true, default: null },
    otp: { type: Number, default: null },
}, { timestamps: true });

otpSchema.methods.isOTPMatch = async function (otp) {
    const user = this;
    return otp === user.otp;
};

const otp = mongoose.model("otp", otpSchema);

export default otp;
