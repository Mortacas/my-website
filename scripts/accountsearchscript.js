document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bookRequestForm").addEventListener("submit", function(event) {
        event.preventDefault();
        requestBooks();
    });

    document.getElementById("searchButton").addEventListener("click", searchBooks);
});

function searchBooks() {
    let nameInput = document.getElementById("studentNameInput").value;
    const ctcInput = document.getElementById("studentCtcInput").value.trim().toLowerCase();
    const tableBody = document.getElementById("data_table").getElementsByTagName("tbody")[0];
    const data = JSON.parse(localStorage.getItem("tableData")) || [];

    
    nameInput = normalizeInput(nameInput);
    const reversedNameInput = reverseString(nameInput);  
   
    tableBody.innerHTML = "";

    const matchedData = data.filter(row =>
        (row[3].toLowerCase() === nameInput || row[3].toLowerCase() === reversedNameInput) &&
        row[4].toLowerCase() === ctcInput
    );

    matchedData.forEach(book => {
        const row = tableBody.insertRow();
       
        const indicesToShow = [0, 1, 2, 6, 7];
        indicesToShow.forEach(index => {
            const cell = row.insertCell();
            cell.textContent = book[index];
        });
    });

    if (matchedData.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No matching records found. Please verify the details and try again.</td></tr>";
    }
}
function normalizeInput(input) {   
    return input.trim().replace(/\s+/g, ' ').toLowerCase();
}

function reverseString(str) {
    return str.split('').reverse().join('');
}