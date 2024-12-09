const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
    try {
        // Check karo ki `global.food_data` available hai
        res.send([global.food_data,global.food_category])
    } catch (error) {
        console.error("Error in /fooddata route:", error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.post("/fooddata", (req, res) => {
//     try {
//         // Check karo ki `global.food_data` available hai
//         if (!global.food_data) {
//             return res.status(500).json({ error: "Food data not initialized" });
//         }

//         console.log(global.food_data);
//         res.send({ success: true, data: global.food_data });

//          // Check karo ki `global.food_category` available hai
//          if (!global.food_category) {
//             return res.status(500).json({ error: "Food data not initialized" });
//         }

//         console.log(global.food_category);
//         res.send({ success: true, data: global.food_category });

//     } catch (error) {
//         console.error("Error in /fooddata route:", error.message);
//         res.status(500).send("Server error");
//     }
// });

// module.exports = router; ye kaisa hai tarika

