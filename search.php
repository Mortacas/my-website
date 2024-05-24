<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Catalog - Available Books</title>
    <link rel="stylesheet" href="css/tableStyles.css">
    <link rel="stylesheet" href="css/buttonStyles.css">
</head>

<body>
    <header>
        <div class="search-container">
            <a href="index.php"><img src="images/mvpoclogo2.png" alt="OC Logo" class="ocicon"></a>
            <input type="text" id="searchInput" placeholder="Search available books...">
            <button type="submit">Request Selected Books</button>
        </div>
    </header>

    <main>
        <form id="bookRequestForm" method="POST" action="">
            <label for="studentNameInput">Student Name:</label>
            <input type="text" id="studentNameInput" name="studentName">
            <br>
            <label for="studentCtcInput">CTC:</label>
            <input type="text" id="studentCtcInput" name="studentCtc">
            <br>
            <button type="submit" id="searchButton">Search</button>
            <table id="data_table">
                <thead>
                    <tr>
                        <th>Unit ID</th>
                        <th>Book Name</th>
                        <th>ISBN</th>
                        <th>Date Signed Out</th>
                        <th>Date to Return</th>
                    </tr>
                </thead>
                <tbody>
                    <?php include 'common_functions.php'; handleBookSearch(); ?>
                </tbody>
            </table>
        </form>
    </main>

    <footer>
        <p>&copy; 2024 Library. All rights reserved.</p>
        <br>
        <a href="#">Back to Top</a>
    </footer>
</body>

</html>
