import React, {useMemo, useState} from 'react';

export const App = () =>
{
	const [episodeName, setEpisodeName] = useState();
	const [linesInput, setLinesInput] = useState();
	const [fontSize, setFontSize] = useState();

	const lines = useMemo(() =>
	{
		if (!linesInput || linesInput < 1)
			return 1;
		else
			return linesInput;
	}, [linesInput]);

	const video = useMemo(() =>
	{
		let _text = '?text=' + episodeName;
		let _font = fontSize ? ('&font_size=' + fontSize) : '';
		let _lines = '&lines=' + lines;
		return window.location.protocol + '//' + url('/api/makeVideo' + _text + _lines + _font);
	}, [episodeName, linesInput, fontSize]);

	return <div className="container">
		<div className="mb-3">
			<label htmlFor="episode-name" className="form-label">Write episode name</label>
			<textarea
				className="form-control"
				id="episode-name"
				rows="3"
				value={episodeName}
				onChange={e => setEpisodeName(e.target.value)}/>
		</div>
		<div className="mb-3">
			<label htmlFor="lines-number" className="form-label">Split into lines</label>
			<input
				className="form-control"
				id="lines-number"
				type="number"
				placeholder="Default value: 1"
				value={linesInput}
				onChange={e => setLinesInput(parseInt(e.target.value))}/>
		</div>
		<div className="mb3">
			<label htmlFor="select-font-size" className="form-label">Select font size</label>
			<select
				className="form-select"
				id="select-font-size"
				aria-label="Default select example"
				value={fontSize}
				onChange={(e) => setFontSize(e.target.value)}>
				<option selected>Select a size</option>
				<option value="small">Small</option>
				<option value="normal">Normal</option>
				<option value="large">Large</option>
			</select>
		</div>
		<div className="mt-3">
			<a
				href={video}
				download={episodeName + '.mp4'}>
				<button
					type="button"
					className="btn btn-primary">
					Generate intro
				</button>
			</a>
		</div>
	</div>;
};
