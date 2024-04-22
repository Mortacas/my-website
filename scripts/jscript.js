window.onload = function() {
    fetchCategories();
};

function fetchCategories() {
    fetch('backend.php?action=fetch')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('categoriesTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(category => {
                let row = tbody.insertRow();
                row.innerHTML = `
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td>${category.price}</td>
                    <td>${category.type}</td>
                    <td>
                        <button onclick="editCategory(${category.id})">Edit</button>
                        <button onclick="deleteCategory(${category.id})">Delete</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function submitForm() {
    const form = document.getElementById('categoryForm');
    const formData = new FormData(form);
    formData.append('action', form.categoryId.value ? 'update' : 'add');

    fetch('backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchCategories(); // Refresh the table
        form.reset(); // Reset form after submission
    })
    .catch(error => console.error('Error submitting form:', error));
}

function editCategory(id) {
    fetch(`backend.php?action=fetchSingle&id=${id}`)
        .then(response => response.json())
        .then(data => {
            const category = data;
            document.getElementById('categoryId').value = category.id;
            document.getElementById('name').value = category.name;
            document.getElementById('description').value = category.description;
            document.getElementById('price').value = category.price;
            document.getElementById('type').value = category.type;
        })
        .catch(error => console.error('Error fetching category:', error));
}

function deleteCategory(id) {
    fetch(`backend.php?action=delete&id=${id}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log('Delete Success:', data);
            fetchCategories(); // Refresh the table
        })
        .catch(error => console.error('Error deleting category:', error));
}

function clearForm() {
    const form = document.getElementById('categoryForm');
    form.reset();
    document.getElementById('categoryId').value = ''; // Ensure the hidden ID is cleared
}
