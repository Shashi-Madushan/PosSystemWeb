(function () {

    let selectedItem = null;

    function renderItems(itemsToRender) {
        const itemsSection = document.getElementById('itemsDynamicSection');
        itemsSection.innerHTML = '';

        itemsToRender.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.setAttribute('data-id', item.id);
            itemCard.innerHTML = `
                <i class="fas fa-times delete-btn"></i>
                <img src="${item.imgSrc}" alt="${item.name}">
                <div>${item.name}</div>
                <div class="item-qty">Qty: ${item.stock}</div>
                <div class="item-price">$${item.price}</div>
            `;

            itemCard.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteItem(item.id);
            });

            itemCard.addEventListener('click', () => {
                openEditModal(item);
            });

            itemsSection.appendChild(itemCard);
        });
    }

    function deleteItem(id) {
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            renderItems(items);
        }
    }

    function openEditModal(item) {
        selectedItem = item;
        $('#itemName').val(item.name);
        $('#itemDescription').val(item.description);
        $('#itemStock').val(item.stock);
        $('#itemPrice').val(item.price);
        $('#editItemModal').modal('show');
    }

    function saveChanges() {
        if (selectedItem) {
            selectedItem.name = $('#itemName').val();
            selectedItem.description = $('#itemDescription').val();
            selectedItem.stock = parseInt($('#itemStock').val());
            selectedItem.price = parseFloat($('#itemPrice').val());
            renderItems(items);
            $('#editItemModal').modal('hide');
        }
    }

    function openAddItemModal() {
        $('#addItemModal').modal('show');
    }

    function addNewItem() {
        const newItem = {
            id: Date.now(),
            name: $('#newItemName').val(),
            description: $('#newItemDescription').val(),
            stock: parseInt($('#newItemStock').val()),
            price: parseFloat($('#newItemPrice').val()),
            imgSrc: 'https://via.placeholder.com/100'
        };
        items.push(newItem);
        renderItems(items);
        $('#addItemModal').modal('hide');
    }

    document.getElementById('addItemBtn').addEventListener('click', openAddItemModal);
    document.getElementById('saveItemBtn').addEventListener('click', saveChanges);
    document.getElementById('addNewItemBtn').addEventListener('click', addNewItem);

    document.getElementById('searchBar').addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
        renderItems(filteredItems);
    });
    
    if (items) {
        renderItems(items);
    } else {
        console.log("Items not loarded")
    }
    
})();

