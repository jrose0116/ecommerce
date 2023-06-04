import {
	activateItem,
	deleteItem,
	disableItem,
	createItem,
	editItem,
	getAllItems,
	getListedItems,
	getUnlistedItems,
	getItem,
} from "../data/items.js";
import {
	activateBundle,
	createBundle,
	deleteBundle,
	disableBundle,
	getListedBundles,
	getUnlistedBundles,
	editBundleItems,
} from "../data/bundles.js";
import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import { validNumber, validStr, validId } from "../validation.js";
import { getLogs } from "../data/audit.js";
import bcrypt from "bcrypt";


router.use("/", async (req, res, next) => {
	try {
		if (await bcrypt.compare(process.env.key, req.session.key || "")) {
			next()
		} else {
			console.log("Unauthorized: Redirected");
			return res.redirect("/auth");
		}
	} catch (e) {
		return res.redirect("/");
	}
})

router.get("/viewAllListings", async (req, res) => {
	try{
		let data = await getAllItems()
		return res.json(data);
	} catch (e) {
		return res.status(500).json({ error: e });
	}

});

router.get("/auditLogs", async (req, res) => {
	try {
		let data = await getLogs();
		return res.json(data);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.get("/destroySession", async (req, res) => {
	try {
		req.session.destroy();
		return res.json({ destroyed: "success" });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.post("/createItem", async (req, res) => {
	let name, price, url, data, description;
	try {
		name = validStr(req.body.name);
		url = validStr(req.body.img);
		description = validStr(req.body.description, "Description");
		price = validNumber(parseFloat(req.body.price), "Price", false, 0, 250);
		data = await createItem(name, url, price, [], description, false);
		return res.json(data);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/createBundle", async (req, res) => {
	let name, price, url, data, description;
	try {
		name = validStr(req.body.name);
		url = validStr(req.body.img);
		description = validStr(req.body.description);
		price = validNumber(parseFloat(req.body.price), "Price", false, 0, 250);
		data = await createBundle(name, url, price, [], description, false, true);
		return res.json(data);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/activate/:itemId", async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let result = await activateItem(itemId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/activatebundle/:bundleId", async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let result = await activateBundle(bundleId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/disable/:itemId", async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let result = await disableItem(itemId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/disablebundle/:bundleId", async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let result = await disableBundle(bundleId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/delete/:itemId", async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let result = await deleteItem(itemId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/deletebundle/:bundleId", async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let result = await deleteBundle(bundleId);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/editbundleitems/:bundleId", async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let name = validStr(req.body.name)
		let description = validStr(req.body.description)
		let result = await editBundleItems(
			bundleId,
			req.body.ids || [],
			name,
			parseFloat(req.body.price),
			description
		);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.post("/edititem/:itemId", async (req, res) => {
	let itemId;
	try {
		itemId = validId(req.params.itemId);
		let result = await editItem(
			itemId,
			req.body.name,
			parseFloat(req.body.price),
			req.body.description
		);
		return res.json(result);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.get("/getAllItems", async (req, res) => {
	try {
		let items = await getAllItems();
		return res.json({ items });
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.get("/", async (req, res) => {
	try {
		let listedItems = await getListedItems();
		let unlistedItems = await getUnlistedItems();
		let listedBundles = await getListedBundles();
		let unlistedBundles = await getUnlistedBundles();

		listedItems = listedItems.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		unlistedItems = unlistedItems.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		listedBundles = listedBundles.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		unlistedBundles = unlistedBundles.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		await Promise.all(
			listedBundles.map(async (bundle) => {
				bundle.images = bundle.items;
				bundle.itemPriceTotal = 0;
				bundle.images = await Promise.all(
					bundle.images.map(async (id) => {
						let item = await getItem(id[0]);
						bundle.itemPriceTotal += item.price * id[1];
						return { imgName: item.name, imgUrl: item.img, quantity: id[1] };
					})
				);
			})
		);

		await Promise.all(
			unlistedBundles.map(async (bundle) => {
				bundle.images = bundle.items;
				bundle.itemPriceTotal = 0;
				bundle.images = await Promise.all(
					bundle.images.map(async (id) => {
						let item = await getItem(id[0]);
						bundle.itemPriceTotal += item.price * id[1];
						return { imgName: item.name, imgUrl: item.img, quantity: id[1] };
					})
				);
			})
		);

		// let {cartItems, cartTotal} = await getCartItems(req.session.cart)

		listedBundles.forEach((bundle) => {
			bundle.images.sort((a, b) => {
				bundle.itemPriceTotal = Math.round(bundle.itemPriceTotal * 100) / 100;
				return a.imgName.localeCompare(b.imgName);
			});
		});

		unlistedBundles.forEach((bundle) => {
			bundle.images.sort((a, b) => {
				bundle.itemPriceTotal = Math.round(bundle.itemPriceTotal * 100) / 100;
				return a.imgName.localeCompare(b.imgName);
			});
		});

		return res.render("admin", {
			title: "Admin",
			listedItems,
			unlistedItems,
			listedBundles,
			unlistedBundles,
		});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

export default router;
