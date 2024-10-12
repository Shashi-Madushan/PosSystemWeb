(function () {


    let items = null;
    let customers = null;
    async function fetchData() {
        try {
            const cusRes = await fetch('../jsones/customers.json');
            if (!cusRes.ok) throw new Error('Customer JSON not found');
            const cusData = await cusRes.json();

            const res = await fetch('../jsones/items.json');
            if (!res.ok) throw new Error('Items JSON not found');
            const data = await res.json();

            console.log(cusData, data); // Check if data is fetched
            customers = cusData;
            items = data;
            renderDynamicSection(items, 'items');
        } catch (error) {
            console.error('Error fetching data:', error.message); // Log the actual error
        }


    }

    let orderItems = [];
    let selectedCustomer = null;
    let activeSection = 'items'; // Tracks which section is currently active

    // Render dynamic section (Items or Customers)
    function renderDynamicSection(data, type) {
        const section = document.getElementById('dynamicSection');
        section.innerHTML = '';

        activeSection = type; // Set active section

        if (type === 'items') {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'col-4 p-2';
                div.innerHTML = `
                    <div class="card h-100 ">
                        <div class=" p-2  text-center align-content-around">
                            <img class="img-fluid" src="${item.imgSrc}" alt="${item.name}">
                            <h5>${item.name}</h5>
                            <div class="d-flex justify-content-between" >
                            <p>Stock: ${item.stock}</p>
                            <p>Price: Rs ${item.price}</p>
                           </div>
                        </div>
                    </div>
                `;
                div.onclick =() =>openItemModal(item.id)
                section.appendChild(div);
            });
        } else if (type === 'customers') {
            const table = document.createElement('table');
            table.className = 'table table-hover  ';

            // Table heading
            const thead = document.createElement('thead');
            thead.className='thead-dark sticky-top'
            thead.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
            `;
            table.appendChild(thead);

            // Table body
            const tbody = document.createElement('tbody');
            data.forEach(customer => {
                const row = document.createElement('tr');
                row.onclick = () => selectCustomer(customer.id) ;
                row.innerHTML = `
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            section.appendChild(table);
        }
    }


    // Show items or customers based on button click
    document.getElementById('showItemsBtn').addEventListener('click', () => renderDynamicSection(items, 'items'));
document.getElementById('showCustomersBtn').addEventListener('click', () => renderDynamicSection(customers, 'customers'));



// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (activeSection === 'items') {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
        renderDynamicSection(filteredItems, 'items');
    } else if (activeSection === 'customers') {
        const filteredCustomers = customers.filter(customer => customer.phone.toLowerCase().includes(searchValue) || customer.phone.toLowerCase().includes(searchValue));
        renderDynamicSection(filteredCustomers, 'customers');
    }
});

// Open item modal
window.openItemModal = function (itemId) {
    const item = items.find(item => item.id === itemId);
    $('#itemModal').modal('show');
    $('#saveItemBtn').off('click').on('click', () => addItemToOrder(item));
}

// Add item to order
function addItemToOrder(item) {
    const qty = parseInt(document.getElementById('itemQty').value);
    if (qty <= item.stock) {
        orderItems.push({ ...item, qty });
        item.stock -= qty;
        renderOrderItems();
        $('#itemModal').modal('hide');

        renderDynamicSection(items, 'items');
    } else {
        alert('Insufficient stock');
    }
}

// Render order items in the payment section
function renderOrderItems() {
    const list = document.getElementById('orderItemsList');
    list.innerHTML = '';

    orderItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                ${item.name} x ${item.qty}
                <span>Rs ${item.qty * item.price}</span>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
            `;
        list.appendChild(li);
    });

    calculateTotal();
}

// Remove item from order
window.removeItem = function (index) {
    const item = orderItems.splice(index, 1)[0];
    items.find(i => i.id === item.id).stock += item.qty;
    renderOrderItems();
    renderDynamicSection(items, 'items');
}

// Select customer
window.selectCustomer = function  selectCustomer(customerId) {
    selectedCustomer = customers.find(c => c.id === customerId);
    document.getElementById('selectedCustomer').textContent = selectedCustomer.name;
    document.getElementById('selectedCustomerPhone').textContent = selectedCustomer.phone;
    $('#customerModal').modal('hide');
}

// Calculate subtotal, discount, and total
function calculateTotal() {
    let subtotal = 0;
    orderItems.forEach(item => subtotal += item.qty * item.price);

    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const total = subtotal - (subtotal * discount / 100);

    document.getElementById('subtotal').textContent = `Rs ${subtotal}`;
    document.getElementById('total').textContent = `Rs ${total}`;
}
//  // Initialize with showing items by default
//  renderDynamicSection(items, 'items');
fetchData();
}) ();
