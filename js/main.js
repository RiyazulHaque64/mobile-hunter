// Fetch API
const loadPhones = async (searchValue, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

// Display Phone
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // Not found msg showing by condition
  const notFoundMsg = document.getElementById("not-found-msg");
  if (phones.length === 0) {
    notFoundMsg.classList.remove("hidden");
    loadSpinner(false);
  } else {
    notFoundMsg.classList.add("hidden");
  }
  // Showing 12 phone
  const showAllBtn = document.getElementById("show-all-btn");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.className = "card bg-base-100 shadow-xl";
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center">
            <h2 class="card-title">${phone.brand}</h2>
            <p>${phone.phone_name}</p>
            <div class="card-actions">
            <button class="btn btn-primary">Details</button>
            </div>
        </div>
    `;
    phonesContainer.appendChild(phoneCard);
    loadSpinner(false);
  });
};

// Search Process
const searchProcess = (dataLimit) => {
  loadSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadPhones(searchValue, dataLimit);
};

// Search mechanism by click
document.getElementById("search-btn").addEventListener("click", () => {
  searchProcess(12);
});

// Search mechanism by enter press
document.getElementById("search-field").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchProcess(12);
  }
});

// Show all process
document.getElementById("show-all-btn").addEventListener("click", function () {
  searchProcess();
});

// Spinner showing
const loadSpinner = (load) => {
  const spinner = document.getElementById("spinner");
  if (load) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
