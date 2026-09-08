/* =========================================================
   STACKLY ADMIN DASHBOARD JAVASCRIPT
   USER EMAIL + RESPONSIVE SIDEBAR + MOBILE MENU
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       GET ELEMENTS
    ========================================================= */

    const sidebar = document.getElementById(
        "stacklyAdminSidebar"
    );

    const menuToggle = document.getElementById(
        "stacklyMenuToggle"
    );

    const sidebarClose = document.getElementById(
        "stacklySidebarClose"
    );

    const sidebarOverlay = document.getElementById(
        "stacklySidebarOverlay"
    );

    const adminAccount = document.querySelector(
        ".stackly-admin-account"
    );

    const navLinks = document.querySelectorAll(
        ".stackly-nav-link"
    );

    const emailElement = document.querySelector(
        ".stackly-account-details strong"
    );

    const logoutLink = document.querySelector(
        ".stackly-logout-link"
    );


    /* =========================================================
       USER EMAIL
       
       LOGIN PAGE SAVES:
       stacklyUserEmail
    ========================================================= */

    const savedEmail = localStorage.getItem(
        "stacklyUserEmail"
    );

    if (emailElement) {

        if (
            savedEmail &&
            savedEmail.trim() !== ""
        ) {

            emailElement.textContent =
                savedEmail;

        } else {

            emailElement.textContent =
                "admin@stacklyfarm.com";

        }

    }


    /* =========================================================
       SIDEBAR STATE
    ========================================================= */

    let sidebarOpen = false;


    /* =========================================================
       OPEN SIDEBAR
    ========================================================= */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebarOpen = true;

        sidebar.classList.add("active");

        if (sidebarOverlay) {

            sidebarOverlay.classList.add(
                "active"
            );

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

        /*
         * Prevent background page scrolling
         * only on mobile.
         */

        if (window.innerWidth <= 991) {

            document.body.classList.add(
                "stackly-sidebar-open"
            );

            document.body.style.overflow =
                "hidden";

        }

    }


    /* =========================================================
       CLOSE SIDEBAR
    ========================================================= */

    function closeSidebar() {

        sidebarOpen = false;

        if (sidebar) {

            sidebar.classList.remove(
                "active"
            );

            sidebar.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        if (sidebarOverlay) {

            sidebarOverlay.classList.remove(
                "active"
            );

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
       TOGGLE SIDEBAR
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
       HAMBURGER BUTTON
    ========================================================= */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleSidebar
        );

    }


    /* =========================================================
       SIDEBAR CLOSE / X BUTTON
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
       OVERLAY CLICK
    ========================================================= */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeSidebar();

            }
        );

    }


    /* =========================================================
       SIDEBAR NAVIGATION
       
       CLOSE SIDEBAR AFTER CLICKING LINK
       ON MOBILE ONLY
    ========================================================= */

    navLinks.forEach(function (link) {

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
       ACTIVE SIDEBAR LINK
    ========================================================= */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .split("?")[0]
            .split("#")[0]
            .toLowerCase();


    /*
     * If no filename exists,
     * use dashboard.
     */

    if (
        !currentPage ||
        currentPage === ""
    ) {

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

        link.classList.remove(
            "active"
        );

        if (
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });


    /* =========================================================
       ADMIN ACCOUNT DROPDOWN
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
       CLOSE ACCOUNT DROPDOWN
       WHEN CLICKING OUTSIDE
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

        }
    );


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

            }

        }
    );


    /* =========================================================
       WINDOW RESIZE
    ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            /*
             * When switching from mobile
             * to desktop, completely reset
             * mobile sidebar state.
             */

            if (window.innerWidth > 991) {

                closeSidebar();

            } else {

                /*
                 * On mobile don't automatically
                 * open the sidebar.
                 */

                if (!sidebarOpen) {

                    if (sidebar) {

                        sidebar.classList.remove(
                            "active"
                        );

                    }

                    if (sidebarOverlay) {

                        sidebarOverlay.classList.remove(
                            "active"
                        );

                    }

                    document.body.style.overflow =
                        "";

                }

            }

        }
    );


    /* =========================================================
       MOBILE SWIPE SUPPORT
       
       RIGHT SWIPE FROM LEFT EDGE = OPEN
       LEFT SWIPE = CLOSE
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


            /*
             * Ignore vertical scrolling.
             */

            if (
                Math.abs(differenceY) >
                Math.abs(differenceX)
            ) {

                return;

            }


            /* =========================================
               SWIPE RIGHT
            ========================================= */

            if (
                touchStartX <= 50 &&
                differenceX >= 70
            ) {

                openSidebar();

                return;

            }


            /* =========================================
               SWIPE LEFT
            ========================================= */

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
            function (event) {

                /*
                 * Clear login information.
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

                /*
                 * Close sidebar before leaving.
                 */

                closeSidebar();

            }
        );

    }


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    closeSidebar();


    if (menuToggle) {

        menuToggle.setAttribute(
            "type",
            "button"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open Menu"
        );

    }


    if (sidebar) {

        sidebar.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =========================================================
       FINAL BODY STATE
    ========================================================= */

    document.body.classList.remove(
        "stackly-sidebar-open"
    );

    document.body.style.overflow = "";


});

