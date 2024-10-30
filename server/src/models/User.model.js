const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");

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
    },
    reference_ID: String
});

userSchema.pre('save', async function (next) {
    // Hash the password if it has been modified
    console.log("Hashing password for user:", this.name);
    if (this.isModified('password')) {
        console.log("Hashing password for user:", this.email);
        this.password = await bcrypt.hash(this.password, 10);
    }

    // Generate reference_ID if it hasn’t been set
    if (!this.reference_ID) {
        const uid = new ShortUniqueId({ length: 6 });
        this.reference_ID = uid();
    }

    next();
});

userSchema.methods.isMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
