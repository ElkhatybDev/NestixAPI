require("dotenv").config();
// eaytna app li fiha kolchi 
const app = require("./app");

const PORT = 3009;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});