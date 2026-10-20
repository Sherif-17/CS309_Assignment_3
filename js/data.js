// Data table with live search and sorting

const people = [
    { name: "Ahmed", age: 22, city: "Cairo" },
    { name: "Sara", age: 19, city: "Alexandria" },
    { name: "Omar", age: 35, city: "Giza" },
    { name: "Mona", age: 28, city: "Mansoura" },
    { name: "Youssef", age: 41, city: "Aswan" },
    { name: "Nour", age: 24, city: "Luxor" },
    { name: "Karim", age: 30, city: "Cairo" },
    { name: "Laila", age: 17, city: "Tanta" },
    { name: "Hassan", age: 52, city: "Port Said" },
    { name: "Farida", age: 26, city: "Alexandria" }
];

const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("search");
const sortNameBtn = document.getElementById("sort-name");
const sortAgeBtn = document.getElementById("sort-age");
const noResults = document.getElementById("no-results");

// Current sort state
let sortKey = null;
let ascending = true;

// Build the table rows from an array
function renderTable(list) {
    tableBody.innerHTML = "";

    list.forEach(function (person) {
        const row = document.createElement("tr");

        [person.name, person.age, person.city].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    noResults.style.display = list.length === 0 ? "block" : "none";
}

// Filter by the search text, then sort, then render
function updateTable() {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = people.filter(function (person) {
        return person.name.toLowerCase().includes(query) ||
            person.city.toLowerCase().includes(query) ||
            String(person.age).includes(query);
    });

    if (sortKey === "name") {
        filtered.sort(function (a, b) {
            return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
    } else if (sortKey === "age") {
        filtered.sort(function (a, b) {
            return ascending ? a.age - b.age : b.age - a.age;
        });
    }

    renderTable(filtered);
}

// Clicking the same sort button again reverses the order
function setSort(key) {
    if (sortKey === key) {
        ascending = !ascending;
    } else {
        sortKey = key;
        ascending = true;
    }

    const arrow = ascending ? " ▲" : " ▼";
    sortNameBtn.textContent = "Sort by Name" + (sortKey === "name" ? arrow : "");
    sortAgeBtn.textContent = "Sort by Age" + (sortKey === "age" ? arrow : "");

    updateTable();
}

searchInput.addEventListener("input", updateTable);
sortNameBtn.addEventListener("click", function () { setSort("name"); });
sortAgeBtn.addEventListener("click", function () { setSort("age"); });

updateTable();
