/* ------------------------------------------------------------- */
/* GLOBAL VARIABLES */
/* ------------------------------------------------------------- */

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalRight = document.querySelector(".modal-right");
const modalLeft = document.querySelector(".modal-left");
const input = document.getElementById("searchbox");
let cards = document.getElementsByClassName("card");

/* ------------------------------------------------------------- */
/* EVENT LISTENERS */
/* ------------------------------------------------------------- */

// Grid container click event

gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    card = e.target.closest(".card");
    indexModal()
  }
});

// Modal Right Button Click Event

modalRight.addEventListener('click', () => {
  if (card.dataset.index === "11") {
    return;
  }
  card = card.nextElementSibling;
  indexModal()
});

// Modal Left Button Click Event

modalLeft.addEventListener('click', () => {
  if (card.dataset.index === "0") {
    return;
  }
  card = card.previousElementSibling;
  indexModal()
});

// Modal Close Click event listener

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

// Employee Search Event Listener

input.addEventListener('keyup', employeeSearch);

/* ------------------------------------------------------------- */
/* FETCH DATA FROM API */
/* ------------------------------------------------------------- */

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

/* ------------------------------------------------------------- */
/* FUNCTIONS */
/* ------------------------------------------------------------- */

// Display Employees function

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `
});
  gridContainer.innerHTML = employeeHTML;
}

// Display Modal Function

function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode
}, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// Employee Search Function

function employeeSearch() {
 let userInput = input.value.toLowerCase();
  for (let i = 0; i < cards.length; i++ ) {
    let employeeName = cards[i].firstElementChild.nextElementSibling.firstElementChild.textContent.toLowerCase();
    if(!employeeName.includes(userInput)) {
      cards[i].style.display = "none";
  } else {
    cards[i].style.display = "block";
  }
}};

// Index Modal Function

function indexModal() {
  const index = card.getAttribute('data-index');
  displayModal(index);
}
