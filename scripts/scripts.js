document.addEventListener("DOMContentLoaded", () => {
  // Register form

  // Получаем элементы формы регистрации
  const regName = document.querySelector("#register-name");
  const regEmail = document.querySelector("#register-email");
  const regPhone = document.querySelector("#register-phone");
  const regPassword = document.querySelector("#register-password");
  const singUpBtn = document.querySelector("#register-button");
  const requiredBar = document.querySelector("#required-bar");

  // Получаем список пользователей из localStorage или создаем пустой массив
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  // Обработчик события для кнопки регистрации
  singUpBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    requiredBar.classList.remove("hidden"); // Делаем элемент видимым

    // Валидация введенных данных
    function validateImputs() {
      if (!/^[a-zA-Z]{2,24}$/.test(regName.value)) {
        requiredBar.innerText =
          "Name must contain only Latin letters, minimum 2 characters, maximum 24 characters"; // Сообщение об ошибке
        return false;
      }
      if (!/^.{7,}@/.test(regEmail.value)) {
        requiredBar.innerText =
          "Email must contain the @ sign and a minimum of 7 characters"; // Сообщение об ошибке
        return false;
      }
      if (!/^\+\d{8,12}$/.test(regPhone.value)) {
        requiredBar.innerText =
          "Phone number must start with +, have only numbers, minimum 8 characters, maximum 12 characters"; // Сообщение об ошибке
        return false;
      }
      if (!/^.{5,26}[a-zA-Z]$/.test(regPassword.value)) {
        requiredBar.innerText =
          "Password must contain only Latin letters, minimum 5 characters, maximum 26 characters"; // Сообщение об ошибке
        return false;
      }
      return true;
    }

    // Проверяем, заполнены ли все поля
    if (
      regName.value === "" ||
      regEmail.value === "" ||
      regPhone.value === "" ||
      regPassword.value === ""
    ) {
      requiredBar.innerText = "All fields are required"; // Сообщение об ошибке
      requiredBar.style.color = "red";
    } else {
      let isError = false;
      // Проверяем, существует ли уже пользователь с таким email
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === regEmail.value) {
          requiredBar.innerText = "Email already exists"; // Сообщение об ошибке
          requiredBar.style.color = "red";
          isError = true;
          break; // Выход из цикла при нахождении совпадения
        }
      }
      if (!isError && validateImputs()) {
        // Создаем нового пользователя и добавляем его в массив
        const user = {
          name: regName.value,
          email: regEmail.value,
          phone: regPhone.value,
          password: regPassword.value,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users)); // Сохраняем обновленный массив в localStorage

        // Очищаем поля формы
        regName.value = "";
        regEmail.value = "";
        regPhone.value = "";
        regPassword.value = "";
        requiredBar.innerText = "User registered successfully"; // Сообщение об успешной регистрации
        requiredBar.style.color = "green";
      } else {
        requiredBar.style.color = "red";
        return;
      }
    }
  });

  // Login form

  // Получаем элементы формы входа
  const logEmail = document.querySelector("#login-email");
  const logPassword = document.querySelector("#login-password");
  const logInBtn = document.querySelector("#login-button");
  const loginBar = document.querySelector("#login-bar");
  const logoutSection = document.querySelector(".logout");
  const logoutBtn = document.querySelector("#logout-button");

  // Обработчик события для кнопки входа
  logInBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    loginBar.classList.remove("hidden"); // Делаем элемент видимым
    let isError = true;

    // Проверяем, существует ли пользователь с введенными email и паролем
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
      // Проверяем, заполнены ли все поля
      if (logEmail.value === "" || logPassword.value === "") {
        loginBar.innerText = "All fields are required"; // Сообщение об ошибке
        loginBar.style.color = "red";
      } else {
        loginBar.innerText = "Invalid email or password"; // Сообщение об ошибке
        loginBar.style.color = "red";
      }
    } else {
      // Очищаем поля формы
      logEmail.value = "";
      logPassword.value = "";
      loginBar.innerText = "Login successful"; // Сообщение об успешном входе
      loginBar.style.color = "green";

      // Показываем блок выхода
      logoutSection.classList.remove("hidden");
    }
  });

  // Обработчик события для кнопки выхода
  logoutBtn.addEventListener("click", () => {
    // Перезагружаем страницу для выхода
    location.reload();
  });
});
