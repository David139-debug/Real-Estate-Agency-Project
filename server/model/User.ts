import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        minLenght: 5
    },

    lastname: {
        type: String,
        minLenght: 5
    },

    phone: {
        type: String,
        minLenght: 8
    },

    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        minLenght: 6
    },

    role: {
        type: String,
        enum: ["owner", "agent", "user"]
    }
});

export default mongoose.model("user", UserSchema);