import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    type: {
        required: true,
        type: String
    },

    offer: {
        required: true,
        type: String
    },

    heating: {
        type: String
    },

    year: {
        type: String
    },

    parking: {
        type: String
    },

    location: {
        required: true,
        type: String
    },

    region: {
        required: true,
        type: String
    },

    price: {
        required: true,
        type: String,
    },

    text: {
        required: true,
        type: String,
    },

    img: {
        type: [String]
    },

    bedroom: {
        type: String
    },

    bathroom: {
        type: String
    },

    area: {
        required: true,
        type: String
    },

    pool: {
        type: Boolean
    },

    balcony: {
        type: Boolean
    },

    agent: {
        type: String
    }
});

export default mongoose.model("house", HouseSchema);