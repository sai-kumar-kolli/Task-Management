const mongodb = require('mongodb');
const userJSON = require('./userCollection.json');
const orderJSON = require('./ordersCollection.json');


const uri = 'mongodb://localhost:27017'

async function aggreagate() {
    const client = new mongodb.MongoClient(uri);


    try {
        await client.connect();
        console.log("client is connected");

        const userDb = client.db("user");
        const orderDb = client.db("order");
        console.log("order,user db is created");

        const userCollection = userDb.collection("usercollection");
        const orderCollection = orderDb.collection("orderCollection");
        console.log("userCollection, orderCollection created");

        const insertUserCollection = await userCollection.insertMany(userJSON);
        const insertOrderCollection = await orderCollection.insertMany(orderJSON);
        console.log("insertUserCollection, orderCollection inserted");

        //Finding Documents with a Specific Field Value
        const query1 = { name: "Alice" };
        const docs1 = await userCollection.find(query1).toArray();
        console.log(docs1);

        //Finding Documents with Age Greater Than or Equal to 25
        const query2 = { age: { $gte: 25 } };
        const docs2 = await userCollection.find(query2).toArray();
        console.log(docs2);

        //Finding Documents with Age Greater Than 25 or Name is "Alice"
        //$or query takes array with conditions
        const query = { $or: [{ age: { $gt: 25 } }, { name: "Alice" }] };
        const docs = await userCollection.find(query).toArray();
        console.log(docs);

        //Projecting specified fields or columns 
        const query3 = {};
        const options1 = { projection: { _id: 0, name: 1, age: 1 } };
        const docs3 = await userCollection.find(query3, options1).toArray();
        console.log(docs3);

        // Basic Aggregation Pipeline
        const pipeline1 = [
            { $match: { age: { $gte: 25 } } },
            { $group: { _id: "$age", total: { $sum: 1 } } }
        ];
        const result1 = await userCollection.aggregate(pipeline1).toArray();
        console.log(result1);

        //$match
        const pipeline2 = [
            { $match: { age: { $gte: 25 } } }
        ];
        const result2 = await userCollection.aggregate(pipeline2).toArray();
        console.log(result2);

        //$project
        const pipeline = [
            { $project: { name: 1, age: 1, isAdult: { $gte: ["$age", 18] } } }
        ];
        const result = await userCollection.aggregate(pipeline).toArray();
        console.log(result);

        //$sort
        const pipeline4 = [
            { $sort: { age: 1 } }
        ];
        const result4 = await userCollection.aggregate(pipeline4).toArray();
        console.log(result4);

        //$limit
        const pipeline5 = [
            { $limit: 3 }
        ];
        const result5 = await userCollection.aggregate(pipeline5).toArray();
        console.log(result5);

        //$unwind
        const pipeline6 = [
            { $unwind: "$hobbies" }
        ];
        const result6 = await userCollection.aggregate(pipeline6).toArray();
        console.log(result6);

        const pipeline7 = [
            {
                $lookup: {
                    from: "userCollection",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "orders"
                }
            }
        ];
        const result7 = await orderCollection.aggregate(pipeline7).toArray();
        console.log(result7);
        const dropped = await userDb.dropDatabase();
        await orderDb.dropDatabase();

    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }

}
aggreagate();