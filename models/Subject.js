import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const schema = new Schema({
  subjectId: { type: String, require: true, index: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  auto: { type: Schema.Types.ObjectId, ref: 'auto' },
  categoryId: { type: Number, required: true },
  subscribers: [{
    userId: String,
    subscribedAt: { type: Date, default: Date.now },
  }],
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  likes: { type: Number, default: 0 },
  postDate: { type: Date, default: Date.now },

  answers: [{
    authorId: { type: String, required: true },
    authorFullName: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
  }],
});

export default mongoose.model('subjects', schema);