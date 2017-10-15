import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  auto: { type: Schema.Types.ObjectId, ref: 'auto' },
  autoId: { type: Number, required: true },
  modelId: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  category: { type: String, required: true },
  subscribers: Array,
  authorId: { type: String, required: true },
  authorFullName: { type: String, required: true },
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