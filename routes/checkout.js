import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
	return res.render("checkout", { title: "Checkout", key: req.session.key });
});

export default router;
