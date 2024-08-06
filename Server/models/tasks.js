import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status : String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Task = mongoose.model('Task', taskSchema);

export default Task;