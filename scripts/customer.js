$(document).ready(function() {
    let selectedCustomer = null;

    function renderCustomers(customersToRender) {
        const tableBody = $('#customerTableBody');
        tableBody.empty();

        customersToRender.forEach(customer => {
            const row = $('<tr>');
            row.html(`
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
            `);

            row.on('click', function() {
                openEditCustomerModal(customer);
            });

            tableBody.append(row);
        });
    }

    function openEditCustomerModal(customer) {
        selectedCustomer = customer;
        $('#customerName').val(customer.name);
        $('#customerPhone').val(customer.phone);
        $('#customerAddress').val(customer.address);
        $('#editCustomerModal').modal('show');
    }

    function saveCustomerChanges() {
        if (selectedCustomer) {
            selectedCustomer.name = $('#customerName').val();
            selectedCustomer.phone = $('#customerPhone').val();
            selectedCustomer.address = $('#customerAddress').val();
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
            name: $('#newCustomerName').val(),
            phone: $('#newCustomerPhone').val(),
            address: $('#newCustomerAddress').val()
        };
        customers.push(newCustomer); // Add to the global customers array
        renderCustomers(customers); // Re-render with the new customer
        $('#addCustomerModal').modal('hide');
    }

    // Event listeners
    $('#addCustomerBtn').on('click', openAddCustomerModal);
    $('#saveCustomerBtn').on('click', saveCustomerChanges);
    $('#deleteCustomerBtn').on('click', deleteCustomer);
    $('#addNewCustomerBtn').on('click', addNewCustomer);

    $('#customerSearchBar').on('input', function(e) {
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
});