import { Router } from "express";
import { getItem } from "../data/items.js";
import { getBundle } from "../data/bundles.js";
import { createTransaction, getTransaction } from "../data/transactions.js";
const router = Router();

export async function getCartItems(cart) {
	let cartTotal = 0;
	let cartItems = cart;

	cartItems = await Promise.all(
		cartItems.map(async (cItem) => {
			let quant = cItem[1];
			if (cItem[2] == "item") {
				let item = await getItem(cItem[0]);
				item.quantity = quant;
				item.isBundle = false;
				cartTotal += item.price * quant;
				return item;
			}
			if (cItem[2] == "bundle") {
				let bundle = await getBundle(cItem[0]);
				bundle.quantity = quant;
				bundle.isBundle = true;
				cartTotal += bundle.price * quant;
				return bundle;
			}
		})
	);

	cartTotal = cartTotal.toFixed(2);
	let cartExist = cartItems.length != 0;

	return { cartItems, cartTotal, cartExist };
}

router.route("/order/:id").get(async (req, res) => {
	try {
		let transaction = await getTransaction(req.params.id)
		if(!transaction) return res.redirect("/")
		return res.render("transaction", transaction)
	} catch (e) {
		return res.redirect("/")
	}
})

router.route("/").get(async (req, res) => {
	return res.render("checkout", { title: "Checkout", layout: "co-layout", cartShipping: 9.95, cartTax: ((parseFloat(res.locals.cartTotal) + 9.95)*0.0625).toFixed(2), cartFinal: ((parseFloat(res.locals.cartTotal) + 9.95)*1.0625).toFixed(2)});
}).post(async (req, res) => {
	let fname = req.body.fname
    let lname = req.body.lname
    let add1 = req.body.add1
    let add2 = req.body.add2
    let city = req.body.city
    let zip = req.body.zip

	let transaction = await createTransaction(fname,lname,add1,add2,city,zip, req.session.cart, ((parseFloat(res.locals.cartTotal) + 9.95)*1.0625).toFixed(2))

	let ret = {retURL: `/checkout/order/${transaction._id}`}

	req.session.cart = []
	return res.json(ret);
});


export default router;
