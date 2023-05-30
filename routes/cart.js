import { Router } from "express";
import { getItem } from "../data/items.js";
const router = Router();

export async function getCartItems(cart) {
	let cartTotal = 0;
	let cartItems = cart;

	cartItems = await Promise.all(
		cartItems.map(async (cItem) => {
			let quant = cItem[1];
			let item = await getItem(cItem[0]);
			item.quantity = quant;
			cartTotal += item.price * quant;
			return item;
		})
	);

	cartTotal = cartTotal.toFixed(2)
	let cartExist = cartItems.length != 0

	return {cartItems, cartTotal, cartExist}
}

router.route("/").get(async (req, res) => {
	return res.render("checkout", { title: "Checkout", layout: 'co-layout' });
});

export default router;
