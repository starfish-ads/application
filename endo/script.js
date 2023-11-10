function submitForm() {
    var date_selection = document.querySelector('input[name="date"]:checked');
    var area_selection = document.querySelector('input[name="area"]:checked');
    var housing_selection = document.querySelector('input[name="housing"]:checked');
    var family_selection = document.querySelector('input[name="family"]:checked');
    
    if(!date_selection || !area_selection || !housing_selection || !family_selection) {
    alert('全てのグループで選択してください。');
    return;
    }

    var selections = {
    date: date_selection.value,
    area: area_selection.value,
    housing: housing_selection.value,
    family: family_selection.value
    };

    google.script.run.withSuccessHandler(updateResult).processForm(selections);
}

function updateResult(output) {
    document.getElementById("result").innerText = output;
}

function processForm(selections) {
    var date = selections.date;
    var area = selections.area;
    var housing = selections.housing;
    var family = selections.family;

    if(date === "n+0"){
    return "ライフでんき";
    } else if (date === "n+2") {
    return "アースインフィニティ";
    } else if (date === "n+3") {
    if (housing === "mansion") {
        if ((family === "1" || family === "2") && area === "tokyo") {
            return "関西電力";
        } else if (family === "1") {
            if (["tohoku", "hokkaido", "hokuriku", "kyushu", "other"].includes(area)) {
                return "アースインフィニティ";
            }
        } else if ((family === "3")) {
            if (["tokyo"].includes(area)) {
                return "バリューでんき（CDエナジー商流）";
            }
        } else if ((family === "2" || family === "3")) {
            if (["hokkaido", "hokuriku", "kyushu"].includes(area)) {
                return "バリューでんき（大阪ガス商流）";
            }
        } else if (family === "3") {
            if (["tohoku", "hokkaido", "hokuriku", "kyushu", "other"].includes(area)) {
                return "バリューでんき（大阪ガス商流）";
            }
        }
    } else if (housing === "home") {
        if (area === "tokyo") {
            return "バリューでんき（CDエナジー商流）";
        } else if (["tohoku", "hokkaido", "hokuriku", "kyushu", "other"].includes(area)) {
            return "バリューでんき（大阪ガス商流）";
        }
    }
    }

return "条件に合致するプロバイダーが見つかりません";
}