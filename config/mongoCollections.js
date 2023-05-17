import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
	let _col = undefined;

	return async () => {
		if (!_col) {
			const db = await dbConnection();
			_col = await db.collection(collection);
		}

		return _col;
	};
};

export const items = getCollectionFn("items");
export const transactions = getCollectionFn("transactions");
export const bundles = getCollectionFn("transactions");

/*
items: {
  name: String
  img: String
  price: Float
  categories: Array
  forSale: boolean
}

transactions: {
  email: String
  phoneNumber: String
  items: Array
  total: Float
  fname: String
  lname: String
  address: String
  city: String
  zip: String
}

bundles: {
  name: String
  price: float
  items: Array (of ids)
}
*/
