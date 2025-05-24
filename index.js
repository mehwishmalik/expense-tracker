const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require('./models/Expense');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/expenseTrackerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.render('index', { expenses });
});

app.post('/add', async (req, res) => {
  const { title, amount } = req.body;
  const expense = new Expense({ title, amount });
  await expense.save();
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
