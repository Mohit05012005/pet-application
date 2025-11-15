const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    PetName: {
        type: String,
        required: [true, "Pet name is required"],
        trim: true
    },
    OwnerName: {
        type: String,
        required: [true, "Owner name is required"],
        trim: true
    },
    Species: {
        type: String,
        required: [true, "Species is required"],
        trim: true
    },
    PetAge: {
        type: Number,
        required: true
    },
    Licence: {
        type: String,
        required: false
    },
    PetImg: {
        type: String,
        required: [true, "Pet image is required"]
    },
    Address: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    mailAddress: {
        type: String,
        required: true
    },
    petDescription: {
        type: String,
        required: true
    }
});

const pet_model = mongoose.model('pets_new', petSchema);

module.exports = pet_model;
