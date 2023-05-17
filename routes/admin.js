import {
	getAllItems,
	getListedItems,
	getUnlistedItems,
} from "../data/items.js";
import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();

router.get("/viewAllListings", async (req, res) => {
	try {
		let key = process.env.key;
		if (key == req.session.key) {
			let data = await getAllItems();
			return res.json(data);
		} else {
			console.log("Unauthorized: Redirected");
			return res.redirect("/");
		}
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.get("/destroySession", async (req, res) => {
	try {
		let key = process.env.key;
		if (key == req.session.key) {
			req.session.destroy();
			return res.json({ destroyed: "success" });
		} else {
			console.log("Unauthorized: Redirected");
			return res.redirect("/");
		}
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.get("/:key", async (req, res) => {
	try {
		let key = process.env.key;
		if (key == req.params.key) {
			req.session.key = key;

			let listedItems = await getListedItems();
			let unlistedItems = await getUnlistedItems();

			listedItems = listedItems.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			unlistedItems = unlistedItems.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			return res.render("admin", {
				key: req.session.key,
				title: "Admin",
				listedItems,
				unlistedItems,
			});
		}
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	res.redirect("/");
});

export default router;
