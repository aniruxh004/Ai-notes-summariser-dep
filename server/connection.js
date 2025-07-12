const mongoose=require("mongoose");

// async function connectDb(url){
//   return mongoose.connect(url)
// }

// module.export={
//     connectDb
// }const mongoose = require("mongoose");

const connectDb = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connectDb };
