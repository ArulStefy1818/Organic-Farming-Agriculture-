/* =========================================================
   STACKLY ORGANIC FARMING
   CLIENT DASHBOARD
   SIDEBAR + USER DETAILS + LOGOUT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENT SELECTORS
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
       GET LOGGED-IN USER EMAIL
    ====================================================== */

    const loggedInEmail =
        localStorage.getItem("stacklyUserEmail");


    /* =====================================================
       CREATE NAME FROM EMAIL

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
       DISPLAY EMAIL
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
       DISPLAY USERNAME
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
       LOCK PAGE SCROLL
       WHEN MOBILE SIDEBAR IS OPEN
    ====================================================== */

    function lockBodyScroll() {

        document.body.classList.add(
            "stackly-client-sidebar-open"
        );

    }


    /* =====================================================
       UNLOCK PAGE SCROLL
    ====================================================== */

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


        /* Update accessibility */

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


        /* Update accessibility */

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

        const isOpen =
            sidebar.classList.contains("active");

        if (isOpen) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }


    /* =====================================================
       HAMBURGER BUTTON
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
       CLOSE BUTTON
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
       OVERLAY
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
       ESCAPE KEY
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

       Close sidebar after selecting a page
       on mobile.
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
       ACTIVE NAVIGATION LINK
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

            if (linkPage === currentPage) {

                link.classList.add("active");

                matched = true;

            }

        });


        /* Default to dashboard */

        if (!matched) {

            const dashboardLink =
                document.querySelector(
                    '.stackly-client-nav-link[href="client-dashboard.html"]'
                );

            if (dashboardLink) {

                dashboardLink.classList.add("active");

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

                /*
                 * Remove client login information
                 */

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

                /*
                 * Browser continues to index.html
                 * because this is a normal <a> link.
                 */

            }
        );

    }


    /* =====================================================
       WINDOW RESIZE
       
       When moving from mobile to desktop,
       remove the mobile-open state.
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
       INITIAL STATE
    ====================================================== */

    closeSidebar();


    /* =====================================================
       INITIAL ARIA STATE
    ====================================================== */

    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

/* =========================================================
   STACKLY CLIENT DASHBOARD
   FARM PERFORMANCE - CROP PRODUCTION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       FARM PERFORMANCE ELEMENTS
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
       CHECK ELEMENTS
    ====================================================== */

    if (
        !performanceSelect ||
        !chartBars.length
    ) {
        return;
    }


    /* =====================================================
       CROP PRODUCTION DATA
       
       Values are represented as percentages
       of the chart height.
    ====================================================== */

    const performanceData = {

        "This Year": [
            36, 47, 42, 58,
            66, 73, 84, 79,
            91, 87, 96, 92
        ],

        "This Season": [
            42, 51, 48, 63,
            71, 78, 86, 83,
            94, 90, 98, 95
        ],

        "Last Year": [
            29, 38, 35, 47,
            55, 61, 70, 67,
            78, 75, 85, 81
        ]

    };


    /* =====================================================
       UPDATE CHART
    ====================================================== */

    function updatePerformanceChart(selectedPeriod) {

        const values =
            performanceData[selectedPeriod];

        if (!values) return;


        chartBars.forEach(function (bar, index) {

            const newHeight =
                values[index] || 0;


            /* Remove old animation */

            bar.style.animation = "none";


            /* Force browser repaint */

            void bar.offsetWidth;


            /* Set new height */

            bar.style.height =
                newHeight + "%";


            /* Apply animation */

            bar.style.animation =
                "stacklyClientBarGrow 0.7s ease forwards";

        });

    }


    /* =====================================================
       DROPDOWN CHANGE
    ====================================================== */

    performanceSelect.addEventListener(
        "change",
        function () {

            updatePerformanceChart(
                this.value
            );

        }
    );


    /* =====================================================
       INITIAL CHART
    ====================================================== */

    updatePerformanceChart(
        performanceSelect.value
    );

});