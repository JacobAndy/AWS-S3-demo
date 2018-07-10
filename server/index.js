require("dotenv").config();
const express = require("express"),
  app = express(),
  PORT = 3001,
  cors = require("cors"),
  AWS = require("aws-sdk"),
  { json } = require("body-parser");

app.use(json());
app.use(cors());

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});
var allKeys = [];
// function listAllKeys(token, cb) {
var opts = {
  Bucket: "pastorraymp3",
  MaxKeys: 100
};
//   if (token) opts.ContinuationToken = token;

//   s3.listObjects(opts, function(err, data) {
//     console.log("DATA: ", data);
//     if (err) return console.log(err);
//     allKeys = data.Contents.map(
//       val => `https://s3.amazonaws.com/pastorraymp3/${val.Key}`
//     );

// if (data.IsTruncated) listAllKeys(data.NextContinuationToken, cb);
// else cb();
//   });
// }
app.get("/messages", (req, res) => {
  s3.listObjects(opts, (err, data) => {
    console.log("DATA: ", data);
    if (err) return console.log(err);
    allKeys = data.Contents.map(
      val => `https://s3.amazonaws.com/pastorraymp3/${val.Key}`
    );
    console.log("All Keys", allKeys);
    res.status(200).json(allKeys);
  });

  //   listAllKeys();
  //   res.status(200).json(allKeys);
  //   console.log(allKeys);
});

app.listen(PORT, () => console.log(`Magic Happens on port ${PORT}`));
