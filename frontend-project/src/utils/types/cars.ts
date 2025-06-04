export interface CarProps {
  _id: string;
  marca: string;
  modelo: string;
  motorizacao: string;
  carroceria: string | null;
  transmissao: string;
  preco: number;
  ano: number;
  versao: string | null;
  image: string;
  descricao: string;
}
