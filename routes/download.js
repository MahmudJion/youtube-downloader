var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');

router.get('/', function(req, res, next) {
  var url = req.query.url;
  
  // Validate URL is provided
  if (!url) {
    return res.status(400).render('error', { 
      message: 'URL is required',
      error: { status: 400, stack: 'Please provide a YouTube URL' }
    });
  }

  // Validate URL is a valid YouTube URL
  if (!ytdl.validateURL(url)) {
    return res.status(400).render('error', { 
      message: 'Invalid YouTube URL',
      error: { status: 400, stack: 'Please provide a valid YouTube URL' }
    });
  }

  // Set response headers for download
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  
  // Get info and pipe the video
  ytdl(url, { format: 'highest' })
    .on('error', function(err) {
      console.error('Download error:', err);
      res.status(500).render('error', { 
        message: 'Download Error',
        error: { status: 500, stack: err.message }
      });
    })
    .pipe(res)
    .on('error', function(err) {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).render('error', { 
          message: 'Stream Error',
          error: { status: 500, stack: err.message }
        });
      }
    });
});

module.exports = router;