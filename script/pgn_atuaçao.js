document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const addItemButton = document.querySelector(".additional-items");
    const closeBtn = document.querySelector(".close-btn");
    const addItemBtn = document.getElementById("add-item-btn");
    const itemInput = document.getElementById("item-input");
    const addedItemsList = document.getElementById("added-items-list");
    const reviewItemsButton = document.getElementById("review-items-btn");
    const reviewModal = document.getElementById("review-modal");
    const closeReviewBtn = document.querySelector(".close-review-btn");
    const reviewItemsList = document.getElementById("review-items-list");
    const editOrderBtn = document.getElementById("edit-order-btn");
    const sendOrderBtn = document.querySelector("#review-modal .send-order-btn");

    // Carregar itens salvos
    const savedItems = JSON.parse(localStorage.getItem("userItems")) || [];
    savedItems.forEach(item => addItemToList(item));

    function saveItems() {
        const items = Array.from(addedItemsList.children).map(li => li.textContent.replace("Remover", "").trim());
        localStorage.setItem("userItems", JSON.stringify(items));
    }

    function addItemToList(itemText) {
        const li = document.createElement("li");
        li.innerHTML = `${itemText} <button class="remove-item-btn">Remover</button>`;
        li.style.animation = "fadeIn 0.4s ease";
        addedItemsList.appendChild(li);
        showReviewButton();
        saveItems();
    }

    addItemBtn.addEventListener("click", () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            addItemToList(itemText);
            itemInput.value = "";
            modal.style.display = "none";
            modal.classList.remove("show");
        }
    });

    addedItemsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item-btn")) {
            e.target.parentElement.remove();
            showReviewButton();
            saveItems();
        }
    });

    function showReviewButton() {
        reviewItemsButton.style.display = addedItemsList.children.length > 0 ? "block" : "none";
    }

    // Abrir e fechar modal com animação
    addItemButton.addEventListener("click", () => {
        modal.style.display = "flex";
        modal.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modal.classList.remove("show");
        }
    });

    // Revisar pedido
    reviewItemsButton.addEventListener("click", () => {
        reviewItemsList.innerHTML = "";
        Array.from(addedItemsList.children).forEach(li => {
            const clone = li.cloneNode(true);
            clone.querySelector("button")?.remove(); // remove botão remover
            reviewItemsList.appendChild(clone);
        });
        reviewModal.style.display = "flex";
        reviewModal.classList.add("show");
    });

    closeReviewBtn.addEventListener("click", () => {
        reviewModal.style.display = "none";
        reviewModal.classList.remove("show");
    });

    editOrderBtn.addEventListener("click", () => {
        reviewModal.style.display = "none";
        reviewModal.classList.remove("show");
    });

    sendOrderBtn.addEventListener("click", () => {
        const items = Array.from(addedItemsList.children).map(li => li.textContent.replace("Remover", "").trim());
        alert("Pedido enviado com os seguintes itens:\n" + items.join("\n"));
        localStorage.setItem("userItems", JSON.stringify(items)); // salva pedido final
    });

    // Modal do perfil
    document.getElementById("profile-btn").addEventListener("click", () => {
        document.getElementById("profile-modal").style.display = "block";
        document.getElementById("profile-modal").classList.add("show");
    });

    document.querySelector(".close-profile-btn").addEventListener("click", () => {
        document.getElementById("profile-modal").style.display = "none";
        document.getElementById("profile-modal").classList.remove("show");
    });
});


sendOrderBtn.addEventListener("click", () => {
    const items = Array.from(addedItemsList.children).map(li =>
        li.textContent.replace("Remover", "").trim()
    );

    if (items.length === 0) {
        alert("Você ainda não adicionou nenhum item.");
        return;
    }

    // Salvar no localStorage
    localStorage.setItem("userItems", JSON.stringify(items));

    // Mostrar na área de pedido enviado
    const submittedContainer = document.getElementById("submitted-order-container");
    const submittedList = document.getElementById("submitted-items-list");

    submittedList.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        submittedList.appendChild(li);
    });

    submittedContainer.style.display = "block";

    // Fechar modal de revisão
    reviewModal.style.display = "none";
    reviewModal.classList.remove("show");

    alert("Pedido enviado com sucesso!");
});
