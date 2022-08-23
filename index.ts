import express from "express";
import fs from "fs";
import path from "path";
const app = express();
const extensions = ["", ".png", ".jpg", ".json"];

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

app.listen(80, () => {
  console.log("Server started on port 80");
});
