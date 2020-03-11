function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const [, bearerToken] = bearerHeader.split(' ');
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

module.exports = verifyToken;