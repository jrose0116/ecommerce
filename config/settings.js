import dotenv from "dotenv";
dotenv.config();

export const mongoConfig = {
  // serverUrl: "mongodb://localhost:27017/",
  serverUrl: `mongodb+srv://jrose0116:${process.env.mongoPass}@cluster.nbrlskp.mongodb.net/?retryWrites=true&w=majority`,
  database: "JacobRose_eCommerce",
};
