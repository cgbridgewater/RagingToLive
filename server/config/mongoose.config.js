const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/RagingToLive", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Raging To Live!!"))
    .catch(err => console.log("🚫 Where Is The Database?? There could be a problem! 🚫",err))