/* =========================================================
   USER NAME FROM EMAIL
   Example:
   kalaikargil@gmail.com
   → Kalaikargil
========================================================= */

const userEmail =
    localStorage.getItem("stacklyUserEmail");

const userNameElement =
    document.getElementById("stacklyAdminUserName");

const emailElement =
    document.querySelector(
        ".stackly-account-details strong"
    );


/* =========================================================
   DISPLAY USER NAME
========================================================= */

if (userNameElement) {

    if (
        userEmail &&
        userEmail.trim() !== ""
    ) {

        /* Get text before @ */
        let userName =
            userEmail
                .split("@")[0]
                .trim();

        /* Get first word only */
        userName =
            userName
                .split(/[._\-\s]+/)[0]
                .trim();

        /* Capitalize first letter */
        if (userName !== "") {

            userName =
                userName.charAt(0).toUpperCase() +
                userName.slice(1).toLowerCase();

            userNameElement.textContent =
                userName;

        } else {

            userNameElement.textContent =
                "Farm Admin";

        }

    } else {

        userNameElement.textContent =
            "Farm Admin";

    }

}


/* =========================================================
   DISPLAY USER EMAIL
========================================================= */

if (emailElement) {

    if (
        userEmail &&
        userEmail.trim() !== ""
    ) {

        emailElement.textContent =
            userEmail;

    } else {

        emailElement.textContent =
            "admin@stacklyfarm.com";

    }

}


/* =========================================================
   STACKLY ADMIN DASHBOARD
   PRODUCTION CHART JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRODUCTION DATA
    ===================================================== */

    const productionData = {

        "This Year": [
            38, 52, 45, 68, 61, 79,
            91, 84, 96, 88, 100, 94
        ],

        "Last Year": [
            32, 44, 41, 55, 50, 67,
            76, 71, 82, 78, 89, 85
        ],

        "This Season": [
            25, 39, 48, 61, 70, 82,
            90, 86, 94, 97, 100, 98
        ]

    };


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const productionSelect =
        document.querySelector(".stackly-card-select");

    const chartBars =
        document.querySelectorAll(".stackly-chart-line span");


    /* =====================================================
       UPDATE PRODUCTION CHART
    ===================================================== */

    function updateProductionChart(type) {

        const values = productionData[type];

        if (!values || !chartBars.length) {
            return;
        }

        chartBars.forEach(function (bar, index) {

            if (values[index] !== undefined) {

                bar.style.height = values[index] + "%";

            }

        });

    }


    /* =====================================================
       DROPDOWN CHANGE
    ===================================================== */

    if (productionSelect) {

        productionSelect.addEventListener("change", function () {

            updateProductionChart(this.value);

        });

    }


    /* =====================================================
       INITIAL CHART
    ===================================================== */

    updateProductionChart("This Year");


});

