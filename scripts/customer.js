
(function () {
    let selectedCustomer = null;

    function renderCustomers(customersToRender) {
        const tableBody = document.getElementById('customerTableBody');
        tableBody.innerHTML = '';

        customersToRender.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
            `;

            row.addEventListener('click', () => {
                openEditCustomerModal(customer);
            });

            tableBody.appendChild(row);
        });
    }

    function openEditCustomerModal(customer) {
        selectedCustomer = customer;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerPhone').value = customer.phone;
        document.getElementById('customerAddress').value = customer.address;
        $('#editCustomerModal').modal('show');
    }

    function saveCustomerChanges() {
        if (selectedCustomer) {
            selectedCustomer.name = document.getElementById('customerName').value;
            selectedCustomer.phone = document.getElementById('customerPhone').value;
            selectedCustomer.address = document.getElementById('customerAddress').value;
            renderCustomers(customers); // Re-render with the updated data
            $('#editCustomerModal').modal('hide');
        }
    }

    function deleteCustomer() {
        const index = customers.findIndex(c => c.id === selectedCustomer.id);
        if (index !== -1) {
            customers.splice(index, 1);
            renderCustomers(customers);
            $('#editCustomerModal').modal('hide');
        }
    }

    function openAddCustomerModal() {
        $('#addCustomerModal').modal('show');
    }

    function addNewCustomer() {
        const newCustomer = {
            id: Date.now(),
            name: document.getElementById('newCustomerName').value,
            phone: document.getElementById('newCustomerPhone').value,
            address: document.getElementById('newCustomerAddress').value
        };
        customers.push(newCustomer); // Add to the global customers array
        renderCustomers(customers); // Re-render with the new customer
        $('#addCustomerModal').modal('hide');
    }

    // Event listeners
    document.getElementById('addCustomerBtn').addEventListener('click', openAddCustomerModal);
    document.getElementById('saveCustomerBtn').addEventListener('click', saveCustomerChanges);
    document.getElementById('deleteCustomerBtn').addEventListener('click', deleteCustomer);
    document.getElementById('addNewCustomerBtn').addEventListener('click', addNewCustomer);

    document.getElementById('customerSearchBar').addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchValue));
        renderCustomers(filteredCustomers);
    });

    // Use the customers loaded globally from the main script
    if (customers) {
        renderCustomers(customers);
    } else {
        console.error('Customers not loaded yet');
    }
})();

