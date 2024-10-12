(function () {
    let customers = null;
    async function loadCustomers() {
        try {
            const res = await fetch('../jsones/customers.json');
            const data = await res.json();
            customers = data;
            renderCustomers(customers);

        } catch (error) {
            console.log('error loading customers (customers)',error);
        }

    }
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
            renderCustomers(customers);
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
        customers.push(newCustomer);
        renderCustomers(customers);
        $('#addCustomerModal').modal('hide');
    }

    document.getElementById('addCustomerBtn').addEventListener('click', openAddCustomerModal);
    document.getElementById('saveCustomerBtn').addEventListener('click', saveCustomerChanges);
    document.getElementById('deleteCustomerBtn').addEventListener('click', deleteCustomer);
    document.getElementById('addNewCustomerBtn').addEventListener('click', addNewCustomer);

    document.getElementById('customerSearchBar').addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchValue));
        renderCustomers(filteredCustomers);
    });

    loadCustomers();
})();

