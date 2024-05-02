document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bookRequestForm").addEventListener("submit", function(event) {
        event.preventDefault();
        requestBooks();
    });

    document.getElementById("searchButton").addEventListener("click", searchBooks); // Assuming you have a button with id="searchButton"
});

function searchBooks() {
    let nameInput = document.getElementById("studentNameInput").value;
    const ctcInput = document.getElementById("studentCtcInput").value.trim().toLowerCase();
    const tableBody = document.getElementById("data_table").getElementsByTagName("tbody")[0];
    const data = JSON.parse(localStorage.getItem("tableData")) || [];

    // Normalize inputs
    nameInput = normalizeInput(nameInput);
    const reversedNameInput = reverseString(nameInput);  // Prepare reversed input for matching

    // Clear previous results
    tableBody.innerHTML = "";

    // Filter data where both the student name (normal or reversed) and CTC exactly match the inputs
    const matchedData = data.filter(row =>
        (row[3].toLowerCase() === nameInput || row[3].toLowerCase() === reversedNameInput) &&
        row[4].toLowerCase() === ctcInput
    );

    // Display matched data
    matchedData.forEach(book => {
        const row = tableBody.insertRow();
        // Indices: [0] Unit ID, [1] Book Name, [2] ISBN, [6] Date Signed Out, [7] Date to Return
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
    // Remove extra spaces and convert to lower case
    return input.trim().replace(/\s+/g, ' ').toLowerCase();
}

function reverseString(str) {
    // Reverse the input string
    return str.split('').reverse().join('');
}