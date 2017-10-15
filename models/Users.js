import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  phone: { type: Number, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  countryCode: String,
  ip: String,
  registrationDate: { type: Date, default: Date.now },
  lastLogged: { type: Date, default: Date.now },

  emailVerification: Boolean,
  phoneVerification: Boolean,

  points: { type: Number, default: 0 },
  aboutme: String,
  deviceData: String,
  online: Boolean,
  active: Boolean,
  claims: Array,
  logs: [{
    type: { type: String, required: true },
    message: { type: String, default: 'NO Message'},
    date: { type: Date, default: Date.now }
  }],
  notifications: Array,
  subscriptions: Array,

  // Auto
  autoId: String,
  autoNumber: String,
  autoVin: String,
  onsale: Boolean,
});

schema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

schema.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('users', schema);