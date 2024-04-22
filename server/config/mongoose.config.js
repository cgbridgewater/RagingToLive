const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/TechByteUsers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Spreading the word about TechByte Learning!!"))
    .catch(err => console.log("🚫 Where Is The Database?? There could BEE a problem! 🚫",err))