import mongoose, { mongo } from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    idUsuario: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Nombres: {
      type: String,
    },
    Apellidos: {
      type: String,
    },
    Email: {
      type: String,
    },
    Permisos: {
      type: String,
      default: "user",
    },
    Estado: {
      type: Number,
      default: 1,
    },
    Enlinea: {
      type: Boolean,
      default: false,
    },
    Num_Ingresos: {
      type: Number,
      default: 0,
    },
    Fec_Creacion: {
      type: Date,
      default: Date.now,
    },
    Fec_Eliminacion: {
      type: Date,
      default: null,
    },
    Fec_Modificacion: {
      type: Date,
      default: null,
    },
    Fec_UltimoAcceso: {
      type: Date,
      default: null,
    },
    Creado_Por: {
      type: String,
    },
    Modificado_Por: {
      type: Number,
    },
    Eliminado_Por: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
