document.addEventListener("DOMContentLoaded", function() {
    loadAvailableBooks();

    document.getElementById("bookRequestForm").addEventListener("submit", function(event) {
        event.preventDefault();
        requestBooks();
    });
});

function loadAvailableBooks() {
    const tableBody = document.getElementById("data_table").getElementsByTagName("tbody")[0];
    const data = JSON.parse(localStorage.getItem("tableData")) || [];

   
    const availableBooks = data.filter(row => row[3].trim() === ""); 
    tableBody.innerHTML = "";

    availableBooks.forEach((book, index) => {
        const row = tableBody.insertRow();
 
        const indicesToShow = [0, 1, 2]; 
        indicesToShow.forEach(index => {
            const cell = row.insertCell();
            cell.textContent = book[index];
        });

        const actionCell = row.insertCell();
        actionCell.innerHTML = `<input type="checkbox" name="bookRequest" value="${book[0]}">`;
    });
}

function searchAvailableBooks() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("data_table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1]; 
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function requestBooks() {
    const checkboxes = document.querySelectorAll('input[name="bookRequest"]:checked');
    let selectedBooks = [];
    checkboxes.forEach((checkbox) => {
        selectedBooks.push(checkbox.value);
    });

    
    alert("Requesting books with IDs: " + selectedBooks.join(", "));

   
    checkboxes.forEach((checkbox) => checkbox.checked = false);
}

function searchBooks() {
    const nameInput = document.getElementById("studentNameInput").value.trim().toLowerCase();
    const ctcInput = document.getElementById("studentCtcInput").value.trim().toLowerCase();
    const tableBody = document.getElementById("data_table").getElementsByTagName("tbody")[0];
    const data = JSON.parse(localStorage.getItem("tableData")) || [];

  
    tableBody.innerHTML = "";

   
    const filteredData = data.filter(row => 
        (row[3].toLowerCase() === nameInput && nameInput !== "") || 
        (row[4].toLowerCase() === ctcInput && ctcInput !== "")
    );

    
    filteredData.forEach(book => {
        const row = tableBody.insertRow();
       
        const indicesToShow = [0, 1, 2, 3, 6, 7];
        indicesToShow.forEach(index => {
            const cell = row.insertCell();
            cell.textContent = book[index];
        });
    });

    if (tableBody.rows.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No matching records found</td></tr>";
    }
}
