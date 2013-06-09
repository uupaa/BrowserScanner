window.onload = function() {
    var table = document.createElement("table");
    table.className = "spec";
    var thead = table.createTHead();
    var row = thead.insertRow();
    row.insertCell(0).innerHTML = 'Class';
    row.insertCell(1).innerHTML = '';
    row.insertCell(2).innerHTML = 'Spec';

    var tbody = table.createTBody();

    table.createCaption().innerHTML = userAgent(true);

    result.forEach(function(item) {
        var row = tbody.insertRow(-1);
        row.insertCell(0).innerHTML = item.Class;

        var cell = row.insertCell(1);
        if (typeof item.state === "boolean") {
            cell.className = item.state ? "ok" : "ng";
        } else {
            cell.className = "warn";
        }
        row.insertCell(2).innerHTML = '<a href="' + item.spec + '" target="_blank">' +
                                      item.id + '</a>';
    });

    document.body.appendChild(table);
};
