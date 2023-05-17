import { getListedItems } from "../data/items.js";
import checkoutRoutes from "./checkout.js";
import itemsRoutes from "./items.js";
import adminRoutes from "./admin.js";

const constructor = (app) => {
	app.use("/checkout", checkoutRoutes);
	app.use("/items", itemsRoutes);

	app.get("/browse", async (req, res) => {
		return res.render("browse", { title: "Browse", key: req.session.key });
	});

	app.get("/bundles", async (req, res) => {
		return res.render("bundles", { title: "Bundles", key: req.session.key });
	});

	app.use("/admin", adminRoutes);

	app.get("/", async (req, res) => {
		let shopItems = await getListedItems();

		shopItems = shopItems.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		return res.render("home", {
			title: "Home",
			key: req.session.key,
			cartOn: req.session.cart?.length != 0,
			cart: req.session.cart,
			shopItems: shopItems,
		});
	});

	app.use("*", (req, res) => {
		return res.redirect("/");
	});
};

export default constructor;
