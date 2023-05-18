import { ObjectId } from "mongodb";
import { items } from "../config/mongoCollections.js";
import { validNumber, validStr, validId } from "../validation.js";
import { createLog } from "./audit.js";

const createItem = async (name, img, price, categories, forSale, log) => {
	//validation
	try {
		name = validStr(name, "Name");
		img = validStr(img, "Image");
		price = validNumber(price, "Price", false, 0, 500);
	} catch (e) {
		throw e;
	}

	let item = {
		name,
		img,
		price,
		categories,
		forSale: forSale || false,
	};

	const itemsCollection = await items();
	const insertInfo = await itemsCollection.insertOne(item);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw "Error: Could not create item";
	}

	item._id = insertInfo.insertedId.toString();
	if (log != false) {
		await createLog("Create Item", `Name: ${item.name} | Price: ${item.price} | Image URL: ${item.img}`)
	}
	return item;
};

const getItem = async (id) => {
	try {
		id = validId(id);
	} catch (e) {
		throw e;
	}

	const itemsCollection = await items();
	const item = await itemsCollection.findOne({ _id: new ObjectId(id) });

	if (item === null) {
		throw "Error: Could not find item";
	}

	item._id = item._id.toString();

	return item;
};

const getAllItems = async () => {
	const itemsCollection = await items();
	let itemList = await itemsCollection.find({}).toArray();

	itemList.map((item) => {
		item._id = item._id.toString();
	});
	return itemList;
};

const getListedItems = async () => {
	const itemsCollection = await items();
	let itemList = await itemsCollection.find({}).toArray();

	itemList = itemList.filter((item) => {
		return item.forSale == true;
	});
	itemList.map((item) => {
		item._id = item._id.toString();
	});

	return itemList;
};

const getUnlistedItems = async () => {
	const itemsCollection = await items();
	let itemList = await itemsCollection.find({}).toArray();

	itemList = itemList.filter((item) => {
		return item.forSale == false;
	});
	itemList.map((item) => {
		item._id = item._id.toString();
	});

	return itemList;
};

const activateItem = async (itemId) => {
	itemId = validId(itemId)

	let item = await getItem(itemId)

	const itemsCollection = await items()
	let activated = await itemsCollection.updateOne({ _id: new ObjectId(itemId) }, { $set: { forSale: true } })

	await createLog("Activate Item", `Name: ${item.name} | Id: ${itemId}`)

	return item
}

const disableItem = async (itemId) => {
	itemId = validId(itemId)

	let item = await getItem(itemId)

	const itemsCollection = await items()
	let disabled = await itemsCollection.updateOne({ _id: new ObjectId(itemId) }, { $set: { forSale: false } })

	await createLog("Disable Item", `Name: ${item.name} | Id: ${itemId}`)

	return item
}

const deleteItem = async (itemId) => {
	itemId = validId(itemId)

	let item = await getItem(itemId)

	const itemsCollection = await items()
	let deleted = await itemsCollection.deleteOne({ _id: new ObjectId(itemId) })

	await createLog("Delete Item", `Name: ${item.name} | Id: ${itemId}`)

	return item
}

export { createItem, getItem, getAllItems, getListedItems, getUnlistedItems, activateItem, disableItem, deleteItem };
