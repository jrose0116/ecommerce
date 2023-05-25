import {
	activateItem,
	deleteItem,
	disableItem,
	createItem,
	getAllItems,
	getListedItems,
	getUnlistedItems,
	getItem,
} from "../data/items.js";
import { activateBundle, createBundle, deleteBundle, disableBundle, getListedBundles, getUnlistedBundles, editBundleItems } from "../data/bundles.js"
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
			price = validNumber(parseFloat(req.body.price), "Price", false, 0, 250)
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

router.post("/createBundle", async (req, res) => {
	let name, price, url, data;
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			name = validStr(req.body.name)
			url = validStr(req.body.img)
			price = validNumber(parseFloat(req.body.price), "Price", false, 0, 250)
			data = await createBundle(name, url, price, [], false)
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

router.post("/activatebundle/:bundleId", async (req, res) => {
	let bundleId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			bundleId = validId(req.params.bundleId)
			let result = await activateBundle(bundleId)
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

router.post("/disablebundle/:bundleId", async (req, res) => {
	let bundleId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			bundleId = validId(req.params.bundleId)
			let result = await disableBundle(bundleId)
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

router.post("/deletebundle/:bundleId", async (req, res) => {
	let bundleId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			bundleId = validId(req.params.bundleId)
			let result = await deleteBundle(bundleId)
			return res.json(result)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}
})

router.post("/editbundleitems/:bundleId", async (req, res) => {
	let bundleId
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			bundleId = validId(req.params.bundleId)
			let result = await editBundleItems(bundleId, req.body.ids || [], req.body.name, parseFloat(req.body.price))
			return res.json(result)
		} catch (e) {
			return res.status(400).json({ error: e })
		}
	} else {
		console.log("Unauthorized: Redirected");
		return res.redirect("/");
	}
})

router.get("/getAllItems", async (req, res) => {
	let key = process.env.key;
	if (key == req.session.key) {
		try {
			let items = await getAllItems()
			return res.json({ items })
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

			await Promise.all(listedBundles.map(async (bundle) => {
				bundle.images = bundle.items;
				bundle.itemPriceTotal = 0;
				bundle.images = await Promise.all(bundle.images.map(async (id) => {
					let item = await getItem(id[0]);
					bundle.itemPriceTotal += item.price
					return { imgName: item.name, imgUrl: item.img, quantity: id[1] }
				}))
			}))

			await Promise.all(unlistedBundles.map(async (bundle) => {
				bundle.images = bundle.items;
				bundle.itemPriceTotal = 0;
				bundle.images = await Promise.all(bundle.images.map(async (id) => {
					let item = await getItem(id[0]);
					bundle.itemPriceTotal += item.price
					return { imgName: item.name, imgUrl: item.img, quantity: id[1] }
				}))
			}))

			listedBundles.forEach((bundle) => {
				bundle.images.sort((a, b) => {
					return a.imgName.localeCompare(b.imgName)
				})
			})

			unlistedBundles.forEach((bundle) => {
				bundle.images.sort((a, b) => {
					return a.imgName.localeCompare(b.imgName)
				})
			})

			return res.render("admin", {
				key: req.session.key,
				title: "Admin",
				listedItems,
				unlistedItems,
				listedBundles,
				unlistedBundles
			});
		}
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	res.redirect("/");
});


export default router;
