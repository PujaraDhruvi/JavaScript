const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthdateInput = document.getElementById("Bdate");
const address1Input = document.getElementById("address1");
const address2Input = document.getElementById("address2");
const cityInput = document.getElementById("city");
const regionInput = document.getElementById("region");
const postalcodeInput = document.getElementById("code");
const countrySelect = document.querySelector("select[name='user[country]']");
const genderInputs = document.querySelectorAll('input[name="user[gender]"]');

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

const previewBtn = document.getElementById("previewBtn");
const formSection = document.getElementById("formSection");
const previewSection = document.getElementById("previewSection");

function validateNameStatus() {
  const name = fullnameInput.value.trim();

  if (name.length === 0) {
    return { isValid: false, message: "Name is required" };
  }
  if (!name.match(/^[A-Za-z]+(\s[A-Za-z]+)+$/)) {
    return { isValid: false, message: "Write full name" };
  }
  return { isValid: true, message: "" };
}

function updateNameView() {
  const validation = validateNameStatus();

  if (!validation.isValid) {
    nameError.innerHTML = validation.message;
  } else {
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }
  return validation.isValid;
}

function validateEmailStatus() {
  const email = emailInput.value.trim();
  if (email.length === 0) {
    return { isValid: false, message: "Email is required" };
  }
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
    return { isValid: false, message: "Invalid Email" };
  }
  return { isValid: true, message: "" };
}

function updateEmailView() {
  const validation = validateEmailStatus();

  if (!validation.isValid) {
    emailError.innerHTML = validation.message;
  } else {
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }
  return validation.isValid;
}

function validatePhoneStatus() {
  const phone = phoneInput.value.trim();
  if (phone.length === 0) {
    return { isValid: false, message: "Phone no. is required" };
  }
  if (!/^\d{10}$/.test(phone)) {
    return { isValid: false, message: "Phone no. should be 10 digits" };
  }
  return { isValid: true, message: "" };
}

function updatePhoneView() {
  const validation = validatePhoneStatus();

  if (!validation.isValid) {
    phoneError.innerHTML = validation.message;
  } else {
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }
  return validation.isValid;
}

function validateAddressStatus(addressId) {
  const address = document.getElementById(addressId).value.trim();
  if (address.length === 0) {
    return { isValid: false, message: "Address is required" };
  }
  if (!/^([\w\s\-,./#()']+)$/.test(address)) {
    return { isValid: false, message: "Address is invalid" };
  }
  return { isValid: true, message: "" };
}

function updateAddressView(addressId) {
  const validation = validateAddressStatus(addressId);
  var addressError = document.getElementById(addressId + "-error");

  if (!validation.isValid) {
    addressError.innerHTML = validation.message;
  } else {
    addressError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }
  return validation.isValid;
}

function validateCountry() {
  if (countrySelect.value === "Country") return false;
  return true;
}

function validateBirthdate() {
  if (birthdateInput.value.trim().length === 0) {
    return false;
  }
  return true;
}

function enablePreviewButton() {
  const fullname = validateNameStatus().isValid;
  const email = validateEmailStatus().isValid;
  const phone = validatePhoneStatus().isValid;
  const bdate = validateBirthdate();
  const address1 = validateAddressStatus("address1").isValid;
  const address2 = validateAddressStatus("address2").isValid;
  const city = cityInput.value.trim().length > 0;
  const region = regionInput.value.trim().length > 0;
  const postalcode = postalcodeInput.value.trim().length > 0;
  const country = validateCountry();
  const gender = document.querySelector('input[name="user[gender]"]:checked');
  if (
    fullname &&
    email &&
    phone &&
    bdate &&
    address1 &&
    address2 &&
    city &&
    region &&
    postalcode &&
    gender &&
    country
  ) {
    previewBtn.classList.remove("disabled");
    previewBtn.removeAttribute("disabled");
  } else {
    previewBtn.classList.add("disabled");
    previewBtn.setAttribute("disabled", "true");
  }
}

function previewForm() {
  enablePreviewButton();

  if (previewBtn.classList.contains("disabled")) {
    alert("Please fill all required fields correctly.");
    return;
  }

  document.getElementById("previewName").innerText = fullnameInput.value;
  document.getElementById("previewEmail").innerText = emailInput.value;
  document.getElementById("previewPhone").innerText = phoneInput.value;
  document.getElementById("previewBirthdate").innerText = birthdateInput.value;

  const gender = document.querySelector('input[name="user[gender]"]:checked');
  document.getElementById("previewGender").innerText = gender
    ? gender.value
    : "Not selected";

  const fullAddress = `${address1Input.value}, ${address2Input.value}, ${cityInput.value}, ${regionInput.value} - ${postalcodeInput.value}, ${countrySelect.value}`;
  document.getElementById("previewAddress").innerText = fullAddress;

  formSection.classList.add("hidden");
  previewSection.classList.remove("hidden");
}

function editDetails() {
  formSection.classList.remove("hidden");
  previewSection.classList.add("hidden");
}

const userData = [];

function submitDetails() {
  const formData = new FormData(document.querySelector("#formSection"));
  const user = [];
  user["Full Name"] = fullnameInput.value;
  user["Email Address"] = emailInput.value;
  user["Phone Number"] = phoneInput.value;
  user["Birthdate"] = birthdateInput.value;
  user["Gender"] =
    document.querySelector('input[name="user[gender]"]:checked')?.value ||
    "Not selected";
  user["Address1"] = address1Input.value;
  user["Address2"] = address2Input.value;
  user["City"] = cityInput.value;
  user["Region"] = regionInput.value;
  user["Postal code"] = postalcodeInput.value;
  user["Country"] = countrySelect.value;
  user[
    "Full Address"
  ] = `${address1Input.value}, ${address2Input.value}, ${cityInput.value}, ${regionInput.value} - ${postalcodeInput.value}, ${countrySelect.value}`;
  userData.push(user);
  alert("Form submitted!");
  console.log(userData);

  formSection.reset();
  document
    .querySelectorAll("span[id$='-error']")
    .forEach((el) => (el.innerHTML = ""));

  formSection.classList.remove("hidden");
  previewSection.classList.add("hidden");

  previewBtn.classList.add("disabled");
  previewBtn.setAttribute("disabled", "true");
}
