const mongo = require('mongodb');

//uri to connect to database
const uri = 'mongodb://localhost:27017'

//create a new monogo client and connect with uri
const client = new mongo.MongoClient(uri)


//create a db and collection
async function main() {

    try {
        await client.connect()
        console.log("db is connected");
        const db = client.db("TestDatabase");
        const collection = db.collection("TestCollection");
        console.log("collection is created");

        //insert a record into the collection
        const insertRecord = await collection.insertOne({ name: "Sai", age: 22, id: 1 })
        console.log("insertRecord is created", insertRecord);

        //find all records in the collection
        const findRecord = await collection.find().toArray()
        console.log("records are found", findRecord);

        //update the records in the collection
        const updateRecord = await collection.updateMany({ age: 22 }, { $set: { age: 24 } })
        console.log("records are updated", updateRecord);

        // delete the records in the collection
        const deleteRecord = await collection.deleteMany({ age: 22 })
        console.log("records are deleted", deleteRecord);

        //deleting the column or filed in the database
        const filter = {} //matches all the documents in the collection
        const update = { $unset: { name: "" } }
        const deleteColumn = await collection.updateMany(filter, update)
        const getCollection = await collection.find().toArray();
        console.log("records are updated", deleteColumn, getCollection);


        // delete the collection
        const deleteCollection = await collection.drop(); //returns the boolean value whether the collection is deleted
        console.log("collection is deleted", deleteCollection);

        //deleting the database
        const deleteDatabase = await db.dropDatabase(); //returns boolean indicating whether the database was deleted
        console.log("database are deleted", deleteDatabase);


    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

}

main();

