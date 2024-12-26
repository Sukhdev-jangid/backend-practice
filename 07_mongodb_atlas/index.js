const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://jangidsukhdev70:UB5F7CKSUa5j9x73@sukhdev0.zz0fj.mongodb.net/?retryWrites=true&w=majority&appName=sukhdev0';

const client = new MongoClient(url);

const connect = async()=>{
    await client.connect();
    const db = client.db('ws_130_tmp');
    const user = db.collection('users');

    return{
        user
    }
};

const insertData = async()=>{
    const {user} = await connect();

    const data = {
        name:'sukh',
        age:'19',
        email:"sukh@gmail.com",
    };

    const response = await user.insertOne(data);
    console.log(response);
};

// insertData();

const readData = async()=>{
    const {user} = await connect();
    const response = await user.find().toArray();
    console.log(response);
}

readData();

const deleteData = async()=>{
    const {user} = await connect();
    const response = await user.deleteOne({_id: new ObjectId('676c4bcdd4c79fd549cdd109')});
    console.log(response);
}

// deleteData();

const updateData = async () =>{
    const {user} = await connect();
    const response = await user.updateOne(
        {_id: new ObjectId('676c395e9d43f3b94a69df8b')},
        {
            $set:{
                name:'dev',
                number:'7014'
            }
        }
    );
    console.log(response);
}

// updateData();