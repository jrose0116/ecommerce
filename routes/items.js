import { Router } from "express";
import { getItem } from "../data/items.js";
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

export default router;
