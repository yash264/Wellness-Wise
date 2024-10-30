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
    reference_ID: String,
    Health: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"health"
    }],
    Goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"goal"
    }],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"postModel"
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password if it has been modified
    console.log("Hashing password for user:", this.name);
    if (this.isModified('password')) {
        console.log("Hashing password for user:", this.email);
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
    }

    // Generate reference_ID if it hasn’t been set
    if (!this.reference_ID) {
        const uid = new ShortUniqueId({ length: 6 });
        this.reference_ID = uid.rnd();
    }

    next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
