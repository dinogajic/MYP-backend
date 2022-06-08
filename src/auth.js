import connect from "./mongo.js"
import bcryptjs from "bcryptjs"

export default {
    async registerUser(userRegData, res){
        let database = await connect()
        
        try {
            await database.collection("user").createIndex({email: 1}, {unique: true})
        
            const response = await database.collection("user").insertOne({
              email: userRegData.email,
              password: await bcryptjs.hash(userRegData.password, 8),
              firstName: userRegData.firstName,
              lastName: userRegData.lastName,
            });
        
            console.log("User created successfully");
            /* res.json("User created successfully"); */
          } catch (error) {
            if (error.code == 11000) {
              /* return res.json({ status: "error", msg: "User already exist." }); */
              return new Error("User already exist.")
              /*  return false */
            }
            /* return res.json({ status: "error" }); */
          }
    }
}