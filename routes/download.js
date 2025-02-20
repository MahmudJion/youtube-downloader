var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');

router.get('/', function(req, res, next) {
  var url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: 'mp4' }).pipe(res);
});

module.exports = router;