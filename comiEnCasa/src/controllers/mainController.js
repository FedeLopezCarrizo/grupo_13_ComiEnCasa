const controller = {
	index: (req, res) => {
		res.render('index');
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;