/* =========================================================
   STACKLY FARMING
   CROP MANAGEMENT - PERFORMANCE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PERFORMANCE BAR ANIMATION
    ===================================================== */

    const performanceBars = document.querySelectorAll(
        ".crop-performance-bars .crop-bar span"
    );

    const miniProgressBars = document.querySelectorAll(
        ".mini-progress span"
    );

    const fieldProgressBars = document.querySelectorAll(
        ".field-progress-bar span"
    );


    /* =====================================================
       RESET BAR WIDTH FOR ANIMATION
    ===================================================== */

    performanceBars.forEach(function (bar) {

        const finalWidth = bar.style.width;

        bar.dataset.width = finalWidth;

        bar.style.width = "0";

    });


    miniProgressBars.forEach(function (bar) {

        const finalWidth = bar.style.width;

        bar.dataset.width = finalWidth;

        bar.style.width = "0";

    });


    fieldProgressBars.forEach(function (bar) {

        const finalWidth = bar.style.width;

        bar.dataset.width = finalWidth;

        bar.style.width = "0";

    });


    /* =====================================================
       INTERSECTION OBSERVER
       ANIMATE BARS WHEN THEY ENTER VIEW
    ===================================================== */

    const performanceObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                const element = entry.target;


                /* =========================================
                   PERFORMANCE BARS
                ========================================= */

                if (
                    element.classList.contains("crop-performance-bars")
                ) {

                    const bars = element.querySelectorAll(
                        ".crop-bar span"
                    );

                    bars.forEach(function (bar, index) {

                        setTimeout(function () {

                            bar.style.width =
                                bar.dataset.width;

                        }, index * 180);

                    });

                }


                /* =========================================
                   FIELD HEALTH BARS
                ========================================= */

                if (
                    element.classList.contains("field-health-section")
                ) {

                    const bars = element.querySelectorAll(
                        ".field-progress-bar span"
                    );

                    bars.forEach(function (bar, index) {

                        setTimeout(function () {

                            bar.style.width =
                                bar.dataset.width;

                        }, index * 150);

                    });

                }


                /* =========================================
                   TABLE MINI PROGRESS
                ========================================= */

                if (
                    element.classList.contains("crop-table-section")
                ) {

                    const bars = element.querySelectorAll(
                        ".mini-progress span"
                    );

                    bars.forEach(function (bar, index) {

                        setTimeout(function () {

                            bar.style.width =
                                bar.dataset.width;

                        }, index * 150);

                    });

                }


                observer.unobserve(element);

            });

        },
        {
            threshold: 0.25
        }
    );


    /* =====================================================
       OBSERVE PERFORMANCE SECTION
    ===================================================== */

    const performanceSection = document.querySelector(
        ".crop-performance-card"
    );

    if (performanceSection) {

        performanceObserver.observe(performanceSection);

    }


    /* =====================================================
       OBSERVE FIELD HEALTH SECTION
    ===================================================== */

    const fieldHealthSection = document.querySelector(
        ".field-health-section"
    );

    if (fieldHealthSection) {

        performanceObserver.observe(fieldHealthSection);

    }


    /* =====================================================
       OBSERVE TABLE SECTION
    ===================================================== */

    const tableSection = document.querySelector(
        ".crop-table-section"
    );

    if (tableSection) {

        performanceObserver.observe(tableSection);

    }


    /* =====================================================
       CROP PERFORMANCE SCORE
       91% CIRCLE
    ===================================================== */

    const scoreCircle = document.querySelector(
        ".crop-score-circle"
    );

    if (scoreCircle) {

        scoreCircle.style.setProperty(
            "--score",
            "91%"
        );

    }


    /* =====================================================
       PERFORMANCE FILTER
    ===================================================== */

    const cropFilter = document.querySelector(
        ".crop-filter"
    );

    if (cropFilter) {

        cropFilter.addEventListener(
            "change",
            function () {

                const selectedValue =
                    cropFilter.value;


                /* -----------------------------------------
                   DEMO PERFORMANCE DATA
                ----------------------------------------- */

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


                const data =
                    performanceData[selectedValue];


                if (!data) {
                    return;
                }


                const bars =
                    document.querySelectorAll(
                        ".crop-performance-bars .crop-bar span"
                    );

                const values =
                    document.querySelectorAll(
                        ".crop-performance-bars .crop-bar-item strong"
                    );


                const newValues = [
                    data.rice,
                    data.carrot,
                    data.tomato,
                    data.chilli
                ];


                bars.forEach(function (bar, index) {

                    bar.style.width = "0";


                    setTimeout(function () {

                        bar.style.width =
                            newValues[index];

                    }, 100);

                });


                values.forEach(function (value, index) {

                    value.textContent =
                        newValues[index];

                });

            }
        );

    }


    /* =====================================================
       CARD HOVER EFFECT
    ===================================================== */

    const dashboardCards =
        document.querySelectorAll(
            ".crop-dashboard-card, .field-health-card, .crop-feature-card"
        );


    dashboardCards.forEach(function (card) {

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

    });


    /* =====================================================
       GROWTH STAGE CLICK EFFECT
    ===================================================== */

    const growthStages =
        document.querySelectorAll(
            ".growth-stage"
        );


    growthStages.forEach(function (stage) {

        stage.addEventListener(
            "click",
            function () {

                growthStages.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                stage.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       FIELD HEALTH CARD CLICK EFFECT
    ===================================================== */

    const fieldCards =
        document.querySelectorAll(
            ".field-health-card"
        );


    fieldCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                fieldCards.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                });


                card.classList.add(
                    "selected"
                );

            }
        );

    });


    /* =====================================================
       HARVEST TIMELINE
    ===================================================== */

    const harvestDays =
        document.querySelectorAll(
            ".harvest-day"
        );


    harvestDays.forEach(function (day) {

        day.addEventListener(
            "click",
            function () {

                harvestDays.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                day.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       TABLE ROW HOVER / CLICK
    ===================================================== */

    const tableRows =
        document.querySelectorAll(
            ".crop-management-table tbody tr"
        );


    tableRows.forEach(function (row) {

        row.addEventListener(
            "click",
            function () {

                tableRows.forEach(function (item) {

                    item.classList.remove(
                        "selected-row"
                    );

                });


                row.classList.add(
                    "selected-row"
                );

            }
        );

    });


    /* =====================================================
       FEATURE CARD RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".crop-primary-btn, .crop-secondary-btn, .crop-table-actions a"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add(
                    "crop-ripple"
                );


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

                ripple.style.left =
                    event.clientX -
                    rect.left -
                    size / 2 +
                    "px";

                ripple.style.top =
                    event.clientY -
                    rect.top -
                    size / 2 +
                    "px";


                button.appendChild(
                    ripple
                );


                setTimeout(function () {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       ANIMATE HERO VISUAL
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".crop-hero-visual"
        );


    if (heroVisual) {

        heroVisual.classList.add(
            "crop-visual-loaded"
        );

    }


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, select, .growth-stage, .field-health-card"
        );


    interactiveElements.forEach(function (element) {

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

    });


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =====================================================
       PAGE LOAD COMPLETE
    ===================================================== */

    document.body.classList.add(
        "crop-page-loaded"
    );

});

/* =========================================================
   STACKLY HARVEST - PRODUCTION ANALYTICS
   WEEKLY / MONTHLY / YEARLY CHART
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const chartBars = document.querySelectorAll(
        ".stackly-chart-bar"
    );

    const filterButtons = document.querySelectorAll(
        ".stackly-chart-filters button"
    );

    const yAxis = document.querySelectorAll(
        ".stackly-chart-y-axis span"
    );


    /* =====================================================
       CHART DATA
    ====================================================== */

    const chartData = {

        Weekly: {
            values: [48, 67, 58, 82, 73, 91, 64],
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            max: "2,000",
            axis: ["2,000", "1,500", "1,000", "500", "0"]
        },

        Monthly: {
            values: [62, 74, 58, 86, 69, 92, 77],
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
            max: "8,000",
            axis: ["8,000", "6,000", "4,000", "2,000", "0"]
        },

        Yearly: {
            values: [52, 68, 74, 61, 83, 94, 78],
            labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
            max: "20,000",
            axis: ["20,000", "15,000", "10,000", "5,000", "0"]
        }

    };


    /* =====================================================
       UPDATE CHART
    ====================================================== */

    function updateHarvestChart(type) {

        const data = chartData[type];

        if (!data) return;


        chartBars.forEach(function (bar, index) {

            if (!data.values[index]) return;


            /* Remove previous animation */

            bar.classList.remove(
                "stackly-chart-bar-animate"
            );


            /* Force browser reflow */

            void bar.offsetWidth;


            /* Update height */

            bar.style.height =
                data.values[index] + "%";


            /* Update day/month label */

            const label = bar.querySelector("span");

            if (label) {
                label.textContent =
                    data.labels[index];
            }


            /* Add animation */

            bar.classList.add(
                "stackly-chart-bar-animate"
            );

        });


        /* =================================================
           UPDATE Y AXIS
        ================================================== */

        yAxis.forEach(function (axis, index) {

            if (data.axis[index]) {

                axis.textContent =
                    data.axis[index];

            }

        });

    }


    /* =====================================================
       FILTER BUTTON CLICK
    ====================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Remove active class */

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* Add active class */

            this.classList.add("active");


            /* Get selected chart */

            const selectedType =
                this.textContent.trim();


            /* Update chart */

            updateHarvestChart(
                selectedType
            );

        });

    });


    /* =====================================================
       INITIAL CHART
    ====================================================== */

    updateHarvestChart("Weekly");


    /* =====================================================
       BAR HOVER - SHOW VALUE
    ====================================================== */

    chartBars.forEach(function (bar, index) {

        bar.addEventListener("mouseenter", function () {

            const selectedButton =
                document.querySelector(
                    ".stackly-chart-filters button.active"
                );

            const selectedType =
                selectedButton
                    ? selectedButton.textContent.trim()
                    : "Weekly";


            const data =
                chartData[selectedType];


            if (!data || !data.values[index]) {
                return;
            }


            /* Remove existing tooltip */

            const oldTooltip =
                bar.querySelector(
                    ".stackly-chart-tooltip"
                );

            if (oldTooltip) {
                oldTooltip.remove();
            }


            /* Create tooltip */

            const tooltip =
                document.createElement("div");

            tooltip.className =
                "stackly-chart-tooltip";


            tooltip.textContent =
                data.values[index] + "%";


            bar.appendChild(tooltip);

        });


        bar.addEventListener("mouseleave", function () {

            const tooltip =
                bar.querySelector(
                    ".stackly-chart-tooltip"
                );

            if (tooltip) {
                tooltip.remove();
            }

        });

    });

});

