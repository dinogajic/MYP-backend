import express from "express"
import cors from "cors"
import connect from "./mongo.js"
import auth from "./auth.js"

const app = express() 
const port = 3000 
app.listen(process.env.PORT || port)

app.use(cors())
app.use(express.json())



app.get("/user", async(req, res) => {
    let database = await connect()
    
    let user_doc = await database.collection("user").findOne()

    res.json(user_doc);
  })


  app.post("/register", async (req, res) => {
    
    let newUser = req.body;

    try {
        auth.registerUser(newUser)
    }
    catch(error) {
        res.status(500).json({error: error.message})
        /* return res.json({ status: "error", msg: "User already exist." }); */
    }

    res.json(newUser)

  });
  