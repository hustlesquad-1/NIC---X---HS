// Sample inventory data
const inventory = [
    { id: 1, name: 'Syringes', quantity: 100, supplier: 'MedSupplies', price: 2.50, expirationDate: '2024-12-01' },
    { id: 2, name: 'IV Bags', quantity: 50, supplier: 'HealthPro', price: 10.00, expirationDate: '2023-09-30' },
];

// Sample records
const reorderRecords = [
    { name: 'Syringes', quantity: 10, supplier: 'MedSupplies', price: 2.50, reorderLevel: 20 },
    { name: 'IV Bags', quantity: 5, supplier: 'HealthPro', price: 10.00, reorderLevel: 15 }
];

const distributionRecords = [
    { name: 'Syringes', quantity: 30, location: 'Ward A', date: '2024-09-10' },
    { name: 'IV Bags', quantity: 10, location: 'Emergency Room', date: '2024-09-12' }
];

const wasteRecords = [
    { name: 'Syringes', quantity: 5, date: '2024-09-15' },
    { name: 'IV Bags', quantity: 2, date: '2024-09-16' }
];

// Function to show the appropriate section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Function to show the modal for adding items
function showAddItemForm() {
    document.getElementById('addItemModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

// Handle form submission
document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const supplier = document.getElementById('itemSupplier').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const expirationDate = document.getElementById('itemExpiration').value;

    const newItem = {
        id: inventory.length + 1,
        name,
        quantity,
        supplier,
        price,
        expirationDate
    };

    inventory.push(newItem);
    displayStock();
    closeModal();
});

// Display stock items
function displayStock() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = '';

    inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <strong>${item.name}</strong> (${item.quantity} units)
            <br><em>Supplier:</em> ${item.supplier} <em>Price:</em> $${item.price.toFixed(2)}
            <br><em>Expires:</em> ${item.expirationDate}
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        stockList.appendChild(itemElement);
    });
}

// Remove item from inventory
function removeItem(id) {
    const index = inventory.findIndex(item => item.id === id);
    if (index !== -1) {
        inventory.splice(index, 1);
        displayStock();
    }
}

// Update dashboard stats
function updateDashboard() {
    const totalStock = inventory.reduce((total, item) => total + item.quantity, 0);
    const lowStockAlerts = inventory.filter(item => item.quantity < 20).length;
    const pendingReorders = reorderRecords.length;
    const wasteReport = wasteRecords.length;

    document.getElementById('total-stock').innerText = totalStock + ' items';
    document.getElementById('low-stock').innerText = lowStockAlerts + ' items';
    document.getElementById('pending-reorders').innerText = pendingReorders + ' items';
    document.getElementById('waste-report').innerText = wasteReport + ' items';
}

// Generate detailed report
function generateReport() {
    const totalItems = inventory.reduce((total, item) => total + item.quantity, 0);
    const totalValue = inventory.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);

    // Detailed Report Content
    let reportContent = `
        <h3>Detailed Inventory Report</h3>
        <p><strong>Total Items in Stock:</strong> ${totalItems}</p>
        <p><strong>Total Inventory Value:</strong> $${totalValue}</p>
        <h4>Item Breakdown:</h4>
        <ul>
    `;

    inventory.forEach(item => {
        reportContent += `
            <li>
                <strong>${item.name}</strong> - ${item.quantity} units at $${item.price.toFixed(2)} each. 
                <em>Expires on ${item.expirationDate}</em>
            </li>
        `;
    });

    reportContent += '</ul>';
    document.getElementById('report-output').innerHTML = reportContent;
}

// On window load
window.onload = function () {
    updateDashboard();
    displayStock();
    displayReorderRecords();
    displayDistributionRecords();
    displayWasteRecords();
};

// Display reorder records
function displayReorderRecords() {
    const reorderList = document.getElementById('reorder-list');
    reorderList.innerHTML = '';

    reorderRecords.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = `
            <strong>${record.name}</strong> (${record.quantity} units)
            <br><em>Supplier:</em> ${record.supplier} <em>Price:</em> $${record.price.toFixed(2)}
            <br><em>Reorder Level:</em> ${record.reorderLevel} units
        `;
        reorderList.appendChild(recordElement);
    });
}

// Display distribution records
function displayDistributionRecords() {
    const distributionList = document.getElementById('distribution-list');
    distributionList.innerHTML = '';

    distributionRecords.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = `
            <strong>${record.name}</strong> - Distributed ${record.quantity} units to ${record.location}
            <br><em>Date:</em> ${record.date}
        `;
        distributionList.appendChild(recordElement);
    });
}

// Display waste records
function displayWasteRecords() {
    const wasteList = document.getElementById('waste-list');
    wasteList.innerHTML = '';

    wasteRecords.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = `
            <strong>${record.name}</strong> - Waste of ${record.quantity} units
            <br><em>Date:</em> ${record.date}
        `;
        wasteList.appendChild(recordElement);
    });
}

