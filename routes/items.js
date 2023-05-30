import { Router } from "express";
import { getItem } from "../data/items.js";
import { validId } from "../validation.js";
const router = Router();

router.route("/:itemId").get(async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let item = await getItem(itemId);
		return res.json(item);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.route("/addToCart/:itemId").post(async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let item = await getItem(itemId);

		let cartTotal = 0;
		let cart = req.session.cart;
		let found = false;
		let quant = 1;
		await Promise.all(cart.map(async(citem) => {
			if (citem[0] == itemId) {
				found = true;
				citem[1]++;
				quant = citem[1];
			}
			item = await getItem(citem[0])
			cartTotal += item.price * citem[1]
		}));
		if (!found) cart.push([itemId, 1]);

		req.session.cart = cart;

		cartTotal = cartTotal.toFixed(2)

		return res.json({ success: true, item, quantity: quant, cartTotal });
	} catch (e) {
		return res.status(400).json({ success: false, error: e });
	}
});

router.route("/removeFromCart/:itemId").post(async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let item = await getItem(itemId);

		let cartTotal = 0;
		let cart = req.session.cart;
		let found = false;
		let quant = 1;
		await Promise.all(cart.map(async(citem) => {
			if (citem[0] == itemId) {
				found = true;
				citem[1] -= 1;
				quant = citem[1];
			}
			item = await getItem(citem[0])
			cartTotal += item.price * citem[1]
		}));
		cart = cart.filter((citem) => citem[1] != 0 )

		if (!found) throw "Error: Item not in cart";

		req.session.cart = cart;

		cartTotal = cartTotal.toFixed(2)

		return res.json({ success: true, item, quantity: quant, cartTotal });
	} catch (e) {
		return res.status(400).json({ success: false, error: e });
	}
});

export default router;
