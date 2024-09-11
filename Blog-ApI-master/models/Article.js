const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;