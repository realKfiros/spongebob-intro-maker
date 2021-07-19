const { Router } = require('express');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
let router = Router();

const chunkify = (a, n, balanced) =>
{
	if (n < 2)
		return [a];

	let len = a.length,
		out = [],
		i = 0,
		size;

	if (len % n === 0)
	{
		size = Math.floor(len / n);
		while (i < len)
			out.push(a.slice(i, i += size));
	}

	else if (balanced)
	{
		while (i < len)
		{
			size = Math.ceil((len - i) / n--);
			out.push(a.slice(i, i += size));
		}
	}

	else
	{

		n--;
		size = Math.floor(len / n);
		if (len % size === 0)
			size--;
		while (i < size * n)
			out.push(a.slice(i, i += size));
		out.push(a.slice(size * n));

	}

	return out;
};

const splitIntoLines = (text, numOfLines = 1) =>
{
	let words = text.split(' ');
	let lines = chunkify(words, numOfLines, true);
	return lines.map(line => line.join(' '));
};

ffmpeg.setFfmpegPath(ffmpegPath);

router.get('/makeVideo', (req, res) =>
{
	let videoPath = path.join(__dirname, 'assets/template1.mp4');
	let fontPath = path.join(__dirname, 'assets/font.ttf');

	res.writeHead(200, {
		'Content-Type': 'video/mp4',
	});

	let lines = splitIntoLines(req.query.text, req.query.lines || 1);

	const makeY = (length, index) =>
	{
		if (length === 1)
			return '(h-text_h)/2';
		let chunk = `(h/${length})`;
		return `(${chunk}-text_h+${chunk}*${index})-(1/${length})*${chunk}`;
	};

	// height for one line: '(h-text_h)/2'
	ffmpeg(videoPath)
		.outputOptions(['-movflags isml+frag_keyframe'])
		.videoFilters(lines.map((line, index) =>
			({
				filter: 'drawtext',
				options: {
					enable: "between(t,0.2,2.5)",
					fontfile: fontPath,
					text: line,
					fontsize: 75,
					fontcolor: '#e9efa9',
					x: '(w-text_w)/2',
					y: makeY(lines.length, index),
					shadowcolor: 'black',
					shadowx: 2,
					shadowy: 2
				}
			})
		))
		.toFormat('mp4')
		.withAudioCodec('copy')
		.on('error', () => undefined)
		.on('end', () => undefined)
		.on('progress', () => undefined)
		.pipe(res, {end: true});
});

module.exports = router;
