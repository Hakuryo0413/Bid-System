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
});

export const Account = model("Account", accountSchema,"account");
export type accountModel = typeof Account;
