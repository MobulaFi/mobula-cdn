import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
const app = express();
const extensions = ["", ".png", ".jpg", ".json"];
import config from "./config";

app.use(bodyParser.json());

app.get("/*", (req, res) => {
  for (const ext of extensions) {
    const filePath = path.resolve(__dirname, ".", "content/");
    console.log(req.url.slice(1, req.url.length));
    if (fs.existsSync(filePath + req.url + ext)) {
      res.sendFile(req.url.slice(1, req.url.length) + ext, { root: filePath });
      return;
    }
  }
  res.json({ error: "Ressource not found." });
});

app.post("/generate", (req, res) => {
  if (req.body.type && req.body.id && req.body.auth === config.AUTH) {
    const randomImageId = Math.floor(Math.random() * 10);
    fs.copyFileSync(
      path.resolve(
        __dirname,
        ".",
        "content/" + req.body.type + "/" + randomImageId
      ),
      path.resolve(
        __dirname,
        ".",
        "content/" + req.body.type + "/" + req.body.id
      )
    );

    res.json({ success: true });
  } else {
    res.json({ error: true });
  }
});

app.listen(80, () => {
  console.log("Server started on port 80");
});
