/**
 * @file Manages all operations related to institutions
 * @author matt
 */
import express from "express";
import cors from "cors";
import compression from "compression";
import indexRoutes from "./routes/index.js";
import institutionRoutes from "./routes/institution.js";
import isContentTypeApplicationJSON from "./middleware/content-type.js";
import departmentRoutes from "./routes/department.js";
import playerRoutes from "./routes/player.js";


const app = express();

const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";

app.use(isContentTypeApplicationJSON);

app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded (form) data
app.use(express.json()); // Parses JSON request bodies
app.use("/api/institutions", institutionRoutes);
app.use("/", indexRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/players", playerRoutes);


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello, World!",
    firstName: "John",
    lastName: "Doe",
    age: 20,
    hobbies: ["Reading", "Gaming", "Cooking"],
  });
});

app.get("/progLangs", (req, res) => {
  return res.status(200).json({
    progLangs: [
      { name: "C++", author: "Bjarne Stroustrup" },
      { name: "Java", author: "James Gosling" },
      { name: "JavaScript", author: "Brendan Eich" },
      { name: "Python", author: "Guido van Rossum" },
      { name: "Ruby", author: "Yukihiro Matsumoto" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

export default app;
