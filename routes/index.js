import { getListedItems, getItem } from "../data/items.js";
import checkoutRoutes, { getCartItems } from "./cart.js";
import itemsRoutes from "./items.js";
import adminRoutes from "./admin.js";
import { getListedBundles } from "../data/bundles.js";
import bcrypt from "bcrypt";

const constructor = (app) => {

	app.use("/", async (req, res, next) => {
		let {cartItems, cartTotal, cartExist} = await getCartItems(req.session.cart)

		res.locals.cartItems = cartItems
		res.locals.cartTotal = cartTotal
		res.locals.cartExist = cartExist

		res.locals.key = req.session.key
		next()
	})

	app.use("/checkout", checkoutRoutes);
	app.use("/items", itemsRoutes);

	app.get("/browse", async (req, res) => {
		return res.render("browse", { title: "Browse" });
	});

	app.get("/bundles", async (req, res) => {
		return res.render("bundles", { title: "Bundles" });
	});

	app.use("/admin", adminRoutes);

	app.use("/adminkey/:key", async (req, res) => {		
		let key = await bcrypt.hash(process.env.key, 5);
		if (await bcrypt.compare(req.params.key, key)) {
			req.session.key = key;
			res.redirect("/admin")
		}
		else {
			res.redirect("/")
		}
	})

	app.get("/", async (req, res) => {
		let shopItems = await getListedItems();
		let shopBundles = await getListedBundles();

		shopItems = shopItems.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		shopBundles = shopBundles.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		await Promise.all(
			shopBundles.map(async (bundle) => {
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

		shopBundles.forEach((bundle) => {
			bundle.images.sort((a, b) => {
				bundle.itemPriceTotal = Math.round(bundle.itemPriceTotal * 100) / 100;
				return a.imgName.localeCompare(b.imgName);
			});
		});

		return res.render("home", {
			title: "Home",
			cartOn: req.session.cart?.length != 0,
			cart: req.session.cart,
			shopItems: shopItems,
			shopBundles: shopBundles,
		});
	});

	app.use("*", (req, res) => {
		return res.redirect("/");
	});
};

export default constructor;
