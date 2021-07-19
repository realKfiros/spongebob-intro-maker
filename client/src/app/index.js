import React, {useMemo, useState} from 'react';

export const App = () =>
{
	const [episodeName, setEpisodeName] = useState();
	const [linesInput, setLinesInput] = useState();

	const lines = useMemo(() =>
	{
		if (!linesInput || linesInput < 1)
			return 1;
		else
			return linesInput;
	}, [linesInput]);

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
		<a
			href={window.location.protocol + '//' + url('/api/makeVideo?text=' + episodeName + '&lines=' + lines)}
			download={episodeName + '.mp4'}>
			<button
				type="button"
				className="btn btn-primary">
				Generate intro
			</button>
		</a>
	</div>;
};
