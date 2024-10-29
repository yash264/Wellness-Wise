const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hashSync(this.password, 10)
    next();
})

userSchema.methods.isMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel; 