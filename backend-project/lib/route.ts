import { NextResponse } from "../";
import { connectDB } from "../lib/mongodb";
import { User } from "../lib/requisitos";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectDB();
  
  const { nome, email, CPF, senha } = await req.json();
  
  // Verificar se email já existe
  const existente = await User.findOne({ email });
  if (existente) {
    return NextResponse.json({ erro: "Email já cadastrado" }, { status: 400 });
  }
  
  // Criptografar a senha antes de salvar
  const senhaHash = await bcrypt.hash(senha, 10);
  
  const novoUsuario = await User.create({ nome, email, CPF, senha: senhaHash });
  
  return NextResponse.json({ message: "Usuário cadastrado!", usuario: novoUsuario });
}
