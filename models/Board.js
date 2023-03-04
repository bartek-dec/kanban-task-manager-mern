import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please provide a name']
        },
        columns: {
            type: [{
                column: {
                    type: String,
                }
            }]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a user']
        },
    },
    {timestamps: true}
);

export default mongoose.model('Board', BoardSchema);