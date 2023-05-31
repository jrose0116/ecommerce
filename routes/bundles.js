import { Router } from "express";
import { getBundle } from "../data/bundles.js";
import { getItem } from "../data/items.js";
import { validId } from "../validation.js";
const router = Router();

router.route("/:bundleId").get(async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let bundle = await getBundle(bundleId);
		return res.json(bundle);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
});

router.route("/addToCart/:bundleId").post(async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let bundle = await getBundle(bundleId);

		let cartTotal = 0;
		let cart = req.session.cart;
		let found = false;
		let quant = 1;
		await Promise.all(cart.map(async(cbundle) => {
			if (cbundle[0] == bundleId) {
				found = true;
				cbundle[1]++;
				quant = cbundle[1];
			}
            if(cbundle[2] == "bundle") {
                bundle = await getBundle(cbundle[0])
                cartTotal += bundle.price * cbundle[1]
            }
            else {
                let item = await getItem(cbundle[0])
			    cartTotal += item.price * cbundle[1]
            }
		}));
        
        bundle = await getBundle(bundleId)
		if (!found) { 
			cart.push([bundleId, 1, "bundle"])
			cartTotal += bundle.price*1
		};

		req.session.cart = cart;

		cartTotal = cartTotal.toFixed(2)

		return res.json({ success: true, bundle, quantity: quant, cartTotal });
	} catch (e) {
		return res.status(400).json({ success: false, error: e });
	}
});

router.route("/removeFromCart/:bundleId").post(async (req, res) => {
	let bundleId;
	try {
		bundleId = validId(req.params.bundleId);
		let bundle = await getBundle(bundleId);

		let cartTotal = 0;
		let cart = req.session.cart;
		let found = false;
		let quant = 1;
		await Promise.all(cart.map(async(cbundle) => {
			if (cbundle[0] == bundleId) {
				found = true;
				cbundle[1] -= 1;
				quant = cbundle[1];
			}
			if(cbundle[2] == "bundle") {
                bundle = await getBundle(cbundle[0])
                cartTotal += bundle.price * cbundle[1]
            }
            else {
                let item = await getItem(cbundle[0])
			    cartTotal += item.price * cbundle[1]
            }
		}));
		cart = cart.filter((cbundle) => cbundle[1] != 0 )

		if (!found) throw "Error: Bundle not in cart";

		req.session.cart = cart;

		cartTotal = cartTotal.toFixed(2)

		return res.json({ success: true, bundle, quantity: quant, cartTotal });
	} catch (e) {
		return res.status(400).json({ success: false, error: e });
	}
});

export default router;
