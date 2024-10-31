
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
        $('#modalCustomerName').text(order.customer.name);
        $('#modalCustomerPhone').text(order.customer.phone);
        $('#modalCustomerAddress').text(order.customer.address);
        $('#modalOrderId').text(order.orderId);
        $('#modalOrderDateTime').text(formatDateTime(order.date));
        $('#modalSubtotal').text(order.subtotal);
        $('#modalDiscount').text(order.discount);
        $('#modalTotal').text(order.total);

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
