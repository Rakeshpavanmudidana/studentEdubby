import { fetchBranches } from "./index.js";
function updateCustomSelect(selectElement, items, placeholder) {
    const selectItems = selectElement.querySelector(".select-items");
    const selectInput = selectElement.querySelector(".select-input");

    selectItems.innerHTML = "";
    selectInput.placeholder = placeholder;
    selectInput.value = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.addEventListener("click", function () {
            selectInput.value = item;
            selectItems.classList.remove("show");
            selectInput.classList.remove("active");

            if (selectElement === CollegeSelect) {
                fetchBranches(item); // Fetch branches when college is selected
                console.log(item);  
            }
        });
        selectItems.appendChild(div);
    });

    selectInput.addEventListener("input", function (e) {
        const filter = e.target.value.toLowerCase();
        const filteredItems = items.filter(item =>
            item.toLowerCase().includes(filter)
        );
        updateCustomSelectItems(selectItems, filteredItems, selectElement);
    });
}


function updateCustomSelectItems(selectItems, items, selectElement) {
    selectItems.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.addEventListener("click", function() {
            const selectInput = selectElement.querySelector(".select-input");
            selectInput.value = item;
            selectItems.classList.remove("show");
            selectInput.classList.remove("active");
            
            if (selectElement === CollegeSelect) {
                fetchBranches(item);
            } 
        });
        selectItems.appendChild(div);
    });
}

function setupCustomSelect(selectElement) {
    const selectSelected = selectElement.querySelector(".select-selected");
    const selectItems = selectElement.querySelector(".select-items");
    const selectInput = selectElement.querySelector(".select-input");

    selectSelected.addEventListener("click", function(e) {
        e.stopPropagation();
        // Close all other dropdowns
        document.querySelectorAll(".select-items").forEach(item => {
            if (item !== selectItems) {
                item.classList.remove("show");
            }
        });
        document.querySelectorAll(".select-selected").forEach(item => {
            if (item !== selectSelected) {
                item.classList.remove("active");
            }
        });
        selectItems.classList.toggle("show");
        selectSelected.classList.toggle("active");
        selectInput.focus();
    });

    document.addEventListener("click", function(e) {
        if (!selectElement.contains(e.target)) {
            selectItems.classList.remove("show");
            selectSelected.classList.remove("active");
        }
    });
}


export { updateCustomSelect, setupCustomSelect, }