$(document).ready(function() {
	$.ajax({
		type: "GET",
        //url : "https://script.google.com/macros/s/AKfycbyU8GSUExQma8iaXt4mhA_Z7yG1U-mKxhLC8d_89pFO_nbyrthN0bn5VZfzy3ASF7r_/exec",
        url : "https://script.google.com/macros/s/AKfycbwXig5n3LymBlnmLOm_7oEd240oILHTGbg8GtA39i2FR8tMRCsegrQc2OvEzGtWLAjH6Q/exec",
		data: {
			"cmd" : "get"
		},
        success : function(rows) {
			setLandTitle();
			setLandContents(rows);
		}
	});
});

function setLandTitle() {
	$("#land").append($('<tr/>')
		.append($('<th/>', { html : '날짜' }))
		.append($('<th/>', { html : '면적(㎡)' }))
		.append($('<th/>', { html : '층' }))
		.append($('<th/>', { html : '금액(만원)' }))
	);
}

function setLandContents(rows) {
	rows.reverse();
	for (var row of rows) {
		$("#land").append($('<tr/>', {})
			.append($('<td/>', { html : row['날짜'], align : 'center' }))
			.append($('<td/>', { html : row['전용면적'] }))
			.append($('<td/>', { html : row['층'] }))
			.append($('<td/>', { html : row['거래금액'] }))
		);
	}
}
