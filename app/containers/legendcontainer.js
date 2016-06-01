var React= require('react');
var Legend = require('../components/mainui/legend');

var legendcontain= React.createClass({
	getCheckedBoxes: function(chkbox1, chkbox2) {
		var checkboxes1 = document.getElementsByName(chkbox1);
		var checkboxes2 = document.getElementsByName(chkbox2);
		var checkboxesChecked = [];
		// loop over them all
		for (var i=0; i<checkboxes1.length; i++) {
			// And stick the checked ones onto an array...
			console.log(checkboxes1[i])
			if (checkboxes1[i].checked) {
				checkboxesChecked.push(checkboxes1[i].value);
			}
		}
		for (var i=0; i<checkboxes2.length; i++) {
			// And stick the checked ones onto an array...
			if (checkboxes2[i].checked) {
				checkboxesChecked.push(checkboxes2[i].value);
			}
		}

		// Return the array if it is non-empty, or null
		var fin= checkboxesChecked.length > 0 ? checkboxesChecked : []
		console.log(fin)
		this.props.updateChecked(fin);
	},
	render: function () {
		return (
			<Legend 
				getCheckedBoxes={this.getCheckedBoxes}/>
		)
	}
});

module.exports = legendcontain;