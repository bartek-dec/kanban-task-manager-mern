import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
    },
    subtasks: {
        type: [{
            name: {
                type: String
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }]
    },
    status: {
        type: String,
        required: [true, 'Please provide status']
    },
    boardId: {
        type: mongoose.Types.ObjectId,
        ref: 'Board',
        required: [true, 'Please provide a board ID']
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', TaskSchema);