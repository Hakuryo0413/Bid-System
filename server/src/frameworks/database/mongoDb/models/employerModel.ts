import { Schema, model } from "mongoose";

const employerSchema = new Schema({
    name: {
        type:String,
        require: [true,"please enter name"]
    },
    username: {
        type: String,
        require: [true, "please enter username"]
    },
    password: {
        type: String,
        require: [true, "please provide password"]
    },
    role: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: [true, "please add phone number"]
    },
    transaction: {
        type: String,
        require: false
    },
    consolidation: {
        type: String,
        require: false
    }
})

export const Employer = model("Employer", employerSchema, "employers")
export type EmployerModel = typeof Employer;