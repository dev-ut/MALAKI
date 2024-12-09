// const mongoose = require('mongoose');

// // MongoDB connection string
// const mongoURL = "mongodb+srv://utkarsh:admin@cluster0.vel2m.mongodb.net/goFoodmern?retryWrites=true&w=majority";

// const connectToMongoDB = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(mongoURL);
//     console.log("connected ho gya databse se");

//     // Fetch data from the collection
//     const fetched = mongoose.connection.db.collection("food_items");

//     fetched.find({}).toArray((err, data) => {
//       if (err) console.log("Error fetching data:", err);
//       else {
//         console.log("Data fetched:", data);
//       }
//     });
//   } catch (err) {
//     console.log("eroor hai kuch bhiya:", err.message);
//   }
// };

// // Exporting the function for external use
// module.exports = connectToMongoDB;

const mongoose = require("mongoose");

// MongoDB connection string
const mongoURL =
  "mongodb+srv://utkarsh:admin@cluster0.vel2m.mongodb.net/goFoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    // MongoDB se connect karte hain
    await mongoose.connect(mongoURL);
    console.log("Connected ho gya databse se");

    // Fetch `food_items` collection
    const fetchedFoodItems = mongoose.connection.db.collection("food_items");
    console.log(`food_items Collection access ho gaya`);
    const foodItemsData = await fetchedFoodItems.find({}).toArray();

    if (foodItemsData.length === 0) {
      console.log("food_items Collection me koi data nahi hai.");
    } else {
      global.food_data = foodItemsData; // yahn se kyakiya hmne ki ab is data ko khin se bhi acess kr skte hai
      console.log("Food items data fetched successfully:", global.food_data);
    }

    // Fetch `food_category` collection
    
    const fetchedFoodCategory = mongoose.connection.db.collection("foodCategory");
    console.log(`foodCategory Collection access ho gaya`);
    const foodCategoryData = await fetchedFoodCategory.find({}).toArray();

    if (foodCategoryData.length === 0) {
      console.log("food_category Collection me koi data nahi hai.");
    } else {
      global.food_category = foodCategoryData;
      console.log("Food category data fetched successfully:", global.food_category);
    }

  } catch (err) {
    console.log("Error hai kuch bhiya:", err.message);
  }
};

module.exports = connectToMongoDB;







