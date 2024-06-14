import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: {
      type: String,
      select: true, // Não oculta o campo nas consultas por padrão
    },

    /**
     * Data de criação do usuário.
     */
    create_at: {
      type: Date,
      default: Date.now,
      select: false, // Oculta o campo nas consultas por padrão
    },

    /**
     * Data de atualização do usuário.
     */
    update_at: {
      type: Date,
      select: false, // Oculta o campo nas consultas por padrão
      default: null, // Define o valor padrão como nulo, pois ainda não foi atualizado
    },
  },
  {
    /**
     * Transforma a resposta JSON do documento.
     */
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.create_at;
        delete ret.update_at;
      },
    },
  }
);
