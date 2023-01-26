import * as mongoose from 'mongoose';

export const ContactoSchema = new mongoose.Schema({
  nombre: {
      type: String,
      required: true,
      minlength: 3
  },
  edad: {
      type: Number,
      required: true,
      min: 0,
      max: 120
  },
  telefono: {
      type: String,
      required: true,
      minlength: 9
  }
});