import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  CPF: { type: String, required: true },
  senha: { type: String, required: true }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
