import { ObjectId } from "mongodb";
import { transactions } from "../config/mongoCollections.js";

const createTransaction = async (fname, lname, add1, add2, city, zip, cart, total) => {
    let transaction = {
        fname, lname, add1, add2, city, zip, cart, total
    }

    let transactionsCollection = await transactions()
    let trans = await transactionsCollection.insertOne(transaction)

    transaction._id = trans.insertedId.toString()
    return transaction
}

const getTransaction = async (id) => {
    let transactionsCollection = await transactions()
    let trans = await transactionsCollection.find({_id: new ObjectId(id)}).toArray()

    return trans[0]
}

export {createTransaction, getTransaction}