import { Expense } from "../models/expense.model.js";

const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date, idempotencyKey } = req.body;

        // Basic Validation
        if (!amount || !category || !date) {
            return res.status(400).json({ message: "Amount, category, and date are required" });
        }

        // Idempotency Check
        if (idempotencyKey) {
            const existingExpense = await Expense.findOne({ idempotencyKey });
            if (existingExpense) {
                // Check if the existing expense belongs to the same user
                if (existingExpense.owner && existingExpense.owner.toString() !== req.user?._id.toString()) {
                     // Technically an idempotency key collision with another user, though rare if UUIDs used.
                     // Treat as new or error? Start with error.
                     return res.status(409).json({ message: "Idempotency key conflict" });
                }
                return res.status(200).json(existingExpense);
            }
        }

        const expense = await Expense.create({
            amount,
            category,
            description,
            date,
            idempotencyKey,
            owner: req.user._id // Link to logged-in user
        });

        res.status(201).json(expense);

    } catch (error) {
        console.error("Error creating expense:", error);
         // Handle duplicate key error specifically if it races past the findOne check
         if (error.code === 11000 && error.keyPattern && error.keyPattern.idempotencyKey) {
            try {
                const existingExpense = await Expense.findOne({ idempotencyKey: req.body.idempotencyKey });
                if(existingExpense) return res.status(200).json(existingExpense);
            } catch (innerError) {
                 return res.status(500).json({ message: "Internal server error during idempotency check" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { category, sort } = req.query;

        let query = {
            owner: req.user._id // Only fetch logged-in user's expenses
        };
        
        if (category) {
            query.category = category;
        }

        let sortOption = {};
        if (sort === 'date_desc') {
            sortOption.date = -1; // Newest first
            sortOption.createdAt = -1; // Secondary sort: Newest created first
        } else if (sort === 'date_asc') {
             sortOption.date = 1;
             sortOption.createdAt = 1; // Secondary sort: Oldest created first
        } else {
             sortOption.date = -1; // Default to newest first
             sortOption.createdAt = -1;
        }

        const expenses = await Expense.find(query).sort(sortOption);

        res.status(200).json(expenses);

    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { createExpense, getExpenses };
