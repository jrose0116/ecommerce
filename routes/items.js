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

		let cart = req.session.cart;
		let found = false;
		let quant = 0;
		cart.map((citem) => {
			if (citem[0] == itemId) {
				found = true;
				citem[1]++;
				quant = citem[1];
			}
		});
		if (!found) cart.push([itemId, 1]);

		req.session.cart = cart;

		return res.json({ success: true, item, quantity: quant });
	} catch (e) {
		return res.status(400).json({ success: false, error: e });
	}
});

export default router;