/* =========================================================
   STACKLY REPORTS
   REPORT PERIOD FILTER
   7 DAYS / 30 DAYS / 6 MONTHS / 1 YEAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const periodButtons = document.querySelectorAll(
        ".stackly-report-periods button"
    );

    const productionBars = document.querySelectorAll(
        ".production-bar"
    );

    const yAxisLabels = document.querySelectorAll(
        ".production-y-axis span"
    );

    const highestOutputText = document.querySelector(
        ".stackly-report-chart-footer strong"
    );

    const chartPositive = document.querySelector(
        ".chart-positive"
    );


    /* =====================================================
       REPORT PERIOD DATA
    ====================================================== */

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
                "",
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


    /* =====================================================
       UPDATE CHART
    ====================================================== */

    function updateReportChart(period) {

        const data = reportPeriods[period];

        if (!data) {
            return;
        }


        /* =================================================
           UPDATE Y AXIS
        ================================================== */

        yAxisLabels.forEach(function (label, index) {

            if (data.axis[index]) {

                label.textContent =
                    data.axis[index];

            }

        });


        /* =================================================
           UPDATE BARS
        ================================================== */

        productionBars.forEach(function (bar, index) {

            const value =
                data.values[index] ?? 0;

            const label =
                bar.querySelector("span");


            /* Reset animation */

            bar.classList.remove(
                "report-period-animation"
            );


            /* Force browser reflow */

            void bar.offsetWidth;


            /* Update height */

            bar.style.height =
                value + "%";


            /* Update label */

            if (label) {

                label.textContent =
                    data.labels[index] || "";

            }


            /* Animate */

            bar.classList.add(
                "report-period-animation"
            );

        });


        /* =================================================
           UPDATE HIGHEST OUTPUT
        ================================================== */

        if (highestOutputText) {

            highestOutputText.textContent =
                data.highest;

        }


        /* =================================================
           UPDATE GROWTH
        ================================================== */

        if (chartPositive) {

            chartPositive.innerHTML = `
                <i class="fa-solid fa-arrow-trend-up"></i>
                ${data.growth}
            `;

        }

    }


    /* =====================================================
       PERIOD BUTTON EVENTS
    ====================================================== */

    periodButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Remove active state */

            periodButtons.forEach(function (item) {

                item.classList.remove(
                    "active"
                );

            });


            /* Add active state */

            this.classList.add(
                "active"
            );


            /* Get selected period */

            const selectedPeriod =
                this.textContent.trim();


            /* Update chart */

            updateReportChart(
                selectedPeriod
            );

        });

    });


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    updateReportChart("7 Days");

});

