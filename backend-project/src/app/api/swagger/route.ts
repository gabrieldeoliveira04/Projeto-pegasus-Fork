import { NextResponse } from 'next/server';
import { connectDB } from "../../../cadastro/mongodb";
import { User } from "../../../cadastro/requisitos";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { nome, email, CPF, senha } = await req.json();

    if (!nome || !email || !CPF || !senha) {
      return NextResponse.json({ erro: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const existente = await User.findOne({ email });
    if (existente) {
      return NextResponse.json({ erro: "Email já cadastrado" }, { status: 400 });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, CPF, senha: senhaHash });

    return NextResponse.json({ message: "Usuário cadastrado!", usuario: novoUsuario });
  } catch (err) {
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 });
  }
}