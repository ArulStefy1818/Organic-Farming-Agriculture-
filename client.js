/* =========================================================
   STACKLY ORGANIC FARMING
   CLIENT DASHBOARD
   COMPLETE JAVASCRIPT
   SIDEBAR + USER DETAILS + LOGOUT
   CROP PRODUCTION + CUSTOM YEAR DROPDOWN
   RESPONSIVE + ACCESSIBILITY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       GLOBAL ELEMENT SELECTORS
    ====================================================== */

    const sidebar =
        document.getElementById("stacklyClientSidebar");

    const overlay =
        document.getElementById("stacklyClientSidebarOverlay");

    const menuToggle =
        document.getElementById("stacklyClientMenuToggle");

    const closeButton =
        document.getElementById("stacklyClientSidebarClose");

    const clientEmail =
        document.getElementById("stacklyClientEmail");

    const clientUserName =
        document.getElementById("stacklyClientUserName");

    const navLinks =
        document.querySelectorAll(
            ".stackly-client-nav-link"
        );

    const logoutLink =
        document.querySelector(
            ".stackly-client-logout-link"
        );


    /* =====================================================
       MOBILE BREAKPOINT
    ====================================================== */

    const MOBILE_BREAKPOINT = 1000;


    /* =====================================================
       LOGGED-IN USER
    ====================================================== */

    const loggedInEmail =
        localStorage.getItem("stacklyUserEmail");


    /* =====================================================
       CREATE USERNAME FROM EMAIL

       john.doe@gmail.com
       ↓
       John Doe
    ====================================================== */

    function getNameFromEmail(email) {

        if (
            !email ||
            typeof email !== "string" ||
            !email.includes("@")
        ) {
            return "Farm Client";
        }

        let userName =
            email.split("@")[0];

        userName = userName
            .replace(/[._-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });

        return userName || "Farm Client";
    }


    /* =====================================================
       DISPLAY USER EMAIL
    ====================================================== */

    if (clientEmail) {

        if (
            loggedInEmail &&
            loggedInEmail.trim() !== ""
        ) {

            clientEmail.textContent =
                loggedInEmail.trim();

        } else {

            clientEmail.textContent =
                "client@stacklyfarm.com";

        }

    }


    /* =====================================================
       DISPLAY USER NAME
    ====================================================== */

    if (clientUserName) {

        if (
            loggedInEmail &&
            loggedInEmail.includes("@")
        ) {

            clientUserName.textContent =
                getNameFromEmail(
                    loggedInEmail.trim()
                );

        } else {

            clientUserName.textContent =
                "Farm Client";

        }

    }


    /* =====================================================
       SIDEBAR BODY SCROLL
    ====================================================== */

    function lockBodyScroll() {

        document.body.classList.add(
            "stackly-client-sidebar-open"
        );

    }


    function unlockBodyScroll() {

        document.body.classList.remove(
            "stackly-client-sidebar-open"
        );

    }


    /* =====================================================
       OPEN SIDEBAR
    ====================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        lockBodyScroll();

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

    }


    /* =====================================================
       CLOSE SIDEBAR
    ====================================================== */

    function closeSidebar() {

        if (sidebar) {

            sidebar.classList.remove("active");

        }

        if (overlay) {

            overlay.classList.remove("active");

        }

        unlockBodyScroll();

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

    }


    /* =====================================================
       TOGGLE SIDEBAR
    ====================================================== */

    function toggleSidebar() {

        if (!sidebar) return;

        if (
            sidebar.classList.contains("active")
        ) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }


    /* =====================================================
       MENU TOGGLE
    ====================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                toggleSidebar();

            }
        );

    }


    /* =====================================================
       SIDEBAR CLOSE BUTTON
    ====================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeSidebar();

            }
        );

    }


    /* =====================================================
       SIDEBAR OVERLAY
    ====================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* =====================================================
       ESCAPE KEY - SIDEBAR
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" ||
                event.key === "Esc"
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       NAVIGATION LINKS
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <=
                    MOBILE_BREAKPOINT
                ) {

                    closeSidebar();

                }

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function updateActiveNav() {

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();

        if (!currentPage) {

            currentPage =
                "client-dashboard.html";

        }

        let matched = false;

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();

            if (
                linkPage === currentPage
            ) {

                link.classList.add("active");

                matched = true;

            }

        });


        /* Default Dashboard */

        if (!matched) {

            const dashboardLink =
                document.querySelector(
                    '.stackly-client-nav-link[href="client-dashboard.html"]'
                );

            if (dashboardLink) {

                dashboardLink.classList.add(
                    "active"
                );

            }

        }

    }

    updateActiveNav();


    /* =====================================================
       LOGOUT
    ====================================================== */

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
                    "stacklySettings"
                );

                closeSidebar();

            }
        );

    }


    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                MOBILE_BREAKPOINT
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       INITIAL SIDEBAR STATE
    ====================================================== */

    closeSidebar();


    /* =====================================================
       CUSTOM DROPDOWN HELPER
       CLOSE ALL STACKLY DROPDOWNS
    ====================================================== */

    function closeAllCustomDropdowns(
        exceptDropdown = null
    ) {

        document
            .querySelectorAll(
                [
                    ".stackly-client-dropdown",
                    ".stackly-js-dropdown",
                    ".stackly-card-dropdown",
                    ".stackly-crop-dropdown"
                ].join(",")
            )
            .forEach(function (dropdown) {

                if (
                    dropdown !== exceptDropdown
                ) {

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


    /* =====================================================
       GENERIC CUSTOM DROPDOWN
    ====================================================== */

    function initializeCustomDropdown(config) {

        const dropdown =
            document.getElementById(
                config.dropdownId
            );

        const button =
            document.getElementById(
                config.buttonId
            );

        const selectedText =
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
            !selectedText ||
            !hiddenInput
        ) {

            return null;

        }


        let menu = null;


        /* =================================================
           FIND MENU BY ID
        ================================================== */

        if (config.menuId) {

            menu =
                document.getElementById(
                    config.menuId
                );

        }


        /* =================================================
           FALLBACK MENU SELECTOR
        ================================================== */

        if (
            !menu &&
            config.menuSelector
        ) {

            menu =
                dropdown.querySelector(
                    config.menuSelector
                );

        }


        if (!menu) {

            return null;

        }


        const optionSelector =
            config.optionSelector ||
            ".stackly-js-option";


        const options =
            Array.from(
                menu.querySelectorAll(
                    optionSelector
                )
            );


        if (!options.length) {

            return null;

        }


        /* =================================================
           ACCESSIBILITY
        ================================================== */

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

            option.setAttribute(
                "aria-selected",
                "false"
            );

        });


        /* =================================================
           SELECT OPTION
        ================================================== */

        function selectOption(
            option,
            emitChange = true
        ) {

            if (!option) return;

            const value =
                option.dataset.value;

            if (
                value === undefined ||
                value === null
            ) {

                return;

            }


            /* Visible text */

            selectedText.textContent =
                option.textContent.trim();


            /* Hidden value */

            hiddenInput.value =
                value;


            /* Active option */

            options.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                    item.setAttribute(
                        "aria-selected",
                        "false"
                    );

                }
            );


            option.classList.add(
                "active"
            );

            option.setAttribute(
                "aria-selected",
                "true"
            );


            /* Close dropdown */

            dropdown.classList.remove(
                "open"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Send change event */

            if (emitChange) {

                hiddenInput.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );


                if (
                    config.changeEvent
                ) {

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


        /* =================================================
           SYNC VALUE WITHOUT EVENT
        ================================================== */

        function sync() {

            const currentValue =
                hiddenInput.value;

            let matched = null;

            options.forEach(
                function (option) {

                    option.classList.remove(
                        "active"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "false"
                    );

                    if (
                        option.dataset.value ===
                        currentValue
                    ) {

                        matched = option;

                    }

                }
            );


            if (matched) {

                selectedText.textContent =
                    matched.textContent.trim();

                matched.classList.add(
                    "active"
                );

                matched.setAttribute(
                    "aria-selected",
                    "true"
                );

            } else if (options.length) {

                selectOption(
                    options[0],
                    false
                );

            }

        }


        /* =================================================
           BUTTON CLICK
        ================================================== */

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


                if (isOpen) {

                    dropdown.classList.remove(
                        "open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

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


        /* =================================================
           OPTION CLICK
        ================================================== */

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


        /* =================================================
           BUTTON KEYBOARD
        ================================================== */

        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                    return;

                }


                if (
                    event.key === "ArrowDown"
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

                    options[0].focus();

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

                }

            }
        );


        /* =================================================
           OPTION KEYBOARD
        ================================================== */

        options.forEach(
            function (option, index) {

                option.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                            "ArrowDown"
                        ) {

                            event.preventDefault();

                            const nextIndex =
                                (
                                    index + 1
                                ) %
                                options.length;

                            options[
                                nextIndex
                            ].focus();

                        }


                        if (
                            event.key ===
                            "ArrowUp"
                        ) {

                            event.preventDefault();

                            const previousIndex =
                                (
                                    index -
                                    1 +
                                    options.length
                                ) %
                                options.length;

                            options[
                                previousIndex
                            ].focus();

                        }


                        if (
                            event.key ===
                                "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            selectOption(
                                option,
                                true
                            );

                            button.focus();

                        }


                        if (
                            event.key ===
                            "Escape"
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

            }
        );


        /* =================================================
           INITIALIZE
        ================================================== */

        sync();


        return {
            sync: sync,
            selectOption: selectOption
        };

    }


    /* =====================================================
       INITIALIZE FARM DROPDOWN
    ====================================================== */

    const farmTypeDropdown =
        initializeCustomDropdown({

            dropdownId:
                "stacklyFarmDropdown",

            buttonId:
                "stacklyFarmDropdownBtn",

            selectedId:
                "stacklyFarmSelected",

            hiddenInputId:
                "stacklyFarmType",

            menuId:
                "stacklyFarmDropdownMenu",

            optionSelector:
                ".stackly-js-option"

        });


    /* =====================================================
       INITIALIZE MEASUREMENT UNIT DROPDOWN
    ====================================================== */

    const farmUnitDropdown =
        initializeCustomDropdown({

            dropdownId:
                "stacklyFarmUnitDropdown",

            buttonId:
                "stacklyFarmUnitDropdownBtn",

            selectedId:
                "stacklyFarmUnitSelected",

            hiddenInputId:
                "stacklyFarmUnit",

            menuId:
                "stacklyFarmUnitDropdownMenu",

            optionSelector:
                ".stackly-js-option"

        });


    /* =====================================================
       INITIALIZE OLD YEAR DROPDOWN
    ====================================================== */

    const yearDropdown =
        initializeCustomDropdown({

            dropdownId:
                "stacklyYearDropdown",

            buttonId:
                "stacklyYearDropdownBtn",

            selectedId:
                "stacklyYearSelected",

            hiddenInputId:
                "stacklyYearValue",

            menuId:
                "stacklyYearDropdownMenu",

            menuSelector:
                ".stackly-card-dropdown-menu",

            optionSelector:
                ".stackly-card-option"

        });


    /* =====================================================
       INITIALIZE CROP FILTER DROPDOWN
    ====================================================== */

    const cropDropdown =
        initializeCustomDropdown({

            dropdownId:
                "stacklyCropDropdown",

            buttonId:
                "stacklyCropDropdownBtn",

            selectedId:
                "stacklyCropSelected",

            hiddenInputId:
                "stacklyCropFilter",

            menuId:
                "stacklyCropDropdownMenu",

            optionSelector:
                ".stackly-crop-option",

            changeEvent:
                "stacklyCropFilterChange"

        });


    /* =====================================================
       INITIALIZE CLIENT YEAR DROPDOWN
    ====================================================== */

    const clientYearDropdown =
        initializeCustomDropdown({

            dropdownId:
                "stacklyClientYearDropdown",

            buttonId:
                "stacklyClientYearDropdownBtn",

            selectedId:
                "stacklyClientYearSelected",

            hiddenInputId:
                "stacklyClientYearValue",

            menuId:
                "stacklyClientYearDropdownMenu",

            optionSelector:
                ".stackly-client-dropdown-option",

            changeEvent:
                "stacklyClientYearChange"

        });


    /* =====================================================
       CLICK OUTSIDE - CLOSE DROPDOWNS
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const dropdown =
                event.target.closest(
                    [
                        ".stackly-client-dropdown",
                        ".stackly-js-dropdown",
                        ".stackly-card-dropdown",
                        ".stackly-crop-dropdown"
                    ].join(",")
                );


            if (!dropdown) {

                closeAllCustomDropdowns();

            }

        }
    );


    /* =====================================================
       CROP PRODUCTION CHART
    ====================================================== */

    const performanceSelect =
        document.querySelector(
            ".stackly-client-card-select"
        );


    const chartBars =
        document.querySelectorAll(
            ".stackly-client-chart-line span"
        );


    /* =====================================================
       CROP PRODUCTION DATA

       12 MONTHS

       Jan
       Feb
       Mar
       Apr
       May
       Jun
       Jul
       Aug
       Sep
       Oct
       Nov
       Dec
    ====================================================== */

    const performanceData = {

        "This Year": [

            36,
            47,
            42,
            58,
            66,
            73,
            84,
            79,
            91,
            87,
            96,
            92

        ],


        "This Season": [

            42,
            51,
            48,
            63,
            71,
            78,
            86,
            83,
            94,
            90,
            98,
            95

        ],


        "Last Year": [

            29,
            38,
            35,
            47,
            55,
            61,
            70,
            67,
            78,
            75,
            85,
            81

        ]

    };


    /* =====================================================
       UPDATE CROP PRODUCTION CHART
    ====================================================== */

    function updatePerformanceChart(
        selectedPeriod
    ) {

        if (!chartBars.length) {
            return;
        }


        const values =
            performanceData[
                selectedPeriod
            ] ||
            performanceData[
                "This Year"
            ];


        chartBars.forEach(
            function (bar, index) {

                const newHeight =
                    values[index] || 0;


                /* Stop previous animation */

                bar.style.animation =
                    "none";


                /* Force repaint */

                void bar.offsetWidth;


                /* Set height */

                bar.style.height =
                    newHeight + "%";


                /* New animation */

                bar.style.animation =
                    "stacklyClientBarGrow 0.7s ease forwards";

            }
        );

    }


    /* =====================================================
       NATIVE CROP PRODUCTION SELECT

       Works if your HTML still contains:

       <select class="stackly-client-card-select">
    ====================================================== */

    if (performanceSelect) {

        performanceSelect.addEventListener(
            "change",
            function () {

                updatePerformanceChart(
                    this.value
                );

            }
        );

    }


    /* =====================================================
       CUSTOM CLIENT YEAR DROPDOWN

       Works with:

       #stacklyClientYearValue
    ====================================================== */

    const clientYearValue =
        document.getElementById(
            "stacklyClientYearValue"
        );


    if (clientYearValue) {

        clientYearValue.addEventListener(
            "change",
            function () {

                updatePerformanceChart(
                    this.value
                );

            }
        );

    }


    /* =====================================================
       OLD CUSTOM YEAR DROPDOWN
    ====================================================== */

    const oldYearValue =
        document.getElementById(
            "stacklyYearValue"
        );


    if (oldYearValue) {

        oldYearValue.addEventListener(
            "change",
            function () {

                updatePerformanceChart(
                    this.value
                );

            }
        );

    }


    /* =====================================================
       INITIAL CROP PRODUCTION CHART
    ====================================================== */

    let initialProductionPeriod =
        "This Year";


    if (
        clientYearValue &&
        performanceData[
            clientYearValue.value
        ]
    ) {

        initialProductionPeriod =
            clientYearValue.value;

    } else if (
        oldYearValue &&
        performanceData[
            oldYearValue.value
        ]
    ) {

        initialProductionPeriod =
            oldYearValue.value;

    } else if (
        performanceSelect &&
        performanceData[
            performanceSelect.value
        ]
    ) {

        initialProductionPeriod =
            performanceSelect.value;

    }


    updatePerformanceChart(
        initialProductionPeriod
    );


    /* =====================================================
       CROP PERFORMANCE DATA
    ====================================================== */

    const cropPerformanceData = {

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


    /* =====================================================
       UPDATE CROP PERFORMANCE
    ====================================================== */

    function updateCropPerformance(
        selectedPeriod
    ) {

        const data =
            cropPerformanceData[
                selectedPeriod
            ] ||
            cropPerformanceData[
                "This Season"
            ];


        const values = [

            data.rice,
            data.carrot,
            data.tomato,
            data.chilli

        ];


        const bars =
            document.querySelectorAll(
                ".crop-performance-bars .crop-bar span"
            );


        const percentageValues =
            document.querySelectorAll(
                ".crop-performance-bars .crop-bar-item strong"
            );


        /* =================================================
           UPDATE BARS
        ================================================== */

        bars.forEach(
            function (bar, index) {

                const value =
                    values[index] || "0%";


                bar.style.width =
                    "0%";


                bar.dataset.width =
                    value;


                void bar.offsetWidth;


                setTimeout(
                    function () {

                        bar.style.width =
                            value;

                    },
                    100 + index * 100
                );

            }
        );


        /* =================================================
           UPDATE PERCENTAGE TEXT
        ================================================== */

        percentageValues.forEach(
            function (element, index) {

                element.textContent =
                    values[index] || "0%";

            }
        );

    }


    /* =====================================================
       CUSTOM CROP FILTER
    ====================================================== */

    const cropFilter =
        document.getElementById(
            "stacklyCropFilter"
        );


    if (cropFilter) {

        cropFilter.addEventListener(
            "change",
            function () {

                updateCropPerformance(
                    this.value
                );

            }
        );

    }


    /* =====================================================
       OLD NATIVE CROP FILTER
    ====================================================== */

    const nativeCropFilter =
        document.querySelector(
            ".crop-filter"
        );


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


    /* =====================================================
       INITIAL CROP PERFORMANCE
    ====================================================== */

    let initialCropPeriod =
        "This Season";


    if (
        cropFilter &&
        cropPerformanceData[
            cropFilter.value
        ]
    ) {

        initialCropPeriod =
            cropFilter.value;

    } else if (
        nativeCropFilter &&
        cropPerformanceData[
            nativeCropFilter.value
        ]
    ) {

        initialCropPeriod =
            nativeCropFilter.value;

    }


    updateCropPerformance(
        initialCropPeriod
    );


    /* =====================================================
       PRODUCTION SUMMARY CARDS
    ====================================================== */

    const productionCards =
        document.querySelectorAll(
            ".stackly-client-production-card"
        );


    productionCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "is-hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "is-hovered"
                    );

                }
            );

        }
    );


    /* =====================================================
       BAR HOVER EFFECT
    ====================================================== */

    chartBars.forEach(
        function (bar) {

            bar.addEventListener(
                "mouseenter",
                function () {

                    bar.classList.add(
                        "active"
                    );

                }
            );


            bar.addEventListener(
                "mouseleave",
                function () {

                    bar.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       ACCESSIBILITY - ENTER / SPACE FOR NAV LINKS
    ====================================================== */

    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        link.click();

                    }

                }
            );

        }
    );


    /* =====================================================
       REDUCED MOTION SUPPORT
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "stackly-reduced-motion"
        );

        chartBars.forEach(
            function (bar) {

                bar.style.animation =
                    "none";

                bar.style.transition =
                    "none";

            }
        );

    }


    /* =====================================================
       GLOBAL TAB ACCESSIBILITY
    ====================================================== */

    document
        .querySelectorAll(
            ".stackly-client-nav-link, " +
            ".stackly-client-logout-link"
        )
        .forEach(
            function (element) {

                if (
                    !element.hasAttribute(
                        "tabindex"
                    )
                ) {

                    element.setAttribute(
                        "tabindex",
                        "0"
                    );

                }

            }
        );


    /* =====================================================
       FINAL INITIALIZATION
    ====================================================== */

    if (clientYearDropdown) {

        clientYearDropdown.sync();

    }


    if (cropDropdown) {

        cropDropdown.sync();

    }


    if (yearDropdown) {

        yearDropdown.sync();

    }


    if (farmTypeDropdown) {

        farmTypeDropdown.sync();

    }


    if (farmUnitDropdown) {

        farmUnitDropdown.sync();

    }


    /* =====================================================
       PAGE READY
    ====================================================== */

    document.documentElement.classList.add(
        "stackly-client-dashboard-ready"
    );


    console.log(
        "Stackly Client Dashboard initialized successfully."
    );

});