/* =========================================================
   SETTINGS - DISPLAY USERNAME FROM EMAIL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const adminNameInput = document.getElementById("stacklyAdminName");

    if (!adminNameInput) {
        return;
    }

    /*
       Get logged-in email from localStorage
    */
    const userEmail = localStorage.getItem("stacklyUserEmail");


    if (userEmail && userEmail.includes("@")) {

        /*
           Take the first part of the email
           Example:
           admin@stacklyfarm.com → admin
        */
        let userName = userEmail.split("@")[0];


        /*
           Convert username into a cleaner display name
           admin → Admin
           farm.admin → Farm Admin
           john_doe → John Doe
        */
        userName = userName
            .replace(/[._-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });


        adminNameInput.value = userName;

    } else {

        /*
           Fallback when email is not available
        */
        adminNameInput.value = "Farm Admin";

    }

});

/* =========================================================
   SETTINGS - DISPLAY LOGGED-IN EMAIL
========================================================= */

const adminEmailInput = document.getElementById("stacklyAdminEmail");

if (adminEmailInput) {

    const userEmail = localStorage.getItem("stacklyUserEmail");

    if (userEmail && userEmail.trim() !== "") {

        adminEmailInput.value = userEmail.trim();

    } else {

        adminEmailInput.value = "admin@stacklyfarm.com";

    }

}
/* =========================================================
   STACKLY SETTINGS PAGE
   SAVE + RESET SETTINGS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const adminNameInput =
        document.getElementById("stacklyAdminName");

    const adminEmailInput =
        document.getElementById("stacklyAdminEmail");

    const adminRoleInput =
        document.getElementById("stacklyAdminRole");

    const farmTypeInput =
        document.getElementById("stacklyFarmType");

    const farmUnitInput =
        document.getElementById("stacklyFarmUnit");

    const farmLocationInput =
        document.getElementById("stacklyFarmLocation");

    const resetButton =
        document.querySelector(".stackly-settings-reset-btn");

    const saveButton =
        document.querySelector(".stackly-settings-save-btn");

    const notificationInputs =
        document.querySelectorAll(
            ".stackly-settings-option input[type='checkbox']"
        );


    /* =====================================================
       DEFAULT VALUES
    ====================================================== */

    const defaultSettings = {

        farmName: "Farm Admin",

        farmEmail: "admin@stacklyfarm.com",

        farmRole: "Farm Administrator",

        farmType: "Organic Farming",

        farmUnit: "Metric (kg / hectare)",

        farmLocation: "Tamil Nadu, India",

        harvestAlerts: true,

        inventoryAlerts: true,

        irrigationAlerts: true,

        weeklyReports: false

    };


    /* =====================================================
       GET LOGGED-IN EMAIL
       EMAIL IS STORED BY LOGIN SYSTEM
    ====================================================== */

    const loggedInEmail =
        localStorage.getItem("stacklyUserEmail");


    /* =====================================================
       DISPLAY LOGGED-IN EMAIL
    ====================================================== */

    if (
        loggedInEmail &&
        loggedInEmail.trim() !== "" &&
        adminEmailInput
    ) {

        adminEmailInput.value =
            loggedInEmail.trim();

    }


    /* =====================================================
       GET NAME FROM EMAIL
       Example:
       john.doe@gmail.com
       ↓
       John Doe
    ====================================================== */

    function getNameFromEmail(email) {

        if (
            !email ||
            !email.includes("@")
        ) {

            return defaultSettings.farmName;

        }

        let name =
            email.split("@")[0];

        name = name
            .replace(/[._-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, function (letter) {

                return letter.toUpperCase();

            });

        return name || defaultSettings.farmName;

    }


    /* =====================================================
       DEFAULT USERNAME FROM EMAIL
    ====================================================== */

    if (
        loggedInEmail &&
        adminNameInput
    ) {

        adminNameInput.value =
            getNameFromEmail(loggedInEmail);

    }


    /* =====================================================
       LOAD SAVED SETTINGS
    ====================================================== */

    function loadSavedSettings() {

        const savedSettings =
            JSON.parse(
                localStorage.getItem(
                    "stacklySettings"
                )
            );

        if (!savedSettings) {

            return;

        }


        /* NAME */

        if (
            savedSettings.farmName &&
            adminNameInput
        ) {

            adminNameInput.value =
                savedSettings.farmName;

        }


        /* EMAIL */

        if (
            savedSettings.farmEmail &&
            adminEmailInput
        ) {

            adminEmailInput.value =
                savedSettings.farmEmail;

        }


        /* ROLE */

        if (
            savedSettings.farmRole &&
            adminRoleInput
        ) {

            adminRoleInput.value =
                savedSettings.farmRole;

        }


        /* FARM TYPE */

        if (
            savedSettings.farmType &&
            farmTypeInput
        ) {

            farmTypeInput.value =
                savedSettings.farmType;

        }


        /* FARM UNIT */

        if (
            savedSettings.farmUnit &&
            farmUnitInput
        ) {

            farmUnitInput.value =
                savedSettings.farmUnit;

        }


        /* FARM LOCATION */

        if (
            savedSettings.farmLocation &&
            farmLocationInput
        ) {

            farmLocationInput.value =
                savedSettings.farmLocation;

        }


        /* NOTIFICATIONS */

        if (notificationInputs.length >= 4) {

            notificationInputs[0].checked =
                savedSettings.harvestAlerts ?? true;

            notificationInputs[1].checked =
                savedSettings.inventoryAlerts ?? true;

            notificationInputs[2].checked =
                savedSettings.irrigationAlerts ?? true;

            notificationInputs[3].checked =
                savedSettings.weeklyReports ?? false;

        }

    }


    /* =====================================================
       SAVE SETTINGS
    ====================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const settings = {

                    farmName:
                        adminNameInput
                            ? adminNameInput.value.trim()
                            : defaultSettings.farmName,

                    farmEmail:
                        adminEmailInput
                            ? adminEmailInput.value.trim()
                            : defaultSettings.farmEmail,

                    farmRole:
                        adminRoleInput
                            ? adminRoleInput.value
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


                /* =========================================
                   SAVE TO LOCAL STORAGE
                ========================================== */

                localStorage.setItem(
                    "stacklySettings",
                    JSON.stringify(settings)
                );


                /* =========================================
                   UPDATE SIDEBAR USERNAME
                ========================================== */

                const sidebarUserName =
                    document.getElementById(
                        "stacklyAdminUserName"
                    );

                if (
                    sidebarUserName &&
                    settings.farmName
                ) {

                    sidebarUserName.textContent =
                        settings.farmName;

                }


                /* =========================================
                   SAVE USER NAME SEPARATELY
                ========================================== */

                localStorage.setItem(
                    "stacklyUserName",
                    settings.farmName
                );


                /* =========================================
                   SAVE BUTTON SUCCESS STATE
                ========================================== */

                const originalButtonHTML =
                    saveButton.innerHTML;

                saveButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Saved!';

                saveButton.disabled = true;


                /* =========================================
                   RESTORE BUTTON AFTER 2 SECONDS
                ========================================== */

                setTimeout(function () {

                    saveButton.innerHTML =
                        originalButtonHTML;

                    saveButton.disabled = false;

                }, 2000);

            }
        );

    }


    /* =====================================================
       RESET SETTINGS
    ====================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                /*
                   Get current login email again
                */

                const currentEmail =
                    localStorage.getItem(
                        "stacklyUserEmail"
                    );


                /*
                   Name should come from current
                   logged-in email
                */

                const resetName =
                    currentEmail
                        ? getNameFromEmail(currentEmail)
                        : defaultSettings.farmName;


                /* =========================================
                   RESTORE FORM VALUES
                ========================================== */

                if (adminNameInput) {

                    adminNameInput.value =
                        resetName;

                }


                if (adminEmailInput) {

                    adminEmailInput.value =
                        currentEmail ||
                        defaultSettings.farmEmail;

                }


                if (adminRoleInput) {

                    adminRoleInput.value =
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


                /* =========================================
                   RESET NOTIFICATIONS
                ========================================== */

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


                /* =========================================
                   REMOVE SAVED SETTINGS
                ========================================== */

                localStorage.removeItem(
                    "stacklySettings"
                );


                /* =========================================
                   UPDATE SIDEBAR
                ========================================== */

                const sidebarUserName =
                    document.getElementById(
                        "stacklyAdminUserName"
                    );

                if (sidebarUserName) {

                    sidebarUserName.textContent =
                        resetName;

                }


                localStorage.setItem(
                    "stacklyUserName",
                    resetName
                );


                /* =========================================
                   RESET BUTTON FEEDBACK
                ========================================== */

                const originalResetText =
                    resetButton.textContent;

                resetButton.textContent =
                    "Reset Done";

                resetButton.disabled = true;


                setTimeout(function () {

                    resetButton.textContent =
                        originalResetText;

                    resetButton.disabled = false;

                }, 1500);

            }
        );

    }


    /* =====================================================
       LOAD SETTINGS AFTER PAGE LOAD
    ====================================================== */

    loadSavedSettings();


    /* =====================================================
       KEEP SIDEBAR NAME IN SYNC
    ====================================================== */

    const sidebarUserName =
        document.getElementById(
            "stacklyAdminUserName"
        );

    if (
        sidebarUserName &&
        adminNameInput
    ) {

        sidebarUserName.textContent =
            adminNameInput.value;

    }

});
