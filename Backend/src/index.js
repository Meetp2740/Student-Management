import dotenv from "dotenv";
import connectDb from "./db/index.js";
import {app} from "./app.js";


dotenv.config();

connectDb().
then(()=> {
    app.listen(8000, '0.0.0.0', () => console.log("server is running on 8000"))
})
.catch(err=>{
    console.log(err)
});

// process.env.PORT || 8080
// `Server running on port ${process.env.PORT}`