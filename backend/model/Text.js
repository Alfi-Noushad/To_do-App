const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: String,
    status: String,
    priority: String,
    userId:  mongoose.Schema.Types.ObjectId,
});


const Task = mongoose.model("Task",taskSchema);
module.exports = Task;