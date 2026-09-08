/* =========================================================
   STACKLY ADMIN DASHBOARD
   COMPLETE + CORRECT JAVASCRIPT
   SIDEBAR + ACCOUNT + CHARTS + SETTINGS
   CUSTOM DROPDOWNS + CROP PERFORMANCE
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       GLOBAL HELPERS
    ========================================================= */

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }


    /* =========================================================
       USER INFORMATION
    ========================================================= */

    const savedEmail =
        localStorage.getItem("stacklyUserEmail");

    const savedRole =
        localStorage.getItem("stacklyUserRole");

    const savedUserName =
        localStorage.getItem("stacklyUserName");


    /* =========================================================
       GET NAME FROM EMAIL
    ========================================================= */

    function getNameFromEmail(email) {

        if (!email || !email.includes("@")) {
            return "Farm Admin";
        }

        let name =
            email
                .split("@")[0]
                .trim();

        name =
            name
                .replace(/[._-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase()
                .replace(/\b\w/g, function (letter) {
                    return letter.toUpperCase();
                });

        return name || "Farm Admin";
    }


    /* =========================================================
       USER NAME
    ========================================================= */

    const userNameElement =
        document.getElementById(
            "stacklyAdminUserName"
        );

    const adminNameInput =
        document.getElementById(
            "stacklyAdminName"
        );


    let displayName =
        savedUserName ||
        getNameFromEmail(savedEmail);


    if (userNameElement) {
        userNameElement.textContent =
            displayName;
    }

    if (adminNameInput) {
        adminNameInput.value =
            displayName;
    }


    /* =========================================================
       USER EMAIL
    ========================================================= */

    const emailElements =
        document.querySelectorAll(
            ".stackly-account-details strong, #stacklyAdminEmail"
        );


    emailElements.forEach(function (element) {

        const email =
            savedEmail &&
            savedEmail.trim() !== ""
                ? savedEmail.trim()
                : "admin@stacklyfarm.com";


        if (element.tagName === "INPUT") {
            element.value = email;
        } else {
            element.textContent = email;
        }

    });


    /* =========================================================
       SIDEBAR ELEMENTS
    ========================================================= */

    const sidebar =
        document.getElementById(
            "stacklyAdminSidebar"
        );

    const menuToggle =
        document.getElementById(
            "stacklyMenuToggle"
        );

    const sidebarClose =
        document.getElementById(
            "stacklySidebarClose"
        );

    const sidebarOverlay =
        document.getElementById(
            "stacklySidebarOverlay"
        );

    const adminAccount =
        document.querySelector(
            ".stackly-admin-account"
        );

    const navLinks =
        document.querySelectorAll(
            ".stackly-nav-link"
        );

    const logoutLink =
        document.querySelector(
            ".stackly-logout-link"
        );


    let sidebarOpen = false;


    /* =========================================================
       SIDEBAR OPEN
    ========================================================= */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebarOpen = true;

        sidebar.classList.add("active");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close Menu"
            );

        }

        sidebar.setAttribute(
            "aria-hidden",
            "false"
        );


        if (window.innerWidth <= 991) {

            document.body.classList.add(
                "stackly-sidebar-open"
            );

            document.body.style.overflow =
                "hidden";

        }

    }


    /* =========================================================
       SIDEBAR CLOSE
    ========================================================= */

    function closeSidebar() {

        sidebarOpen = false;

        if (sidebar) {

            sidebar.classList.remove("active");

            sidebar.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

        document.body.classList.remove(
            "stackly-sidebar-open"
        );

        document.body.style.overflow = "";

    }


    /* =========================================================
       SIDEBAR TOGGLE
    ========================================================= */

    function toggleSidebar(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }

        if (sidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }

    }


    /* =========================================================
       MENU BUTTON
    ========================================================= */

    if (menuToggle) {

        menuToggle.type = "button";

        menuToggle.addEventListener(
            "click",
            toggleSidebar
        );

    }


    /* =========================================================
       SIDEBAR CLOSE BUTTON
    ========================================================= */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeSidebar();

            }
        );

    }


    /* =========================================================
       SIDEBAR OVERLAY
    ========================================================= */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .split("?")[0]
            .split("#")[0]
            .toLowerCase();


    if (!currentPage) {
        currentPage =
            "admin-dashboard.html";
    }


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();


        link.classList.remove("active");


        if (linkPage === currentPage) {
            link.classList.add("active");
        }


        link.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 991) {
                    closeSidebar();
                }

            }
        );

    });


    /* =========================================================
       ACCOUNT DROPDOWN
    ========================================================= */

    if (adminAccount) {

        adminAccount.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                adminAccount.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =========================================================
       CUSTOM DROPDOWN CLOSE SYSTEM
    ========================================================= */

    function closeAllCustomDropdowns(
        exceptDropdown = null
    ) {

        const dropdowns =
            document.querySelectorAll(
                ".stackly-js-dropdown, " +
                ".stackly-card-dropdown, " +
                ".stackly-crop-dropdown"
            );


        dropdowns.forEach(function (dropdown) {

            if (dropdown !== exceptDropdown) {

                dropdown.classList.remove(
                    "open"
                );


                const button =
                    dropdown.querySelector(
                        "button"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        });

    }


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" ||
                event.key === "Esc"
            ) {

                closeSidebar();

                if (adminAccount) {

                    adminAccount.classList.remove(
                        "active"
                    );

                }

                closeAllCustomDropdowns();

            }

        }
    );


    /* =========================================================
       CLICK OUTSIDE
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                adminAccount &&
                !adminAccount.contains(
                    event.target
                )
            ) {

                adminAccount.classList.remove(
                    "active"
                );

            }


            const clickedDropdown =
                event.target.closest(
                    ".stackly-js-dropdown, " +
                    ".stackly-card-dropdown, " +
                    ".stackly-crop-dropdown"
                );


            if (!clickedDropdown) {

                closeAllCustomDropdowns();

            }

        }
    );


    /* =========================================================
       WINDOW RESIZE
    ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 991) {
                closeSidebar();
            }

        }
    );


    /* =========================================================
       MOBILE SWIPE
    ========================================================= */

    let touchStartX = 0;
    let touchStartY = 0;


    document.addEventListener(
        "touchstart",
        function (event) {

            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {
                return;
            }

            touchStartX =
                event.changedTouches[0].clientX;

            touchStartY =
                event.changedTouches[0].clientY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        function (event) {

            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {
                return;
            }


            if (window.innerWidth > 991) {
                return;
            }


            const touchEndX =
                event.changedTouches[0].clientX;

            const touchEndY =
                event.changedTouches[0].clientY;


            const differenceX =
                touchEndX - touchStartX;

            const differenceY =
                touchEndY - touchStartY;


            if (
                Math.abs(differenceY) >
                Math.abs(differenceX)
            ) {
                return;
            }


            if (
                touchStartX <= 50 &&
                differenceX >= 70
            ) {

                openSidebar();

                return;

            }


            if (
                differenceX <= -70 &&
                sidebarOpen
            ) {

                closeSidebar();

            }

        },
        {
            passive: true
        }
    );


    /* =========================================================
       LOGOUT
    ========================================================= */

    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "stacklyUserEmail"
                );

                localStorage.removeItem(
                    "stacklyUserRole"
                );

                localStorage.removeItem(
                    "stacklyRememberMe"
                );

                localStorage.removeItem(
                    "stacklyUserName"
                );

                localStorage.removeItem(
                    "stacklySettings"
                );

                closeSidebar();

            }
        );

    }


    /* =========================================================
       INITIAL SIDEBAR STATE
    ========================================================= */

    closeSidebar();


    /* =========================================================
       CUSTOM DROPDOWN SYSTEM
    ========================================================= */

    const dropdownInstances = {};


    function getDropdownMenu(
        dropdown,
        menuId,
        menuSelector
    ) {

        let menu = null;


        if (menuId) {

            menu =
                document.getElementById(
                    menuId
                );

        }


        if (!menu && menuSelector) {

            menu =
                dropdown.querySelector(
                    menuSelector
                );

        }


        return menu;

    }


    function initializeCustomDropdown(config) {

        const dropdown =
            document.getElementById(
                config.dropdownId
            );

        const button =
            document.getElementById(
                config.buttonId
            );

        const selected =
            document.getElementById(
                config.selectedId
            );

        const hiddenInput =
            document.getElementById(
                config.hiddenInputId
            );


        if (
            !dropdown ||
            !button ||
            !selected ||
            !hiddenInput
        ) {

            return null;

        }


        const menu =
            getDropdownMenu(
                dropdown,
                config.menuId,
                config.menuSelector
            );


        if (!menu) {
            return null;
        }


        const optionSelector =
            config.optionSelector ||
            ".stackly-js-option, " +
            ".stackly-card-option";


        const options =
            menu.querySelectorAll(
                optionSelector
            );


        if (!options.length) {
            return null;
        }


        /* =====================================================
           ACCESSIBILITY
        ===================================================== */

        button.type = "button";

        button.setAttribute(
            "aria-haspopup",
            "listbox"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        menu.setAttribute(
            "role",
            "listbox"
        );


        options.forEach(function (option) {

            option.setAttribute(
                "role",
                "option"
            );

            option.setAttribute(
                "tabindex",
                "-1"
            );

        });


        /* =====================================================
           RENDER SELECTED OPTION
        ===================================================== */

        function renderSelected(option) {

            if (!option) {
                return;
            }


            const value =
                option.getAttribute(
                    "data-value"
                );


            const icon =
                option.querySelector("i");


            if (icon) {

                selected.innerHTML =
                    '<i class="' +
                    icon.className +
                    '"></i> ' +
                    value;

            } else {

                selected.textContent =
                    value;

            }

        }


        /* =====================================================
           SELECT OPTION
        ===================================================== */

        function selectOption(
            option,
            triggerEvent = true
        ) {

            if (!option) {
                return;
            }


            const value =
                option.getAttribute(
                    "data-value"
                );


            if (!value) {
                return;
            }


            hiddenInput.value =
                value;


            renderSelected(option);


            options.forEach(
                function (item) {

                    const isActive =
                        item === option;


                    item.classList.toggle(
                        "active",
                        isActive
                    );

                    item.setAttribute(
                        "aria-selected",
                        isActive
                            ? "true"
                            : "false"
                    );

                }
            );


            dropdown.classList.remove(
                "open"
            );


            button.setAttribute(
                "aria-expanded",
                "false"
            );


            if (triggerEvent) {

                hiddenInput.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );


                if (config.changeEvent) {

                    dropdown.dispatchEvent(
                        new CustomEvent(
                            config.changeEvent,
                            {
                                bubbles: true,
                                detail: {
                                    value: value
                                }
                            }
                        )
                    );

                }

            }

        }


        /* =====================================================
           SYNC DROPDOWN
        ===================================================== */

        function syncDropdown() {

            const currentValue =
                String(
                    hiddenInput.value || ""
                ).trim();


            let matchedOption = null;


            options.forEach(
                function (option) {

                    const optionValue =
                        option.getAttribute(
                            "data-value"
                        );


                    const isActive =
                        optionValue ===
                        currentValue;


                    option.classList.toggle(
                        "active",
                        isActive
                    );


                    option.setAttribute(
                        "aria-selected",
                        isActive
                            ? "true"
                            : "false"
                    );


                    if (isActive) {
                        matchedOption =
                            option;
                    }

                }
            );


            if (!matchedOption) {

                matchedOption =
                    options[0];

                if (matchedOption) {

                    hiddenInput.value =
                        matchedOption.getAttribute(
                            "data-value"
                        );

                }

            }


            if (matchedOption) {
                renderSelected(
                    matchedOption
                );
            }

        }


        /* =====================================================
           BUTTON CLICK
        ===================================================== */

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "open"
                    );


                closeAllCustomDropdowns(
                    dropdown
                );


                if (!isOpen) {

                    dropdown.classList.add(
                        "open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );


        /* =====================================================
           OPTION CLICK
        ===================================================== */

        options.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        selectOption(
                            option,
                            true
                        );

                    }
                );

            }
        );


        /* =====================================================
           KEYBOARD SUPPORT
        ===================================================== */

        button.addEventListener(
            "keydown",
            function (event) {

                const currentIndex =
                    Array.from(
                        options
                    ).findIndex(
                        function (option) {

                            return option.classList.contains(
                                "active"
                            );

                        }
                    );


                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                    return;

                }


                if (
                    event.key === "ArrowDown" ||
                    event.key === "ArrowUp"
                ) {

                    event.preventDefault();


                    closeAllCustomDropdowns(
                        dropdown
                    );


                    dropdown.classList.add(
                        "open"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );


                    let nextIndex;


                    if (
                        event.key ===
                        "ArrowDown"
                    ) {

                        nextIndex =
                            currentIndex <
                            options.length - 1
                                ? currentIndex + 1
                                : 0;

                    } else {

                        nextIndex =
                            currentIndex > 0
                                ? currentIndex - 1
                                : options.length - 1;

                    }


                    const nextOption =
                        options[nextIndex];


                    if (nextOption) {

                        options.forEach(
                            function (item) {

                                item.classList.remove(
                                    "keyboard-active"
                                );

                            }
                        );


                        nextOption.classList.add(
                            "keyboard-active"
                        );

                        nextOption.focus();

                    }

                    return;

                }


                if (
                    event.key === "Escape"
                ) {

                    event.preventDefault();

                    dropdown.classList.remove(
                        "open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    button.focus();

                }

            }
        );


        /* =====================================================
           OPTION KEYBOARD SUPPORT
        ===================================================== */

        options.forEach(
            function (option, index) {

                option.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            selectOption(
                                option,
                                true
                            );

                            button.focus();

                            return;

                        }


                        if (
                            event.key === "Escape"
                        ) {

                            event.preventDefault();

                            dropdown.classList.remove(
                                "open"
                            );

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            button.focus();

                            return;

                        }


                        if (
                            event.key ===
                            "ArrowDown"
                        ) {

                            event.preventDefault();

                            const next =
                                options[
                                    (index + 1) %
                                    options.length
                                ];

                            if (next) {
                                next.focus();
                            }

                        }


                        if (
                            event.key ===
                            "ArrowUp"
                        ) {

                            event.preventDefault();

                            const previous =
                                options[
                                    (index -
                                        1 +
                                        options.length) %
                                    options.length
                                ];

                            if (previous) {
                                previous.focus();
                            }

                        }

                    }
                );

            }
        );


        /* =====================================================
           INITIALIZE
        ===================================================== */

        syncDropdown();


        return {
            sync: syncDropdown,
            select: selectOption
        };

    }


    /* =========================================================
       FARMING TYPE DROPDOWN
    ========================================================= */

    dropdownInstances.farmType =
        initializeCustomDropdown({

            dropdownId:
                "stacklyFarmDropdown",

            buttonId:
                "stacklyFarmDropdownBtn",

            menuId:
                "stacklyFarmDropdownMenu",

            selectedId:
                "stacklyFarmSelected",

            hiddenInputId:
                "stacklyFarmType",

            optionSelector:
                ".stackly-js-option",

            changeEvent:
                "stacklyFarmTypeChange"

        });


    /* =========================================================
       MEASUREMENT UNIT DROPDOWN
    ========================================================= */

    dropdownInstances.farmUnit =
        initializeCustomDropdown({

            dropdownId:
                "stacklyFarmUnitDropdown",

            buttonId:
                "stacklyFarmUnitDropdownBtn",

            menuId:
                "stacklyFarmUnitDropdownMenu",

            selectedId:
                "stacklyFarmUnitSelected",

            hiddenInputId:
                "stacklyFarmUnit",

            optionSelector:
                ".stackly-js-option",

            changeEvent:
                "stacklyFarmUnitChange"

        });


    /* =========================================================
       YEAR / PERIOD DROPDOWN
    ========================================================= */

    dropdownInstances.year =
        initializeCustomDropdown({

            dropdownId:
                "stacklyYearDropdown",

            buttonId:
                "stacklyYearDropdownBtn",

            menuId:
                "stacklyYearDropdownMenu",

            menuSelector:
                ".stackly-card-dropdown-menu",

            selectedId:
                "stacklyYearSelected",

            hiddenInputId:
                "stacklyYearValue",

            optionSelector:
                ".stackly-card-option",

            changeEvent:
                "stacklyYearChange"

        });


    /* =========================================================
       CROP PERFORMANCE CUSTOM DROPDOWN
    ========================================================= */

    dropdownInstances.crop =
        initializeCustomDropdown({

            dropdownId:
                "stacklyCropDropdown",

            buttonId:
                "stacklyCropDropdownBtn",

            menuId:
                "stacklyCropDropdownMenu",

            selectedId:
                "stacklyCropSelected",

            hiddenInputId:
                "stacklyCropFilter",

            optionSelector:
                ".stackly-crop-option",

            changeEvent:
                "stacklyCropFilterChange"

        });


    /* =========================================================
       SYNCHRONIZE ALL DROPDOWNS
    ========================================================= */

    function syncAllCustomDropdowns() {

        Object.keys(
            dropdownInstances
        ).forEach(
            function (key) {

                if (
                    dropdownInstances[key] &&
                    typeof dropdownInstances[key].sync ===
                    "function"
                ) {

                    dropdownInstances[key].sync();

                }

            }
        );

    }


    /* =========================================================
       PRODUCTION CHART DATA
    ========================================================= */

    const productionData = {

        "This Year": [
            38, 52, 45, 68,
            61, 79, 91, 84,
            96, 88, 100, 94
        ],

        "Last Year": [
            32, 44, 41, 55,
            50, 67, 76, 71,
            82, 78, 89, 85
        ],

        "This Season": [
            25, 39, 48, 61,
            70, 82, 90, 86,
            94, 97, 100, 98
        ]

    };


    const productionSelect =
        document.querySelector(
            ".stackly-card-select"
        );


    const yearValue =
        document.getElementById(
            "stacklyYearValue"
        );


    const chartBars =
        document.querySelectorAll(
            ".stackly-chart-line span"
        );


    function updateProductionChart(type) {

        const values =
            productionData[type];


        if (
            !values ||
            !chartBars.length
        ) {

            return;

        }


        chartBars.forEach(
            function (bar, index) {

                const value =
                    values[index] ?? 0;


                bar.style.height =
                    value + "%";

            }
        );

    }


    if (productionSelect) {

        productionSelect.addEventListener(
            "change",
            function () {

                updateProductionChart(
                    this.value
                );

            }
        );

    }


    if (yearValue) {

        yearValue.addEventListener(
            "change",
            function () {

                updateProductionChart(
                    this.value
                );

            }
        );

    }


    updateProductionChart(
        yearValue
            ? yearValue.value
            : productionSelect
                ? productionSelect.value
                : "This Year"
    );


    /* =========================================================
       CROP PERFORMANCE DATA
    ========================================================= */

    const performanceData = {

        "This Season": {

            rice: "96%",
            carrot: "88%",
            tomato: "92%",
            chilli: "84%"

        },

        "This Year": {

            rice: "93%",
            carrot: "86%",
            tomato: "89%",
            chilli: "81%"

        },

        "Last Year": {

            rice: "89%",
            carrot: "82%",
            tomato: "85%",
            chilli: "78%"

        }

    };


    /* =========================================================
       CROP PERFORMANCE ELEMENTS
    ========================================================= */

    const performanceBars =
        document.querySelectorAll(
            ".crop-performance-bars .crop-bar span"
        );


    const performanceValues =
        document.querySelectorAll(
            ".crop-performance-bars .crop-bar-item strong"
        );


    const cropFilterHidden =
        document.getElementById(
            "stacklyCropFilter"
        );


    const nativeCropFilter =
        document.querySelector(
            ".crop-filter"
        );


    /* =========================================================
       STORE ORIGINAL BAR WIDTHS
    ========================================================= */

    function prepareProgressBars(bars) {

        bars.forEach(
            function (bar) {

                let finalWidth =
                    bar.getAttribute(
                        "data-width"
                    );


                if (!finalWidth) {

                    finalWidth =
                        bar.style.width;

                }


                if (
                    finalWidth &&
                    finalWidth !== "0px" &&
                    finalWidth !== "0"
                ) {

                    bar.dataset.width =
                        finalWidth;

                }

            }
        );

    }


    const miniProgressBars =
        document.querySelectorAll(
            ".mini-progress span"
        );


    const fieldProgressBars =
        document.querySelectorAll(
            ".field-progress-bar span"
        );


    prepareProgressBars(
        performanceBars
    );

    prepareProgressBars(
        miniProgressBars
    );

    prepareProgressBars(
        fieldProgressBars
    );


    /* =========================================================
       UPDATE CROP PERFORMANCE
    ========================================================= */

    function updateCropPerformance(
        selectedValue
    ) {

        const data =
            performanceData[selectedValue];


        if (!data) {

            console.warn(
                "Invalid crop performance filter:",
                selectedValue
            );

            return;

        }


        const newValues = [

            data.rice,
            data.carrot,
            data.tomato,
            data.chilli

        ];


        /* =====================================================
           UPDATE BARS
        ===================================================== */

        performanceBars.forEach(
            function (bar, index) {

                const newValue =
                    newValues[index] || "0%";


                bar.style.width = "0";


                setTimeout(
                    function () {

                        bar.style.width =
                            newValue;

                    },
                    100 + index * 80
                );

            }
        );


        /* =====================================================
           UPDATE PERCENTAGE TEXT
        ===================================================== */

        performanceValues.forEach(
            function (value, index) {

                if (
                    newValues[index]
                ) {

                    value.textContent =
                        newValues[index];

                }

            }
        );


        /* =====================================================
           UPDATE SCORE CIRCLE
        ===================================================== */

        const average =
            Math.round(
                newValues
                    .map(
                        function (value) {
                            return parseInt(
                                value,
                                10
                            ) || 0;
                        }
                    )
                    .reduce(
                        function (
                            total,
                            value
                        ) {
                            return total + value;
                        },
                        0
                    ) /
                newValues.length
            );


        const scoreCircle =
            document.querySelector(
                ".crop-score-circle"
            );


        if (scoreCircle) {

            scoreCircle.style.setProperty(
                "--score",
                average + "%"
            );


            const scoreText =
                scoreCircle.querySelector(
                    "strong, .score-number, span"
                );


            if (scoreText) {

                scoreText.textContent =
                    average + "%";

            }

        }


        console.log(
            "Crop Performance Updated:",
            selectedValue,
            newValues
        );

    }


    /* =========================================================
       CROP FILTER - CUSTOM DROPDOWN
    ========================================================= */

    if (cropFilterHidden) {

        cropFilterHidden.addEventListener(
            "change",
            function () {

                updateCropPerformance(
                    this.value
                );

            }
        );

    }


    /* =========================================================
       CROP FILTER - CUSTOM EVENT
       Useful for external scripts
    ========================================================= */

    const cropDropdown =
        document.getElementById(
            "stacklyCropDropdown"
        );


    if (cropDropdown) {

        cropDropdown.addEventListener(
            "stacklyCropFilterChange",
            function (event) {

                const value =
                    event.detail &&
                    event.detail.value
                        ? event.detail.value
                        : cropFilterHidden
                            ? cropFilterHidden.value
                            : "This Season";


                updateCropPerformance(
                    value
                );

            }
        );

    }


    /* =========================================================
       CROP FILTER - OLD NATIVE SELECT FALLBACK
    ========================================================= */

    if (nativeCropFilter) {

        nativeCropFilter.addEventListener(
            "change",
            function () {

                updateCropPerformance(
                    this.value
                );

            }
        );

    }


    /* =========================================================
       INITIAL CROP PERFORMANCE
    ========================================================= */

    const initialCropValue =
        cropFilterHidden
            ? cropFilterHidden.value
            : nativeCropFilter
                ? nativeCropFilter.value
                : "This Season";


    updateCropPerformance(
        performanceData[initialCropValue]
            ? initialCropValue
            : "This Season"
    );


    /* =========================================================
       SCORE CIRCLE DEFAULT
    ========================================================= */

    const scoreCircle =
        document.querySelector(
            ".crop-score-circle"
        );


    if (scoreCircle) {

        scoreCircle.style.setProperty(
            "--score",
            "91%"
        );

    }


    /* =========================================================
       ANIMATE PROGRESS BARS
    ========================================================= */

    function animateBars(
        container,
        selector,
        delay
    ) {

        if (!container) {
            return;
        }


        const bars =
            container.querySelectorAll(
                selector
            );


        bars.forEach(
            function (bar, index) {

                setTimeout(
                    function () {

                        if (
                            bar.dataset.width
                        ) {

                            bar.style.width =
                                bar.dataset.width;

                        }

                    },
                    index * delay
                );

            }
        );

    }


    /* =========================================================
       OBSERVER
    ========================================================= */

    const performanceSection =
        document.querySelector(
            ".crop-performance-card"
        );


    const fieldHealthSection =
        document.querySelector(
            ".field-health-section"
        );


    const tableSection =
        document.querySelector(
            ".crop-table-section"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const performanceObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            if (
                                entry.target.classList.contains(
                                    "crop-performance-card"
                                )
                            ) {

                                animateBars(
                                    entry.target,
                                    ".crop-bar span",
                                    180
                                );

                            }


                            if (
                                entry.target.classList.contains(
                                    "field-health-section"
                                )
                            ) {

                                animateBars(
                                    entry.target,
                                    ".field-progress-bar span",
                                    150
                                );

                            }


                            if (
                                entry.target.classList.contains(
                                    "crop-table-section"
                                )
                            ) {

                                animateBars(
                                    entry.target,
                                    ".mini-progress span",
                                    150
                                );

                            }


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.25
                }
            );


        if (performanceSection) {

            performanceObserver.observe(
                performanceSection
            );

        }


        if (fieldHealthSection) {

            performanceObserver.observe(
                fieldHealthSection
            );

        }


        if (tableSection) {

            performanceObserver.observe(
                tableSection
            );

        }

    } else {

        animateBars(
            performanceSection,
            ".crop-bar span",
            100
        );


        animateBars(
            fieldHealthSection,
            ".field-progress-bar span",
            100
        );


        animateBars(
            tableSection,
            ".mini-progress span",
            100
        );

    }


    /* =========================================================
       DASHBOARD CARD HOVER
    ========================================================= */

    const dashboardCards =
        document.querySelectorAll(
            ".crop-dashboard-card, " +
            ".field-health-card, " +
            ".crop-feature-card"
        );


    dashboardCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "crop-card-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "crop-card-hover"
                    );

                }
            );

        }
    );


    /* =========================================================
       GROWTH STAGES
    ========================================================= */

    const growthStages =
        document.querySelectorAll(
            ".growth-stage"
        );


    growthStages.forEach(
        function (stage) {

            stage.addEventListener(
                "click",
                function () {

                    growthStages.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    stage.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =========================================================
       FIELD HEALTH CARDS
    ========================================================= */

    const fieldCards =
        document.querySelectorAll(
            ".field-health-card"
        );


    fieldCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    fieldCards.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    card.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


    /* =========================================================
       HARVEST DAYS
    ========================================================= */

    const harvestDays =
        document.querySelectorAll(
            ".harvest-day"
        );


    harvestDays.forEach(
        function (day) {

            day.addEventListener(
                "click",
                function () {

                    harvestDays.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    day.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =========================================================
       TABLE ROW SELECTION
    ========================================================= */

    const tableRows =
        document.querySelectorAll(
            ".crop-management-table tbody tr"
        );


    tableRows.forEach(
        function (row) {

            row.addEventListener(
                "click",
                function () {

                    tableRows.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected-row"
                            );

                        }
                    );


                    row.classList.add(
                        "selected-row"
                    );

                }
            );

        }
    );


    /* =========================================================
       RIPPLE EFFECT
    ========================================================= */

    const rippleButtons =
        document.querySelectorAll(
            ".crop-primary-btn, " +
            ".crop-secondary-btn, " +
            ".crop-table-actions a"
        );


    rippleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "crop-ripple";


                    const rect =
                        button.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    ripple.style.width =
                        size + "px";

                    ripple.style.height =
                        size + "px";


                    const x =
                        typeof event.clientX ===
                        "number"
                            ? event.clientX
                            : rect.left +
                              rect.width / 2;


                    const y =
                        typeof event.clientY ===
                        "number"
                            ? event.clientY
                            : rect.top +
                              rect.height / 2;


                    ripple.style.left =
                        x -
                        rect.left -
                        size / 2 +
                        "px";


                    ripple.style.top =
                        y -
                        rect.top -
                        size / 2 +
                        "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        function () {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );


    /* =========================================================
       HERO VISUAL
    ========================================================= */

    const heroVisual =
        document.querySelector(
            ".crop-hero-visual"
        );


    if (heroVisual) {

        heroVisual.classList.add(
            "crop-visual-loaded"
        );

    }


    /* =========================================================
       HARVEST ANALYTICS
    ========================================================= */

    const harvestChartBars =
        document.querySelectorAll(
            ".stackly-chart-bar"
        );


    const harvestFilterButtons =
        document.querySelectorAll(
            ".stackly-chart-filters button"
        );


    const harvestYAxis =
        document.querySelectorAll(
            ".stackly-chart-y-axis span"
        );


    const chartData = {

        Weekly: {

            values: [
                48, 67, 58,
                82, 73, 91, 64
            ],

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            axis: [
                "2,000",
                "1,500",
                "1,000",
                "500",
                "0"
            ]

        },


        Monthly: {

            values: [
                62, 74, 58,
                86, 69, 92, 77
            ],

            labels: [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Week 6",
                "Week 7"
            ],

            axis: [
                "8,000",
                "6,000",
                "4,000",
                "2,000",
                "0"
            ]

        },


        Yearly: {

            values: [
                52, 68, 74,
                61, 83, 94, 78
            ],

            labels: [
                "Jan",
                "Mar",
                "May",
                "Jul",
                "Sep",
                "Nov",
                "Dec"
            ],

            axis: [
                "20,000",
                "15,000",
                "10,000",
                "5,000",
                "0"
            ]

        }

    };


    /* =========================================================
       UPDATE HARVEST CHART
    ========================================================= */

    function updateHarvestChart(type) {

        const data =
            chartData[type];


        if (!data) {
            return;
        }


        harvestChartBars.forEach(
            function (bar, index) {

                const value =
                    data.values[index] ?? 0;


                const label =
                    bar.querySelector(
                        "span"
                    );


                bar.classList.remove(
                    "stackly-chart-bar-animate"
                );


                void bar.offsetWidth;


                bar.style.height =
                    value + "%";


                if (label) {

                    label.textContent =
                        data.labels[index] || "";

                }


                bar.classList.add(
                    "stackly-chart-bar-animate"
                );

            }
        );


        harvestYAxis.forEach(
            function (axis, index) {

                axis.textContent =
                    data.axis[index] || "";

            }
        );

    }


    /* =========================================================
       HARVEST FILTER BUTTONS
    ========================================================= */

    harvestFilterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    harvestFilterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    updateHarvestChart(
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    updateHarvestChart(
        "Weekly"
    );


    /* =========================================================
       HARVEST TOOLTIP
    ========================================================= */

    harvestChartBars.forEach(
        function (bar, index) {

            bar.addEventListener(
                "mouseenter",
                function () {

                    const activeButton =
                        document.querySelector(
                            ".stackly-chart-filters button.active"
                        );


                    const selectedType =
                        activeButton
                            ? activeButton.textContent.trim()
                            : "Weekly";


                    const data =
                        chartData[
                            selectedType
                        ];


                    if (
                        !data ||
                        data.values[index] ===
                        undefined
                    ) {

                        return;

                    }


                    const oldTooltip =
                        bar.querySelector(
                            ".stackly-chart-tooltip"
                        );


                    if (oldTooltip) {
                        oldTooltip.remove();
                    }


                    const tooltip =
                        document.createElement(
                            "div"
                        );


                    tooltip.className =
                        "stackly-chart-tooltip";


                    tooltip.textContent =
                        data.values[index] +
                        "%";


                    bar.appendChild(
                        tooltip
                    );

                }
            );


            bar.addEventListener(
                "mouseleave",
                function () {

                    const tooltip =
                        bar.querySelector(
                            ".stackly-chart-tooltip"
                        );


                    if (tooltip) {
                        tooltip.remove();
                    }

                }
            );

        }
    );


    /* =========================================================
       REPORT PERIOD CHART
    ========================================================= */

    const periodButtons =
        document.querySelectorAll(
            ".stackly-report-periods button"
        );


    const productionBars =
        document.querySelectorAll(
            ".production-bar"
        );


    const yAxisLabels =
        document.querySelectorAll(
            ".production-y-axis span"
        );


    const highestOutputText =
        document.querySelector(
            ".stackly-report-chart-footer strong"
        );


    const chartPositive =
        document.querySelector(
            ".chart-positive"
        );


    const reportPeriods = {

        "7 Days": {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
                ""
            ],

            values: [
                42,
                56,
                49,
                71,
                64,
                84,
                77,
                68
            ],

            axis: [
                "2.0K",
                "1.5K",
                "1.0K",
                "500",
                "0"
            ],

            highest:
                "Sunday · 1.68K kg",

            growth:
                "12.4%"

        },


        "30 Days": {

            labels: [
                "W1",
                "W2",
                "W3",
                "W4",
                "W5",
                "W6",
                "W7",
                "W8"
            ],

            values: [
                48,
                61,
                55,
                73,
                67,
                82,
                76,
                91
            ],

            axis: [
                "4.0K",
                "3.0K",
                "2.0K",
                "1.0K",
                "0"
            ],

            highest:
                "Week 8 · 3.64K kg",

            growth:
                "16.8%"

        },


        "6 Months": {

            labels: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "",
                ""
            ],

            values: [
                54,
                66,
                78,
                71,
                93,
                86,
                74,
                68
            ],

            axis: [
                "6K",
                "4.5K",
                "3K",
                "1.5K",
                "0"
            ],

            highest:
                "August · 5.58K kg",

            growth:
                "18.4%"

        },


        "1 Year": {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug"
            ],

            values: [
                46,
                58,
                51,
                72,
                66,
                84,
                78,
                93
            ],

            axis: [
                "8K",
                "6K",
                "4K",
                "2K",
                "0"
            ],

            highest:
                "August · 7.4K kg",

            growth:
                "18.4%"

        }

    };


    /* =========================================================
       UPDATE REPORT CHART
    ========================================================= */

    function updateReportChart(period) {

        const data =
            reportPeriods[period];


        if (!data) {
            return;
        }


        yAxisLabels.forEach(
            function (label, index) {

                label.textContent =
                    data.axis[index] || "";

            }
        );


        productionBars.forEach(
            function (bar, index) {

                const value =
                    data.values[index] ?? 0;


                const label =
                    bar.querySelector(
                        "span"
                    );


                bar.classList.remove(
                    "report-period-animation"
                );


                void bar.offsetWidth;


                bar.style.height =
                    value + "%";


                if (label) {

                    label.textContent =
                        data.labels[index] || "";

                }


                bar.classList.add(
                    "report-period-animation"
                );

            }
        );


        if (highestOutputText) {

            highestOutputText.textContent =
                data.highest;

        }


        if (chartPositive) {

            chartPositive.innerHTML =
                '<i class="fa-solid fa-arrow-trend-up"></i> ' +
                data.growth;

        }

    }


    /* =========================================================
       REPORT BUTTONS
    ========================================================= */

    periodButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    periodButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    updateReportChart(
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    updateReportChart(
        "7 Days"
    );


    /* =========================================================
       SETTINGS ELEMENTS
    ========================================================= */

    const settingsName =
        document.getElementById(
            "stacklyAdminName"
        );


    const settingsEmail =
        document.getElementById(
            "stacklyAdminEmail"
        );


    const settingsRole =
        document.getElementById(
            "stacklyAdminRole"
        );


    const farmTypeInput =
        document.getElementById(
            "stacklyFarmType"
        );


    const farmUnitInput =
        document.getElementById(
            "stacklyFarmUnit"
        );


    const farmLocationInput =
        document.getElementById(
            "stacklyFarmLocation"
        );


    const saveButton =
        document.querySelector(
            ".stackly-settings-save-btn"
        );


    const resetButton =
        document.querySelector(
            ".stackly-settings-reset-btn"
        );


    const notificationInputs =
        document.querySelectorAll(
            ".stackly-settings-option input[type='checkbox']"
        );


    /* =========================================================
       DEFAULT SETTINGS
    ========================================================= */

    const defaultSettings = {

        farmName:
            "Farm Admin",

        farmEmail:
            "admin@stacklyfarm.com",

        farmRole:
            "Farm Administrator",

        farmType:
            "Organic Farming",

        farmUnit:
            "Metric (kg / hectare)",

        farmLocation:
            "Tamil Nadu, India",

        harvestAlerts:
            true,

        inventoryAlerts:
            true,

        irrigationAlerts:
            true,

        weeklyReports:
            false

    };


    /* =========================================================
       LOAD SETTINGS
    ========================================================= */

    function loadSavedSettings() {

        let savedSettings = null;


        try {

            const storedSettings =
                localStorage.getItem(
                    "stacklySettings"
                );


            if (storedSettings) {

                savedSettings =
                    JSON.parse(
                        storedSettings
                    );

            }

        } catch (error) {

            console.warn(
                "Unable to load Stackly settings.",
                error
            );

            savedSettings = null;

        }


        if (!savedSettings) {

            syncAllCustomDropdowns();

            return;

        }


        if (
            settingsName &&
            savedSettings.farmName
        ) {

            settingsName.value =
                savedSettings.farmName;

        }


        if (
            settingsEmail &&
            savedSettings.farmEmail
        ) {

            settingsEmail.value =
                savedSettings.farmEmail;

        }


        if (
            settingsRole &&
            savedSettings.farmRole
        ) {

            settingsRole.value =
                savedSettings.farmRole;

        }


        if (
            farmTypeInput &&
            savedSettings.farmType
        ) {

            farmTypeInput.value =
                savedSettings.farmType;

        }


        if (
            farmUnitInput &&
            savedSettings.farmUnit
        ) {

            farmUnitInput.value =
                savedSettings.farmUnit;

        }


        if (
            farmLocationInput &&
            savedSettings.farmLocation
        ) {

            farmLocationInput.value =
                savedSettings.farmLocation;

        }


        if (notificationInputs.length >= 4) {

            notificationInputs[0].checked =
                savedSettings.harvestAlerts ??
                true;


            notificationInputs[1].checked =
                savedSettings.inventoryAlerts ??
                true;


            notificationInputs[2].checked =
                savedSettings.irrigationAlerts ??
                true;


            notificationInputs[3].checked =
                savedSettings.weeklyReports ??
                false;

        }


        syncAllCustomDropdowns();

    }


    /* =========================================================
       SAVE SETTINGS
    ========================================================= */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const settings = {

                    farmName:
                        settingsName
                            ? settingsName.value.trim()
                            : defaultSettings.farmName,

                    farmEmail:
                        settingsEmail
                            ? settingsEmail.value.trim()
                            : defaultSettings.farmEmail,

                    farmRole:
                        settingsRole
                            ? settingsRole.value
                            : defaultSettings.farmRole,

                    farmType:
                        farmTypeInput
                            ? farmTypeInput.value
                            : defaultSettings.farmType,

                    farmUnit:
                        farmUnitInput
                            ? farmUnitInput.value
                            : defaultSettings.farmUnit,

                    farmLocation:
                        farmLocationInput
                            ? farmLocationInput.value.trim()
                            : defaultSettings.farmLocation,

                    harvestAlerts:
                        notificationInputs[0]
                            ? notificationInputs[0].checked
                            : true,

                    inventoryAlerts:
                        notificationInputs[1]
                            ? notificationInputs[1].checked
                            : true,

                    irrigationAlerts:
                        notificationInputs[2]
                            ? notificationInputs[2].checked
                            : true,

                    weeklyReports:
                        notificationInputs[3]
                            ? notificationInputs[3].checked
                            : false

                };


                localStorage.setItem(
                    "stacklySettings",
                    JSON.stringify(settings)
                );


                localStorage.setItem(
                    "stacklyUserName",
                    settings.farmName
                );


                if (userNameElement) {

                    userNameElement.textContent =
                        settings.farmName;

                }


                if (adminNameInput) {

                    adminNameInput.value =
                        settings.farmName;

                }


                const originalHTML =
                    saveButton.innerHTML;


                saveButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Saved!';


                saveButton.disabled =
                    true;


                setTimeout(
                    function () {

                        saveButton.innerHTML =
                            originalHTML;

                        saveButton.disabled =
                            false;

                    },
                    2000
                );

            }
        );

    }


    /* =========================================================
       RESET SETTINGS
    ========================================================= */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                const currentEmail =
                    localStorage.getItem(
                        "stacklyUserEmail"
                    );


                const resetName =
                    currentEmail
                        ? getNameFromEmail(
                            currentEmail
                        )
                        : defaultSettings.farmName;


                if (settingsName) {

                    settingsName.value =
                        resetName;

                }


                if (settingsEmail) {

                    settingsEmail.value =
                        currentEmail ||
                        defaultSettings.farmEmail;

                }


                if (settingsRole) {

                    settingsRole.value =
                        defaultSettings.farmRole;

                }


                if (farmTypeInput) {

                    farmTypeInput.value =
                        defaultSettings.farmType;

                }


                if (farmUnitInput) {

                    farmUnitInput.value =
                        defaultSettings.farmUnit;

                }


                if (farmLocationInput) {

                    farmLocationInput.value =
                        defaultSettings.farmLocation;

                }


                if (notificationInputs.length >= 4) {

                    notificationInputs[0].checked =
                        true;

                    notificationInputs[1].checked =
                        true;

                    notificationInputs[2].checked =
                        true;

                    notificationInputs[3].checked =
                        false;

                }


                localStorage.removeItem(
                    "stacklySettings"
                );


                localStorage.setItem(
                    "stacklyUserName",
                    resetName
                );


                if (userNameElement) {

                    userNameElement.textContent =
                        resetName;

                }


                syncAllCustomDropdowns();


                const originalText =
                    resetButton.textContent;


                resetButton.textContent =
                    "Reset Done";


                resetButton.disabled =
                    true;


                setTimeout(
                    function () {

                        resetButton.textContent =
                            originalText;

                        resetButton.disabled =
                            false;

                    },
                    1500
                );

            }
        );

    }


    /* =========================================================
       LOAD SETTINGS AFTER DROPDOWNS INITIALIZED
       IMPORTANT FIX
    ========================================================= */

    loadSavedSettings();


    /* =========================================================
       ACCESSIBILITY FOCUS
    ========================================================= */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, select, textarea, " +
            ".growth-stage, " +
            ".field-health-card, " +
            ".stackly-js-option, " +
            ".stackly-card-option, " +
            ".stackly-crop-option"
        );


    interactiveElements.forEach(
        function (element) {

            element.addEventListener(
                "focus",
                function () {

                    element.classList.add(
                        "crop-keyboard-focus"
                    );

                }
            );


            element.addEventListener(
                "blur",
                function () {

                    element.classList.remove(
                        "crop-keyboard-focus"
                    );

                }
            );

        }
    );


    /* =========================================================
       REDUCED MOTION
    ========================================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateReducedMotion() {

        if (reducedMotion.matches) {

            document.documentElement.classList.add(
                "reduce-motion"
            );

        } else {

            document.documentElement.classList.remove(
                "reduce-motion"
            );

        }

    }


    updateReducedMotion();


    if (
        typeof reducedMotion.addEventListener ===
        "function"
    ) {

        reducedMotion.addEventListener(
            "change",
            updateReducedMotion
        );

    }


    /* =========================================================
       PAGE LOADED
    ========================================================= */

    document.body.classList.add(
        "crop-page-loaded"
    );


});