import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    code: {
        type: String,
        unique: [true],
    },
    senderName: {
        type: String,
        require: [true,"please enter sender name"]
    },
    senderCountry: {
        type: String,
        require: [true,"please enter sender country"]
    },
    senderCity: {
        type: String,
        require: [true,"please enter sender city"]
    },
    senderDistrict: {
        type: String,
        require: [true,"please enter sender district"]
    },

    senderVillage: {
        type: String,
        require: [true,"please enter sender villages"]
    },
    senderHouseNumber: {
        type: String,
        require: [true,"please enter sender house number"]
    },
    senderPhone: {
        type: String,
        require: [true,"please enter sender phone"]
    },
    receiverName: {
        type: String,
        require: [true,"please enter receiver name"]
    },
    receiverCountry: {
        type: String,
        require: [true,"please enter receiver country"]
    },
    receiverDistrict: {
        type: String,
        require: [true,"please enter receiver district"]
    },
    receiverVillage: {
        type: String,
        require: [true,"please enter village"]
    },
    receiverHouseNumber: {
        type: String,
        require: [true,"please enter receiver house number"]
    },
    receiverCity: {
        type: String,
        require: [true,"please enter receiver city"]
    },
    receiverPhone: {
        type: String,
        require: [true,"please enter receiver phone"]
    },
    type: {
        type: Boolean,
        require: [true,"please enter type"]
    },
    specialService: {
        type: Array,
    },
    cannotDelivered: {
        type: String,
        require: [true,"please enter guides"]
    },
    items: {
        type: Array,
        require: [true,"please enter items"]
    },
    estimatedTime: {
        type: Number
    },
    mainFee: {
        type: Number
    },
    additionalFee: {
        type: Number
    },
    GTGTFee: {
        type: Number
    },
    VAT: {
        type: Number
    },
    otherFee: {
        type: Number
    },
    sumFee: {
        type: Number
    },
    COD: {
        type: Number,
    },
    other: {
        type: Number
    },
    sum: {
        type: Number
    },
    weight: {
        type: Number,
        require: [true,"please enter total weight"]
    },
    cost: {
        type: Number
    },
    note: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    sended_at: {
        type: Date
    },
    status: {
        type: Array,
        require: [true,"please enter status"]
    }

})

export const Order = model("Order", orderSchema, "orders")
export type OrderModel = typeof Order;