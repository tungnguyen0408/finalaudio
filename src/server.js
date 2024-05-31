import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connectDB from "./config/connectDB";
import session from "express-session";
import flash from "connect-flash";

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
// Sử dụng session và flash
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend running with port " + port);
});
