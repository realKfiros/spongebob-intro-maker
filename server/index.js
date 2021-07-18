const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
let router = Router();

ffmpeg.setFfmpegPath(ffmpegPath);

router.get('/makeVideo', (req, res) =>
{
	let videoPath = path.join(__dirname, 'assets/template1.mp4');
	let fontPath = path.join(__dirname, 'assets/font.ttf');

	let stream = fs.createWriteStream(path.join(__dirname, 'assets/output.mp4'));

	let stat = fs.statSync(videoPath);

	res.writeHead(200, {
		'Content-Type': 'video/mp4',
	});

	ffmpeg(videoPath)
		.outputOptions(['-movflags isml+frag_keyframe'])
		.videoFilters([
			{
				filter: 'drawtext',
				options: {
					enable: "between(t,0.2,2.5)",
					fontfile: fontPath,
					text: req.query.text,
					fontsize: 75,
					fontcolor: '#e9efa9',
					x: '(w-text_w)/2',
					y: '(h-text_h)/2',
					shadowcolor: 'black',
					shadowx: 2,
					shadowy: 2
				}
			}
		])
		.toFormat('mp4')
		.withAudioCodec('copy')
		.on('error', function(err,stdout,stderr) {})
		.on('end', function() {})
		.on('progress', function(progress) {})
		.pipe(res, {end: true});
});

module.exports = router;
