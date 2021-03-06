// dependency injections - `fetch`
function queryData(accessionId, fetch) {
	if (!fetch) fetch = window.fetch;
	return fetch('http://www.rcsb.org/pdb/rest/search?req=browser', {
		method: 'POST',
		body: `
			<orgPdbQuery>
				<queryType>org.pdb.query.simple.UpAccessionIdQuery</queryType>
				<description>Simple query for a list of UniprotKB Accession IDs: P50225</description>
				<accessionIdList>${accessionId}</accessionIdList>
			</orgPdbQuery>
			`,
		headers: {
			Accept: '*/*',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(res => {
		return res.text().then(text => {
			const ids = text.split('\n');
			ids.splice(-1);

			// get the four character pdb id
			return ids
				.map(id => id.split(':')[0])
				.filter(id => String(id).length === 4);
		});
	});
}

module.exports = queryData;
