const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL

const ConnectDB = () => {
    return  mongoose.connect(mongoURL).then(()=>{
        console.log('mongodb is connected');
    }).catch((error)=>{
        console.log('mongodb connectiong failed ',error);
        throw error;
    })
}

module.exports = ConnectDB