import { MongoClient } from "mongodb"

const uri =
"mongodb+srv://myportfolio-wa:webappsprojekt@myportfolio.ieynb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default () => {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            if(err) {
                reject("Error:" + err)
            }
            else {
                console.log("Connect")
                let db = client.db("myportfolio")
                resolve(db)
            }
        })
    })
}