
import mongoose, {Schema} from "mongoose";

const expenseSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    idempotencyKey: {
        type: String,
        unique: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Expense = mongoose.model("Expense", expenseSchema)
