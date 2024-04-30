window.onload = function() {
    if (localStorage.getItem("tableData")) {
        loadTableData();
    }
};

function loadTableData() {
    const table = document.getElementById("data_table");
    const data = JSON.parse(localStorage.getItem("tableData"));
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    data.forEach((rowData, rowIndex) => {
        addRowToTable(rowData);
    });
}

function saveTableData() {
    const table = document.getElementById("data_table");
    let data = [];
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowData = [];
        for (let j = 0; j < 8; j++) {
            rowData.push(row.cells[j].innerText);
        }
        data.push(rowData);
    }
    localStorage.setItem("tableData", JSON.stringify(data));
}

function addRow() {
    var inputs = [];
    for (let i = 1; i <= 8; i++) {
        inputs.push(document.getElementById("input" + i).value);
        document.getElementById("input" + i).value = ""; 
    }
    addRowToTable(inputs);
    saveTableData();
}

function addRowToTable(inputs) {
    var table = document.getElementById("data_table");
    var newRow = table.insertRow(table.length);
    for (let i = 0; i < 8; i++) {
        let cell = newRow.insertCell(i);
        cell.innerText = inputs[i]; 
    }
    var cell = newRow.insertCell(8);
    cell.innerHTML = `<button onclick="editRow(this)">Edit</button><button onclick="deleteRow(this)">Delete</button>`;
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("data_table").deleteRow(i);
    saveTableData();
}

function editRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    var row = document.getElementById("data_table").rows[i];
    for (let j = 0; j < 8; j++) {
        var cell = row.cells[j];
        var data = cell.innerText;
        cell.innerHTML = `<input type='text' value='${data}' id='edit${j + 1}'>`;
    }
    row.cells[8].innerHTML = `<button onclick="saveRow(this)">Save</button>`;
}

function saveRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    var row = document.getElementById("data_table").rows[i];
    for (let j = 0; j < 8; j++) {
        var input = document.getElementById(`edit${j + 1}`).value;
        row.cells[j].innerText = input;
    }
    row.cells[8].innerHTML = `<button onclick="editRow(this)">Edit</button><button onclick="deleteRow(this)">Delete</button>`;
    saveTableData();
}

function importCSV() {
    const input = document.getElementById('fileInput');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const rows = text.split('\n').map(row => row.split(','));
            rows.forEach(row => {
                if (!rowExists(row)) {
                    addRowToTable(row);
                }
            });
            saveTableData();
        };
        reader.readAsText(file);
    }
}

function rowExists(row) {
    const table = document.getElementById("data_table");
    for (let i = 1; i < table.rows.length; i++) {
        let tableRow = table.rows[i];
        let match = true;
        for (let j = 0; j < 8; j++) {
            if (tableRow.cells[j].innerText.trim() !== row[j].trim()) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
}

function exportToCSV() {
    const data = JSON.parse(localStorage.getItem("tableData"));
    if (!data) {
        alert("No data to export!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Unit ID,Book Name,Book Name,ISBN,Student Name,Student CTC,Student Email,Signed out Date,Return Date\n"; // Add headers

    data.forEach(row => {
        let rowContent = row.join(",");
        csvContent += rowContent + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tableData.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
}