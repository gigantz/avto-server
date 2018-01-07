import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';
import uniqueValidator from 'mongoose-unique-validator';


const schema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  email: { type: String, index: true, unique: true, uniqueCaseInsensitive: true, sparse: true},
  phone: { type: String, unique: true, index: true, sparse: true},
  password: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  aboutme: String,
  countryCode: String,
  city: String,
  ip: String,
  registrationDate: { type: Date, default: Date.now },
  lastLogged: { type: Date, default: Date.now },
  picture: { type: String, default: 'default.png' },
  facebookId: { type: String, unique: true, index: true, sparse: true},
  facebookToken: { type: String},

  emailVerification: Boolean,
  phoneVerification: Boolean,

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

  // Stats
  questions: { type: Number, default: 0 },
  answer: { type: Number, default: 0 },
  points: { type: Number, default: 0 },


  // Auto
  autoId: String,
  autoNumber: String,
  autoPhoto: { type: String, default: 'default.png' },
  autoVin: String,
  onsale: Boolean,
  photos: [{
    caption: String,
    url: { type: String, required: true },
  }]
});

schema.plugin(uniqueValidator);

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