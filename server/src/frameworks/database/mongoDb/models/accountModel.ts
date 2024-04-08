import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  cccd: {
    type: String,
  },
  bank: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  bankOwner: {
    type: String,
  },
  state:{
    type: Boolean,
  }
});

export const Account = model("Account", accountSchema,"account");
export type accountModel = typeof Account;
