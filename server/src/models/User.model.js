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
    Analysis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"analysis"
    }],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"postModel"
    }],
    pic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password if it has been modified
    if (this.isModified('password')) {
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
