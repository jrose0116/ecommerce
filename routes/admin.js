import {
	activateItem,
	deleteItem,
	disableItem,
	createItem,
	getAllItems,
	getListedItems,
	getUnlistedItems,
} from "../data/items.js";
import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
import { validNumber, validStr, validId } from "../validation.js";
import { getLogs } from "../data/audit.js";
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

router.get("/auditLogs", async (req, res) => {
	try {
		let key = process.env.key;
		if (key == req.session.key) {
			let data = await getLogs();
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

router.post("/createItem", async (req, res) => {
	let name, price, url, data;
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			name = validStr(req.body.name)
			url = validStr(req.body.img)
			price = validNumber(parseFloat(req.body.price))
			data = await createItem(name, url, price, [], false)
			return res.json(data)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}
})

router.post("/activate/:itemId", async (req, res) => {
	let itemId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			itemId = validId(req.params.itemId)
			let result = await activateItem(itemId)
			return res.json(result)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}

})

router.post("/disable/:itemId", async (req, res) => {
	let itemId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			itemId = validId(req.params.itemId)
			let result = await disableItem(itemId)
			return res.json(result)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}
})

router.post("/delete/:itemId", async (req, res) => {
	let itemId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			itemId = validId(req.params.itemId)
			let result = await deleteItem(itemId)
			return res.json(result)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}
})

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
