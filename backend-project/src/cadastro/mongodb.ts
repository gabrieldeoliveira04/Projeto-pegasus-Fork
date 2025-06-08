import mongoose from "mongoose";

const CADASTRO = process.env.MONGO_URI || "mongodb+srv://felipeca1268:felps1268@dbshop.scyb95h.mongodb.net/pegasus-shop?retryWrites=true&w=majority&appName=dbShop";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  await mongoose.connect(CADASTRO);
  console.log("🔥 MongoDB conectado!");
}
