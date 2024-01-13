import mongoose from "mongoose";
import { User } from "./src/models/user.model.js"


const saveData = async (req, res, next) => {
    // const data = {
    //     UserName : "meet",
    //     Password : "meet2534",
    //     Role: "student"
    // }
    const newUser = new User({
        UserName : "meet",
        Password : "meet2534",
        Role: "student"
    });

    await newUser.save();
    // res.json(newUser);
    console.log(newUser)
}

await saveData();