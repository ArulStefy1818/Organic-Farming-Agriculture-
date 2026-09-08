/* =========================================================
   STACKLY FARMING
   SIGNUP PAGE JAVASCRIPT
   PROFESSIONAL INLINE VALIDATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const signupForm =
        document.getElementById("stacklySignupForm");

    const roleButton =
        document.getElementById("stacklyRoleButton");

    const roleDropdown =
        document.getElementById("stacklyRoleDropdown");

    const selectedRole =
        document.getElementById("stacklySelectedRole");

    const roleInput =
        document.getElementById("stacklyRole");

    const roleOptions =
        document.querySelectorAll(".stackly-role-option");

    const phone =
        document.getElementById("stacklyPhone");

    const nameInput =
        document.getElementById("stacklyName");

    const emailInput =
        document.getElementById("stacklyEmail");

    const passwordInput =
        document.getElementById("stacklyPassword");

    const confirmPasswordInput =
        document.getElementById("stacklyConfirmPassword");

    const terms =
        document.getElementById("stacklyTerms");


    /* =====================================================
       PROFESSIONAL MESSAGE BOX
    ===================================================== */

    function showMessage(message, type = "error") {

        let messageBox =
            document.getElementById("stacklyFormMessage");

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.id =
                "stacklyFormMessage";

            signupForm.prepend(messageBox);

        }

        messageBox.className =
            "stackly-form-message " + type;

        messageBox.innerHTML = `
            <span class="stackly-message-icon">
                ${
                    type === "success"
                        ? '<i class="fa-solid fa-circle-check"></i>'
                        : '<i class="fa-solid fa-circle-exclamation"></i>'
                }
            </span>

            <span class="stackly-message-text">
                ${message}
            </span>
        `;

        messageBox.style.display = "flex";

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* =====================================================
       CLEAR MESSAGE
    ===================================================== */

    function clearMessage() {

        const messageBox =
            document.getElementById("stacklyFormMessage");

        if (messageBox) {

            messageBox.style.display =
                "none";

            messageBox.innerHTML =
                "";

        }

    }


    /* =====================================================
       FIELD ERROR
    ===================================================== */

    function fieldError(input, message) {

        clearMessage();

        if (input) {

            input.classList.add(
                "stackly-input-error"
            );

            input.focus();

        }

        showMessage(
            message,
            "error"
        );

    }


    /* =====================================================
       REMOVE FIELD ERROR
    ===================================================== */

    function removeFieldError(input) {

        if (input) {

            input.classList.remove(
                "stackly-input-error"
            );

        }

    }


    /* =====================================================
       ROLE DROPDOWN
    ===================================================== */

    if (roleButton && roleDropdown) {

        roleButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    roleButton.getAttribute(
                        "aria-expanded"
                    ) === "true";

                roleButton.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

                roleDropdown.classList.toggle(
                    "active",
                    !isOpen
                );

            }
        );


        /* =================================================
           ROLE OPTIONS
        ================================================= */

        roleOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        const value =
                            this.getAttribute(
                                "data-value"
                            );

                        const textElement =
                            this.querySelector("span");

                        const text =
                            textElement
                                ? textElement
                                    .textContent
                                    .trim()
                                : this.textContent
                                    .trim();

                        selectedRole.textContent =
                            text;

                        roleInput.value =
                            value;

                        roleDropdown.classList.remove(
                            "active"
                        );

                        roleButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        removeFieldError(
                            roleButton
                        );

                        clearMessage();

                    }
                );

            }
        );


        /* =================================================
           CLOSE DROPDOWN OUTSIDE
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !roleButton.contains(
                        event.target
                    ) &&
                    !roleDropdown.contains(
                        event.target
                    )
                ) {

                    roleDropdown.classList.remove(
                        "active"
                    );

                    roleButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       PHONE - ONLY NUMBERS
    ===================================================== */

    if (phone) {

        phone.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                removeFieldError(this);

                clearMessage();

            }
        );

    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    function passwordToggle(
        buttonId,
        inputId
    ) {

        const button =
            document.getElementById(buttonId);

        const input =
            document.getElementById(inputId);

        if (!button || !input) {
            return;
        }

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (
                    input.type ===
                    "password"
                ) {

                    input.type =
                        "text";

                    this.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';

                    this.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type =
                        "password";

                    this.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';

                    this.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }


    /* =====================================================
       PASSWORD TOGGLES
    ===================================================== */

    passwordToggle(
        "stacklyPasswordToggle",
        "stacklyPassword"
    );

    passwordToggle(
        "stacklyConfirmPasswordToggle",
        "stacklyConfirmPassword"
    );


    /* =====================================================
       CLEAR ERROR WHILE USER TYPES
    ===================================================== */

    [
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput
    ].forEach(function (input) {

        if (!input) {
            return;
        }

        input.addEventListener(
            "input",
            function () {

                removeFieldError(this);

                clearMessage();

            }
        );

    });


    /* =====================================================
       SIGNUP FORM
    ===================================================== */

    if (!signupForm) {
        return;
    }


    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearMessage();


            /* =================================================
               GET VALUES
            ================================================= */

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const phoneNumber =
                phone
                    ? phone.value.trim()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";

            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            /* =================================================
               EMPTY FORM CHECK
            ================================================= */

            if (
                !name &&
                !email &&
                !phoneNumber &&
                !password &&
                !confirmPassword &&
                !roleInput.value
            ) {

                showMessage(
                    "Please complete all required fields before creating your account.",
                    "error"
                );

                if (nameInput) {
                    nameInput.focus();
                }

                return;

            }


            /* =================================================
               ROLE CHECK
            ================================================= */

            if (!roleInput.value) {

                showMessage(
                    "Please select your role to continue.",
                    "error"
                );

                if (roleButton) {
                    roleButton.focus();
                }

                return;

            }


            /* =================================================
               NAME EMPTY
            ================================================= */

            if (!name) {

                fieldError(
                    nameInput,
                    "Please enter your full name."
                );

                return;

            }


            /* =================================================
               NAME VALIDATION
            ================================================= */

            const namePattern =
                /^[A-Za-z ]+$/;

            if (!namePattern.test(name)) {

                fieldError(
                    nameInput,
                    "Name should contain alphabets and spaces only."
                );

                return;

            }


            /* =================================================
               NAME LENGTH
            ================================================= */

            if (name.length < 2) {

                fieldError(
                    nameInput,
                    "Please enter a valid name with at least 2 characters."
                );

                return;

            }


            /* =================================================
               EMAIL EMPTY
            ================================================= */

            if (!email) {

                fieldError(
                    emailInput,
                    "Please enter your email address."
                );

                return;

            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!emailPattern.test(email)) {

                fieldError(
                    emailInput,
                    "Please enter a valid email address."
                );

                return;

            }


            /* =================================================
               PHONE EMPTY
            ================================================= */

            if (!phoneNumber) {

                fieldError(
                    phone,
                    "Please enter your 10-digit phone number."
                );

                return;

            }


            /* =================================================
               PHONE VALIDATION
            ================================================= */

            if (!/^\d{10}$/.test(phoneNumber)) {

                fieldError(
                    phone,
                    "Phone number must contain exactly 10 digits."
                );

                return;

            }


            /* =================================================
               PASSWORD EMPTY
            ================================================= */

            if (!password) {

                fieldError(
                    passwordInput,
                    "Please create a password."
                );

                return;

            }


            /* =================================================
               PASSWORD LENGTH
            ================================================= */

            if (password.length < 6) {

                fieldError(
                    passwordInput,
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /* =================================================
               CONFIRM PASSWORD EMPTY
            ================================================= */

            if (!confirmPassword) {

                fieldError(
                    confirmPasswordInput,
                    "Please confirm your password."
                );

                return;

            }


            /* =================================================
               PASSWORD MATCH
            ================================================= */

            if (
                password !==
                confirmPassword
            ) {

                fieldError(
                    confirmPasswordInput,
                    "Passwords do not match. Please try again."
                );

                return;

            }


            /* =================================================
               TERMS CHECK
            ================================================= */

            if (
                !terms ||
                !terms.checked
            ) {

                showMessage(
                    "Please accept the Terms & Conditions to continue.",
                    "error"
                );

                if (terms) {
                    terms.focus();
                }

                return;

            }


            /* =================================================
               SUCCESS
            ================================================= */

            showMessage(
                "Your account has been created successfully. Redirecting to login...",
                "success"
            );


            /* =================================================
               DISABLE SUBMIT BUTTON
            ================================================= */

            const submitButton =
                signupForm.querySelector(
                    ".stackly-login-btn"
                );

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.style.opacity =
                    "0.7";

                submitButton.style.cursor =
                    "not-allowed";

            }


            /* =================================================
               CLEAR FORM
            ================================================= */

            signupForm.reset();


            /* =================================================
               RESET ROLE
            ================================================= */

            if (selectedRole) {

                selectedRole.textContent =
                    "Select Role";

            }

            if (roleInput) {

                roleInput.value =
                    "";

            }

            if (roleDropdown) {

                roleDropdown.classList.remove(
                    "active"
                );

            }

            if (roleButton) {

                roleButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            /* =================================================
               REDIRECT TO LOGIN
            ================================================= */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                500
            );

        }
    );

});