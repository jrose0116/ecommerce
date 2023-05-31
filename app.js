import express from "express"
import session from "express-session"
const app = express()
import configRoutes from "./routes/index.js"
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

app.use(
    session({
        name: "AuthCookie",
        secret: "secret string",
        resave: false,
        saveUninitialized: false,
        cart: [],
    }))

app.use("/", (req, res, next) => {
    if (!req.session.cart) req.session.cart = []
    next()
})

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server running. http://localhost:" + port)
})