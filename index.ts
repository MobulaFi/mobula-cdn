import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
const app = express();
import config from "./config";
import { findExtension, extensions } from "./utils";

app.use(bodyParser.json());

app.get("/*", (req, res) => {
  const processedExtensions = findExtension(req.url);

  for (const ext of processedExtensions) {
    console.log("Processing " + ext);
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
  console.log(req.body);
  if (req.body.type && req.body.id && req.body.auth === config.AUTH) {
    const randomImageId = Math.floor(Math.random() * 10);
    fs.copyFileSync(
      path.resolve(
        __dirname,
        ".",
        "content/" + req.body.type + "/" + randomImageId + ".png"
      ),
      path.resolve(
        __dirname,
        ".",
        "content/" + req.body.type + "/" + req.body.id + ".png"
      )
    );

    fs.writeFileSync(
      path.resolve(
        __dirname,
        ".",
        "content/" + req.body.type + "/" + req.body.id + ".json"
      ),
      JSON.stringify({
        name: "Mobula Member #" + req.body.id,
        description: "First NFT earned by a Mobula member.",
        image: "https://cdn.mobula.fi/members/" + req.body.id + ".png",
        attributes: [
          { trait_type: "Created at", value: new Date().toISOString() },
        ],
      })
    );

    res.json({ success: true });
  } else {
    res.json({ error: true });
  }
});

app.listen(80, () => {
  console.log("Server started on port 80");
});
