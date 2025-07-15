let customers = [];
let editingIndex = -1;

const form = document.getElementById("customer-form");
const tableBody = document.getElementById("customer-table-body");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const formTitle = document.getElementById("form-title");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const customer = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    location: locationInput.value,
  };

  if (editingIndex === -1) {
    customers.push(customer);
  } else {
    customers[editingIndex] = customer;
    editingIndex = -1;
    formTitle.textContent = "Add Customer";
  }

  form.reset();
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";
  customers.forEach((cust, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${cust.name}</td>
      <td>${cust.email}</td>
      <td>${cust.phone}</td>
      <td>${cust.location}</td>
      <td class="actions">
        <button class="edit" onclick="editCustomer(${index})">Edit</button>
        <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editCustomer(index) {
  const cust = customers[index];
  nameInput.value = cust.name;
  emailInput.value = cust.email;
  phoneInput.value = cust.phone;
  locationInput.value = cust.location;
  editingIndex = index;
  formTitle.textContent = "Edit Customer";
}

function deleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    customers.splice(index, 1);
    renderTable();
  }
}

renderTable();