var rows;
var dateStrList = new Array();
var landType = "";
var areaType = "";

$(document).ready(function() {
	setBind();
	setDateStrList();
	$.ajax({
		type: "GET",
        url : "https://script.google.com/macros/s/AKfycbwXig5n3LymBlnmLOm_7oEd240oILHTGbg8GtA39i2FR8tMRCsegrQc2OvEzGtWLAjH6Q/exec",
		data: {
			"cmd" : "get"
		},
        success : function(result) {
            rows = result;
            execute1();
 		}
	});
});

function setBind() {
    $("#landType").on("change", function() {
        landType = $(this).val();
        execute2();
    });

    $("#areaType").on("change", function() {
        areaType = $(this).val();
        execute3();
    });
}

function setDateStrList() {
	var dt = new Date();
	for (var i = 0; i < 3; i++) {
		dateStrList[i] = dt.getFullYear() + "-" + getNumberStr(dt.getMonth() + 1);
		dt.setMonth(dt.getMonth() - 1);
	}
}

function getNumberStr(number) {
	if (number < 10)
		return "0" + number;
	return number;
}

function execute1() {
    setLandType();
    execute2();
}

function execute2() {
    setAreaType();
    execute3();
}

function execute3() {
	setLandHeader();
    setLandTitle();
    setLandContents();
}

function setLandType() {
    var typeSet = new Set();
    for (var row of rows) {
        typeSet.add(row["단지명"]);
    }
    for (var type of typeSet) {
        $('#landType').append($('<option/>', { value : type, text : type }));
    }
    var iter = typeSet.values();
    landType = iter.next().value;
}

function setAreaType() {
    $('#areaType option').remove();
    areaType = "";
    var areaSet = new Set();
    for (var row of rows) {
        if (landType != row["단지명"])
            continue;
        areaSet.add(row["전용면적"]);
    }
    var areaArray = Array.from(areaSet);
    areaArray.sort();
    $('#areaType').append($('<option/>', { value : "", text : "전체" }));
    for (var area of areaArray) {
        $('#areaType').append($('<option/>', { value : area, text : area }));
    }
}

function setLandHeader() {
	var areaTypeText = "전체";
	if (areaType != "") {
		areaTypeText = areaType;
	}
    $("#landHeader").text(landType + " [" + areaTypeText + "]");
}

function setLandTitle() {
    $('#land tr').remove();
	$("#land").append($('<tr/>')
		.append($('<th/>', { html : '날짜' }))
		.append($('<th/>', { html : '면적(㎡)' }))
		.append($('<th/>', { html : '층' }))
		.append($('<th/>', { html : '금액(원)' }))
	);
}

function setLandContents() {
	for (var row of rows) {
        if (landType != row["단지명"])
            continue;
        if (areaType != "" && areaType != row["전용면적"])
            continue;
		var isNew = false;
		for (var i = 0; i < dateStrList.length; i++) {
			isNew = row['날짜'].toString().startsWith(dateStrList[i]);
			if (isNew)
				break;
		}
		$("#land").append($('<tr/>', {})
			.append($('<td/>', { html : row['날짜'], align : 'center' }))
			.append($('<td/>', { html : row['전용면적'], align : 'center'  }))
			.append($('<td/>', { html : row['층'], align : 'center'  }))
			.append($('<td/>', { html : ((isNew) ? '"<div class='new'>N</div>"' : '') + row['거래금액'], class : 'price' }))
		);
	}
}
