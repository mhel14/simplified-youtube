require("dotenv").config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server is running at port ${port}`));
app.use(cors());
app.use(fileUpload());

const uploadHandler = (req, res) => {
  const uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/files/${fileName}`,
    (err) => {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `${__dirname}/files/${req.files.file.name}`,
      })
    }
  );
}

const playVideoHandler = (req, res) => {
  // console.log('id ? ', req.query.id);
  fs.readdir(`${__dirname}/files`, (err, files) => {
    if(err) return err;
    
    if(files.length) {
      res.writeHead(200, {'content-Type': 'video/mp4'});
      const holder = fs.createReadStream(`${__dirname}/files/${req.query.id}`);
      holder.pipe(res);
    }
  });
}

const videoListingHandler = (req, res) => {
  fs.readdir(`${__dirname}/files`, (err, files) => {
    if(err) return err;

    res.json(files).status(200);
  });
}

app.post('/upload', uploadHandler);
app.get('/play_video', playVideoHandler);
app.get('/', videoListingHandler);

module.exports = {
  uploadHandler,
  playVideoHandler,
  videoListingHandler
}