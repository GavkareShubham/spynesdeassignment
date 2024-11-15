const mongoose = require('mongoose');

const uri = "mongodb+srv://shubhamgavkare07:vSHFNP4U40mEh8h3@cluster0.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
});

module.exports = mongoose.model('user', userSchema);
