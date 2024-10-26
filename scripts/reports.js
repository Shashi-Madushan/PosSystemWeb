
(function () {

    function generateReport() {
        
        console.log('Orders for report:', orders);

        if (orders != null) {
            renderOrdersTable();
        }
    }


    function formatDateTime(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString(undefined, options);
    }

    function renderOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = ''; // Clear previous content

        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.customer.name}</td>
                <td>${formatDateTime(order.date)}</td>
                <td>${order.items.length}</td>
                <td>${order.discount}%</td>
                <td>Rs ${order.total}</td>
            `;

            // Add click event to show the details in the modal
            row.addEventListener('click', () => openOrderDetailsModal(index));

            tbody.appendChild(row);
        });
    }

    function openOrderDetailsModal(orderIndex) {
        const order = orders[orderIndex];

        // Populate modal with order details
        document.getElementById('modalCustomerName').textContent = order.customer.name;
        document.getElementById('modalCustomerPhone').textContent = order.customer.phone;
        document.getElementById('modalCustomerAddress').textContent = order.customer.address;
        document.getElementById('modalOrderId').textContent = order.orderId;
        document.getElementById('modalOrderDateTime').textContent = formatDateTime(order.date);
        document.getElementById('modalSubtotal').textContent = order.subtotal;
        document.getElementById('modalDiscount').textContent = order.discount;
        document.getElementById('modalTotal').textContent = order.total;

        // Populate the order items list
        const itemsList = document.getElementById('modalOrderItemsList');
        itemsList.innerHTML = ''; // Clear previous items

        order.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x ${item.qty} @ Rs ${item.price}`;
            itemsList.appendChild(listItem);
        });

        // Show the modal
        $('#orderDetailsModal').modal('show');
    }

    generateReport();


})();
// Example data - your data will come from your orders array
