/* =========================================================
   STACKLY LOGIN PAGE JAVASCRIPT
   ROLE DROPDOWN + PASSWORD TOGGLE + FORM VALIDATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET ROLE DROPDOWN ELEMENTS
    ===================================================== */

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


    /* =====================================================
       OPEN / CLOSE ROLE DROPDOWN
    ===================================================== */

    if (
        roleButton &&
        roleDropdown
    ) {

        roleButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                roleDropdown.classList.contains("show");

            if (isOpen) {

                closeRoleDropdown();

            } else {

                openRoleDropdown();

            }

        });

    }


    /* =====================================================
       OPEN DROPDOWN
    ===================================================== */

    function openRoleDropdown() {

        if (!roleDropdown || !roleButton) return;

        roleDropdown.classList.add("show");

        roleButton.classList.add("active");

        roleButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /* =====================================================
       CLOSE DROPDOWN
    ===================================================== */

    function closeRoleDropdown() {

        if (!roleDropdown || !roleButton) return;

        roleDropdown.classList.remove("show");

        roleButton.classList.remove("active");

        roleButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       ROLE OPTION CLICK
    ===================================================== */

    roleOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const value =
                    option.getAttribute("data-value");

                const text =
                    option.querySelector("span")
                        ? option.querySelector("span").textContent.trim()
                        : "";

                /* -----------------------------------------
                   UPDATE VISIBLE ROLE
                ----------------------------------------- */

                if (selectedRole) {

                    selectedRole.textContent = text;

                    selectedRole.classList.add(
                        "selected"
                    );

                }


                /* -----------------------------------------
                   UPDATE HIDDEN INPUT
                ----------------------------------------- */

                if (roleInput) {

                    roleInput.value = value;

                }


                /* -----------------------------------------
                   REMOVE OLD SELECTED STATE
                ----------------------------------------- */

                roleOptions.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                    item.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


                /* -----------------------------------------
                   ADD SELECTED STATE
                ----------------------------------------- */

                option.classList.add(
                    "selected"
                );

                option.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* -----------------------------------------
                   REMOVE ROLE ERROR
                ----------------------------------------- */

                if (roleButton) {

                    roleButton.classList.remove(
                        "stackly-role-error"
                    );

                }


                /* -----------------------------------------
                   CLOSE DROPDOWN
                ----------------------------------------- */

                closeRoleDropdown();

            }
        );

    });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                roleDropdown &&
                roleButton &&
                !roleDropdown.contains(event.target) &&
                !roleButton.contains(event.target)
            ) {

                closeRoleDropdown();

            }

        }
    );


    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeRoleDropdown();

            }

        }
    );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const password =
        document.getElementById(
            "stacklyPassword"
        );

    const passwordToggle =
        document.getElementById(
            "stacklyPasswordToggle"
        );


    if (
        password &&
        passwordToggle
    ) {

        passwordToggle.addEventListener(
            "click",
            function () {

                const icon =
                    passwordToggle.querySelector("i");


                if (
                    password.type === "password"
                ) {

                    /* SHOW PASSWORD */

                    password.type = "text";

                    passwordToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    }

                } else {

                    /* HIDE PASSWORD */

                    password.type = "password";

                    passwordToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    const loginForm =
        document.getElementById(
            "stacklyLoginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET VALUES
                ----------------------------------------- */

                const role =
                    roleInput
                        ? roleInput.value.trim()
                        : "";

                const email =
                    document.getElementById(
                        "stacklyEmail"
                    );

                const passwordField =
                    document.getElementById(
                        "stacklyPassword"
                    );


                let isValid = true;


                /* -----------------------------------------
                   CLEAR OLD ERRORS
                ----------------------------------------- */

                clearLoginErrors();


                /* =========================================
                   ROLE VALIDATION
                ========================================= */

                if (!role) {

                    isValid = false;

                    showRoleError(
                        "Please select your role."
                    );

                }


                /* =========================================
                   EMAIL VALIDATION
                ========================================= */

                if (
                    email &&
                    email.value.trim() === ""
                ) {

                    isValid = false;

                    showInputError(
                        email,
                        "Please enter your email address."
                    );

                } else if (
                    email &&
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    isValid = false;

                    showInputError(
                        email,
                        "Please enter a valid email address."
                    );

                }


                /* =========================================
                   PASSWORD VALIDATION
                ========================================= */

                if (
                    passwordField &&
                    passwordField.value.trim() === ""
                ) {

                    isValid = false;

                    showInputError(
                        passwordField,
                        "Please enter your password."
                    );

                }


                /* =========================================
                   STOP IF INVALID
                ========================================= */

                if (!isValid) {

                    return;

                }


                /* =========================================
                   SAVE LOGIN INFORMATION
                ========================================= */

                localStorage.setItem(
                    "stacklyUserEmail",
                    email.value.trim()
                );

                localStorage.setItem(
                    "stacklyUserRole",
                    role
                );


                /* =========================================
                   REMEMBER ME
                ========================================= */

                const rememberMe =
                    document.getElementById(
                        "stacklyRemember"
                    );


                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "stacklyRememberMe",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "stacklyRememberMe"
                    );

                }


                /* =========================================
                   SUCCESS MESSAGE
                ========================================= */

                showLoginSuccess();


                /* =========================================
                   REDIRECT
                ========================================= */

                setTimeout(
                    function () {

                        if (role === "admin") {

                            window.location.href =
                                "admin.html";

                        } else if (
                            role === "client"
                        ) {

                            window.location.href =
                                "client.html";

                        }

                    },
                    1200
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       SHOW ROLE ERROR
    ===================================================== */

    function showRoleError(message) {

        if (!roleButton) return;


        roleButton.classList.add(
            "stackly-role-error"
        );


        const roleGroup =
            document.querySelector(
                ".stackly-role-group"
            );


        if (!roleGroup) return;


        let error =
            roleGroup.querySelector(
                ".stackly-field-error"
            );


        if (!error) {

            error =
                document.createElement(
                    "span"
                );

            error.className =
                "stackly-field-error";

            roleGroup.appendChild(error);

        }


        error.textContent = message;


        /* -----------------------------------------
           AUTO REMOVE ERROR WHEN ROLE IS SELECTED
        ----------------------------------------- */

        setTimeout(
            function () {

                if (
                    roleButton.classList.contains(
                        "stackly-role-error"
                    )
                ) {

                    roleButton.classList.remove(
                        "stackly-role-error"
                    );

                }

            },
            2500
        );

    }


    /* =====================================================
       SHOW INPUT ERROR
    ===================================================== */

    function showInputError(
        input,
        message
    ) {

        if (!input) return;


        input.classList.add(
            "stackly-input-error"
        );


        input.classList.add(
            "stackly-error-shake"
        );


        const group =
            input.closest(
                ".stackly-input-group"
            );


        if (group) {

            let error =
                group.querySelector(
                    ".stackly-field-error"
                );


            if (!error) {

                error =
                    document.createElement(
                        "span"
                    );

                error.className =
                    "stackly-field-error";

                group.appendChild(error);

            }


            error.textContent =
                message;

        }


        /* -----------------------------------------
           REMOVE SHAKE CLASS
        ----------------------------------------- */

        setTimeout(
            function () {

                input.classList.remove(
                    "stackly-error-shake"
                );

            },
            450
        );

    }


    /* =====================================================
       CLEAR ALL ERRORS
    ===================================================== */

    function clearLoginErrors() {

        const errorMessages =
            document.querySelectorAll(
                ".stackly-field-error"
            );


        errorMessages.forEach(
            function (error) {

                error.remove();

            }
        );


        const errorInputs =
            document.querySelectorAll(
                ".stackly-input-error"
            );


        errorInputs.forEach(
            function (input) {

                input.classList.remove(
                    "stackly-input-error"
                );

            }
        );


        if (roleButton) {

            roleButton.classList.remove(
                "stackly-role-error"
            );

        }

    }


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    function showLoginSuccess() {

        const oldMessage =
            document.querySelector(
                ".stackly-login-success"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "stackly-login-success";


        message.innerHTML =
            `
                <i class="fa-solid fa-circle-check"></i>
                <span>Login successful!</span>
            `;


        loginForm.prepend(message);


        /* -----------------------------------------
           SUCCESS MESSAGE STYLE
        ----------------------------------------- */

        message.style.cssText = `
            width: 100%;
            margin-bottom: 12px;
            padding: 11px 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 8px;
            background: #eff9d9;
            color: #587c00;
            border: 1px solid #c8e88a;
            font-size: 13px;
            font-weight: 600;
            animation: stacklySuccessIn 0.35s ease;
        `;

    }


    /* =====================================================
       REMOVE ERROR WHEN USER STARTS TYPING
    ===================================================== */

    const allInputs =
        document.querySelectorAll(
            "#stacklyLoginForm input"
        );


    allInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    input.classList.remove(
                        "stackly-input-error"
                    );


                    const group =
                        input.closest(
                            ".stackly-input-group"
                        );


                    if (group) {

                        const error =
                            group.querySelector(
                                ".stackly-field-error"
                            );

                        if (error) {

                            error.remove();

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIAL ARIA STATE
    ===================================================== */

    if (roleButton) {

        roleButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    roleOptions.forEach(
        function (option) {

            option.setAttribute(
                "aria-selected",
                "false"
            );

        }
    );

});