document.addEventListener("DOMContentLoaded", () => {
  // Register form

  // Get registration form elements
  const regName = document.querySelector("#register-name");
  const regEmail = document.querySelector("#register-email");
  const regPhone = document.querySelector("#register-phone");
  const regPassword = document.querySelector("#register-password");
  const singUpBtn = document.querySelector("#register-button");
  const requiredBar = document.querySelector("#required-bar");

  // Get the list of users from localStorage or create an empty array
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  // Event handler for the registration button
  singUpBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    requiredBar.classList.remove("hidden"); // Make the element visible

    // Validate input data
    function validateImputs() {
      if (!/^[a-zA-Z]{2,24}$/.test(regName.value)) {
        requiredBar.innerText =
          "Name must contain only Latin letters, minimum 2 characters, maximum 24 characters"; // Error message
        return false;
      }
      if (!/^.{7,}@/.test(regEmail.value)) {
        requiredBar.innerText =
          "Email must contain the @ sign and a minimum of 7 characters"; // Error message
        return false;
      }
      if (!/^\+\d{8,12}$/.test(regPhone.value)) {
        requiredBar.innerText =
          "Phone number must start with +, have only numbers, minimum 8 characters, maximum 12 characters"; // Error message
        return false;
      }
      if (!/^.{5,26}[a-zA-Z]$/.test(regPassword.value)) {
        requiredBar.innerText =
          "Password must contain only Latin letters, minimum 5 characters, maximum 26 characters"; // Error message
        return false;
      }
      return true;
    }

    // Check if all fields are filled
    if (
      regName.value === "" ||
      regEmail.value === "" ||
      regPhone.value === "" ||
      regPassword.value === ""
    ) {
      requiredBar.innerText = "All fields are required"; // Error message
      requiredBar.style.color = "red";
    } else {
      let isError = false;
      // Check if a user with this email already exists
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === regEmail.value) {
          requiredBar.innerText = "Email already exists"; // Error message
          requiredBar.style.color = "red";
          isError = true;
          break; // Exit the loop when a match is found
        }
      }
      if (!isError && validateImputs()) {
        // Create a new user and add them to the array
        const user = {
          name: regName.value,
          email: regEmail.value,
          phone: regPhone.value,
          password: regPassword.value,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users)); // Save the updated array to localStorage

        // Clear form fields
        regName.value = "";
        regEmail.value = "";
        regPhone.value = "";
        regPassword.value = "";
        requiredBar.innerText = "User registered successfully"; // Success message
        requiredBar.style.color = "green";
      } else {
        requiredBar.style.color = "red";
        return;
      }
    }
  });

  // Login form

  // Get login form elements
  const logEmail = document.querySelector("#login-email");
  const logPassword = document.querySelector("#login-password");
  const logInBtn = document.querySelector("#login-button");
  const loginBar = document.querySelector("#login-bar");
  const logoutSection = document.querySelector(".logout");
  const logoutBtn = document.querySelector("#logout-button");

  // Event handler for the login button
  logInBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    loginBar.classList.remove("hidden"); // Make the element visible
    let isError = true;

    // Check if a user with the entered email and password exists
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === logEmail.value &&
        users[i].password === logPassword.value
      ) {
        isError = false;
        break;
      }
    }

    if (isError) {
      // Check if all fields are filled
      if (logEmail.value === "" || logPassword.value === "") {
        loginBar.innerText = "All fields are required"; // Error message
        loginBar.style.color = "red";
      } else {
        loginBar.innerText = "Invalid email or password"; // Error message
        loginBar.style.color = "red";
      }
    } else {
      // Clear form fields
      logEmail.value = "";
      logPassword.value = "";
      loginBar.innerText = "Login successful"; // Success message
      loginBar.style.color = "green";

      // Show the logout section
      logoutSection.classList.remove("hidden");
    }
  });

  // Event handler for the logout button
  logoutBtn.addEventListener("click", () => {
    // Reload the page to log out
    location.reload();
  });
});
