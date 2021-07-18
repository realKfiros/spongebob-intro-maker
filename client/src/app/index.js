import React, {useEffect, useState} from 'react';

export const App = () =>
{
	const [episodeName, setEpisodeName] = useState();
	const [video, setVideo] = useState();

	useEffect(() =>
	{
		if (video)
		{
			let mediaElem = document.getElementById("player");
			mediaElem.load();
		}
	}, [video]);

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
		<a
			href={window.location.protocol + '//' + url('/api/makeVideo?text=' + episodeName)}
			download={episodeName + '.mp4'}>
			<button
				type="button"
				className="btn btn-primary">
				download
			</button>
		</a>
	</div>;
};
