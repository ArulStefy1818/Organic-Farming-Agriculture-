/* =========================================================
   STACKLY FARMING - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            mirror: false,
            anchorPlacement: "top-bottom"
        });
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuOpen = document.getElementById("farmMenuOpen");
    const menuClose = document.getElementById("farmMenuClose");
    const mobileMenu = document.getElementById("farmMobileMenu");
    const menuOverlay = document.getElementById("farmMenuOverlay");

    const mobileLinks = document.querySelectorAll(
        ".farm-mobile-links a"
    );


    function openFarmMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");

        document.body.classList.add("menu-open");
    }


    function closeFarmMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        document.body.classList.remove("menu-open");
    }


    if (menuOpen) {
        menuOpen.addEventListener("click", openFarmMenu);
    }


    if (menuClose) {
        menuClose.addEventListener("click", closeFarmMenu);
    }


    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeFarmMenu);
    }


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeFarmMenu();
        });

    });


    /* ESC KEY */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {

            closeFarmMenu();

        }

    });


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    const farmHeader = document.querySelector(".farm-header");


    window.addEventListener("scroll", function () {

        if (!farmHeader) return;

        if (window.scrollY > 10) {

            farmHeader.classList.add("scrolled");

        } else {

            farmHeader.classList.remove("scrolled");

        }

    });


    /* =====================================================
       CONTACT FORM ELEMENTS
    ===================================================== */

    const form = document.querySelector(".message-form");

    if (!form) return;


    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const serviceSelect =
        document.getElementById("serviceSelect");

    const serviceValue =
        document.getElementById("serviceValue");


    /* =====================================================
       CUSTOM SERVICE DROPDOWN
    ===================================================== */

    let selectButton = null;
    let selectedText = null;
    let selectOptions = [];


    if (serviceSelect) {

        selectButton =
            serviceSelect.querySelector(
                ".custom-select-button"
            );


        selectedText =
            selectButton
                ? selectButton.querySelector(
                    "span:first-child"
                )
                : null;


        selectOptions =
            serviceSelect.querySelectorAll(
                ".custom-option"
            );


        /* OPEN / CLOSE */

        if (selectButton) {

            selectButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    serviceSelect.classList.toggle(
                        "active"
                    );

                }
            );

        }


        /* SELECT OPTION */

        selectOptions.forEach(function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const value =
                        this.getAttribute(
                            "data-value"
                        );

                    const text =
                        this.textContent.trim();


                    /* Set hidden input */

                    if (serviceValue) {

                        serviceValue.value = value;

                    }


                    /* Change visible text */

                    if (selectedText) {

                        selectedText.textContent = text;

                    }


                    /* Close dropdown */

                    serviceSelect.classList.remove(
                        "active"
                    );


                    /* Remove error */

                    clearError(serviceSelect);

                }
            );

        });

    }


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                serviceSelect &&
                !serviceSelect.contains(event.target)
            ) {

                serviceSelect.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       NAME INPUT
       ONLY LETTERS AND SPACES
    ===================================================== */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                    );

                clearError(this);

            }
        );

    }


    /* =====================================================
       PHONE INPUT
       ONLY NUMBERS - MAX 10 DIGITS
    ===================================================== */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                /* Maximum 10 digits */

                if (this.value.length > 10) {

                    this.value =
                        this.value.substring(
                            0,
                            10
                        );

                }


                clearError(this);

            }
        );

    }


    /* =====================================================
       EMAIL INPUT
    ===================================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

                clearError(this);

            }
        );

    }


    /* =====================================================
       MESSAGE INPUT
    ===================================================== */

    if (messageInput) {

        messageInput.addEventListener(
            "input",
            function () {

                clearError(this);

            }
        );

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let isValid = true;


            /* Remove previous errors */

            removeAllErrors();


            /* =================================================
               NAME VALIDATION
            ================================================= */

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            /*
               Letters and spaces only.
               Examples:
               John
               John Smith
               Rahul Kumar
            */

            const namePattern =
                /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


            if (name === "") {

                showError(
                    nameInput,
                    "Please enter your name."
                );

                isValid = false;

            }

            else if (name.length < 2) {

                showError(
                    nameInput,
                    "Name must contain at least 2 characters."
                );

                isValid = false;

            }

            else if (!namePattern.test(name)) {

                showError(
                    nameInput,
                    "Name should contain letters only."
                );

                isValid = false;

            }


            /* =================================================
               PHONE VALIDATION
            ================================================= */

            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const phonePattern =
                /^[0-9]{10}$/;


            if (phone === "") {

                showError(
                    phoneInput,
                    "Please enter your phone number."
                );

                isValid = false;

            }

            else if (!phonePattern.test(phone)) {

                showError(
                    phoneInput,
                    "Phone number must contain exactly 10 digits."
                );

                isValid = false;

            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            /*
               Valid examples:
               example@gmail.com
               user.name@gmail.com
               test123@yahoo.com
            */

            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


            if (email === "") {

                showError(
                    emailInput,
                    "Please enter your email address."
                );

                isValid = false;

            }

            else if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* =================================================
               SERVICE VALIDATION
            ================================================= */

            const selectedService =
                serviceValue
                    ? serviceValue.value.trim()
                    : "";


            if (selectedService === "") {

                showError(
                    serviceSelect,
                    "Please select a service."
                );

                isValid = false;

            }


            /* =================================================
               MESSAGE VALIDATION
            ================================================= */

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            if (message === "") {

                showError(
                    messageInput,
                    "Please write your message."
                );

                isValid = false;

            }

            else if (message.length < 10) {

                showError(
                    messageInput,
                    "Message must contain at least 10 characters."
                );

                isValid = false;

            }


            /* =================================================
               STOP IF INVALID
            ================================================= */

            if (!isValid) {

                return;

            }


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            showSuccessMessage();


            /* =================================================
               CLEAR FORM
            ================================================= */

            form.reset();


            /* Clear custom service */

            if (serviceValue) {

                serviceValue.value = "";

            }


            if (selectedText) {

                selectedText.textContent =
                    "Select...";

            }


            if (serviceSelect) {

                serviceSelect.classList.remove(
                    "active"
                );

            }


            /* =================================================
               REMOVE SUCCESS MESSAGE AFTER 5 SECONDS
            ================================================= */

            setTimeout(
                function () {

                    const successMessage =
                        form.querySelector(
                            ".form-success-message"
                        );


                    if (successMessage) {

                        successMessage.remove();

                    }

                },
                3000
            );

        }
    );


    /* =====================================================
       SHOW ERROR
    ===================================================== */

    function showError(element, message) {

        if (!element) return;


        /* Add error class */

        element.classList.add(
            "input-error"
        );


        /* Prevent duplicate error */

        const parent =
            element.parentElement;


        if (
            parent &&
            parent.querySelector(".form-error")
        ) {

            return;

        }


        /* Create error */

        const error =
            document.createElement("div");


        error.className =
            "form-error";


        error.textContent =
            message;


        /* Add error below element */

        if (parent) {

            parent.appendChild(error);

        }

    }


    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    function clearError(element) {

        if (!element) return;


        element.classList.remove(
            "input-error"
        );


        const parent =
            element.parentElement;


        if (!parent) return;


        const error =
            parent.querySelector(
                ".form-error"
            );


        if (error) {

            error.remove();

        }

    }


    /* =====================================================
       REMOVE ALL ERRORS
    ===================================================== */

    function removeAllErrors() {

        /* Remove error messages */

        document
            .querySelectorAll(".form-error")
            .forEach(function (error) {

                error.remove();

            });


        /* Remove error classes */

        document
            .querySelectorAll(".input-error")
            .forEach(function (element) {

                element.classList.remove(
                    "input-error"
                );

            });

    }


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    function showSuccessMessage() {

        /* Remove old success */

        const oldMessage =
            form.querySelector(
                ".form-success-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        /* Create success message */

        const success =
            document.createElement("div");


        success.className =
            "form-success-message";


        success.innerHTML = `
            <span class="success-icon">✓</span>
            <span>Message sent successfully!</span>
        `;


        /* Add to form */

        form.appendChild(success);


        /* Animation */

        setTimeout(function () {

            success.classList.add("show");

        }, 10);

    }

});


// FAQ Accordion
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {

        question.addEventListener("click", () => {

            const currentItem = question.closest(".faq-item");

            document.querySelectorAll(".faq-item").forEach((item) => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });

            currentItem.classList.toggle("active");

        });

    });



/* =========================================================
   STACKLY NEWSLETTER SUBSCRIBE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.querySelector(".stackly-newsletter-form");

    const emailInput =
        newsletterForm.querySelector('input[type="email"]');

    const subscribeButton =
        newsletterForm.querySelector("button");


    /* =====================================================
       CREATE MESSAGE ELEMENT
    ===================================================== */

    const message = document.createElement("p");

    message.className = "stackly-subscribe-message";

    newsletterForm.appendChild(message);


    /* =====================================================
       SUBSCRIBE CLICK
    ===================================================== */

    subscribeButton.addEventListener("click", function (event) {

        event.preventDefault();


        const email = emailInput.value.trim();


        /* =================================================
           EMPTY EMAIL
        ================================================= */

        if (email === "") {

            message.textContent =
                "Please enter your email address.";

            message.className =
                "stackly-subscribe-message error";

            emailInput.focus();

            return;

        }


        /* =================================================
           EMAIL VALIDATION
        ================================================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!emailPattern.test(email)) {

            message.textContent =
                "Please enter a valid email address.";

            message.className =
                "stackly-subscribe-message error";

            emailInput.focus();

            return;

        }


        /* =================================================
           SUCCESS
        ================================================= */

        message.textContent =
            "Subscribed successfully! Redirecting...";

        message.className =
            "stackly-subscribe-message success";


        /* Disable button */

        subscribeButton.disabled = true;

        subscribeButton.textContent = "Subscribed";


        /* Clear form */

        emailInput.value = "";


        /* =================================================
           REDIRECT TO 404 PAGE
        ================================================= */

        setTimeout(function () {

            window.location.href = "404.html";

        }, 1500);

    });

});


/* =========================================================
   FARM BLOG + MESSAGE SECTION
   PROFESSIONAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CUSTOM SERVICE SELECT
    ===================================================== */

    const serviceSelect = document.getElementById("serviceSelect");
    const serviceButton = serviceSelect
        ? serviceSelect.querySelector(".custom-select-button")
        : null;

    const serviceOptions = serviceSelect
        ? serviceSelect.querySelectorAll(".custom-option")
        : [];

    const serviceValue = document.getElementById("serviceValue");

    if (serviceSelect && serviceButton) {

        /* Open / Close Dropdown */
        serviceButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = serviceSelect.classList.contains("open");

            /* Close other dropdowns */
            document.querySelectorAll(".custom-select.open").forEach(function (select) {
                select.classList.remove("open");
            });

            if (!isOpen) {
                serviceSelect.classList.add("open");
            }
        });


        /* Select Option */
        serviceOptions.forEach(function (option) {

            option.addEventListener("click", function () {

                const selectedText = this.textContent.trim();
                const selectedValue = this.getAttribute("data-value");

                serviceButton.querySelector("span:first-child").textContent =
                    selectedText;

                if (serviceValue) {
                    serviceValue.value = selectedValue;
                }

                /* Selected state */
                serviceOptions.forEach(function (item) {
                    item.classList.remove("selected");
                });

                this.classList.add("selected");

                /* Close dropdown */
                serviceSelect.classList.remove("open");

            });

        });


        /* Keyboard support */
        serviceButton.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                serviceSelect.classList.toggle("open");
            }

            if (event.key === "Escape") {
                serviceSelect.classList.remove("open");
            }

        });

    }


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        document.querySelectorAll(".custom-select.open").forEach(function (select) {

            if (!select.contains(event.target)) {
                select.classList.remove("open");
            }

        });

    });
   

    /* =====================================================
       PAGINATION
    ===================================================== */

    const paginationButtons =
        document.querySelectorAll(".farm-pagination button");

    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (this.classList.contains("next")) {

                console.log("Next page clicked");

                return;
            }

            /* Remove active */
            paginationButtons.forEach(function (item) {

                if (!item.classList.contains("next")) {
                    item.classList.remove("active");
                }

            });

            /* Set active */
            this.classList.add("active");

        });

    });


    /* =====================================================
       BLOG CARD IMAGE LAZY LOADING
    ===================================================== */

    const blogImages =
        document.querySelectorAll(
            ".farm-blog-card img, .farm-featured-post img"
        );

    blogImages.forEach(function (image) {

        image.setAttribute("loading", "lazy");

    });


    /* =====================================================
       AOS REFRESH
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }


    /* =====================================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});


/* =========================================================
   STACKLY FARMING - BLOG SYSTEM
   Category Filter + Search + Pagination
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BLOG ELEMENTS
    ===================================================== */

    const blogSection =
        document.querySelector(".farm-blog-section");

    if (!blogSection) return;

    const blogGrid =
        blogSection.querySelector(".farm-blog-grid");

    const blogCards =
        Array.from(
            blogSection.querySelectorAll(".farm-blog-card")
        );

    const categoryItems =
        blogSection.querySelectorAll(
            ".farm-category-list li"
        );

    const categoryNavItems =
        document.querySelectorAll(
            ".blog-category-bar a[data-category]"
        );

    const searchInput =
        blogSection.querySelector(
            ".farm-search input"
        );

    const searchButton =
        blogSection.querySelector(
            ".farm-search button"
        );

    const pagination =
        blogSection.querySelector(
            ".farm-pagination"
        );


    /* =====================================================
       SETTINGS
    ===================================================== */

    const articlesPerPage = 6;

    let currentCategory = "all";

    let currentPage = 1;

    let currentSearch = "";


    /* =====================================================
       ARTICLE DATA
    ===================================================== */

    const articles = blogCards.map(function (card, index) {

        const titleElement =
            card.querySelector("h2");

        const descriptionElement =
            card.querySelector("p");

        const categoryElement =
            card.querySelector(
                ".farm-card-meta span:first-child"
            );


        /*
         * First priority:
         * data-category
         *
         * Fallback:
         * category text
         */

        let category =
            card.dataset.category || "";


        if (!category && categoryElement) {

            category =
                categoryElement.textContent
                    .trim()
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\s+/g, "-");

        }


        return {

            element: card,

            index: index,

            category: category,

            title:
                titleElement
                    ? titleElement.textContent
                        .trim()
                        .toLowerCase()
                    : "",

            description:
                descriptionElement
                    ? descriptionElement.textContent
                        .trim()
                        .toLowerCase()
                    : ""

        };

    });


    /* =====================================================
       GET FILTERED ARTICLES
    ===================================================== */

    function getFilteredArticles() {

        return articles.filter(function (article) {

            const categoryMatch =
                currentCategory === "all" ||
                article.category === currentCategory;


            const searchMatch =
                currentSearch === "" ||
                article.title.includes(
                    currentSearch
                ) ||
                article.description.includes(
                    currentSearch
                ) ||
                article.category.includes(
                    currentSearch
                );


            return categoryMatch && searchMatch;

        });

    }


    /* =====================================================
       DISPLAY ARTICLES
    ===================================================== */

    function displayArticles() {

        if (!blogGrid) return;


        const filteredArticles =
            getFilteredArticles();


        const totalArticles =
            filteredArticles.length;


        const totalPages =
            Math.ceil(
                totalArticles /
                articlesPerPage
            );


        /*
         * Validate page
         */

        if (
            currentPage > totalPages &&
            totalPages > 0
        ) {

            currentPage = totalPages;

        }


        if (totalPages === 0) {

            currentPage = 1;

        }


        /*
         * Hide all articles
         */

        articles.forEach(function (article) {

            article.element.style.display =
                "none";

        });


        /*
         * Current page range
         */

        const startIndex =
            (currentPage - 1) *
            articlesPerPage;


        const endIndex =
            startIndex +
            articlesPerPage;


        /*
         * Show filtered articles
         */

        filteredArticles
            .slice(startIndex, endIndex)
            .forEach(function (article) {

                article.element.style.display =
                    "";

            });


        /*
         * Empty state
         */

        showEmptyMessage(
            totalArticles === 0
        );


        /*
         * Pagination
         */

        updatePagination(totalPages);

    }


    /* =====================================================
       EMPTY RESULT MESSAGE
    ===================================================== */

    function showEmptyMessage(show) {

        let emptyMessage =
            blogGrid.querySelector(
                ".farm-no-results"
            );


        if (show) {

            if (!emptyMessage) {

                emptyMessage =
                    document.createElement(
                        "div"
                    );

                emptyMessage.className =
                    "farm-no-results";

                emptyMessage.innerHTML = `

                    <div class="farm-no-results-icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <h3>
                        No articles found
                    </h3>

                    <p>
                        Try another category or search keyword.
                    </p>

                `;

                blogGrid.appendChild(
                    emptyMessage
                );

            }


            emptyMessage.style.display =
                "block";

        }

        else {

            if (emptyMessage) {

                emptyMessage.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       SET ACTIVE CATEGORY
    ===================================================== */

    function setActiveCategory(category) {

        currentCategory =
            category || "all";


        currentPage = 1;


        /*
         * Sidebar active
         */

        categoryItems.forEach(function (item) {

            item.classList.toggle(
                "active",
                item.dataset.category ===
                currentCategory
            );

        });


        /*
         * Top navigation active
         */

        categoryNavItems.forEach(function (item) {

            item.classList.toggle(
                "active",
                item.dataset.category ===
                currentCategory
            );

        });


        /*
         * Display articles
         */

        displayArticles();

    }


    /* =====================================================
       SIDEBAR CATEGORY CLICK
    ===================================================== */

    categoryItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const category =
                    this.dataset.category ||
                    "all";


                setActiveCategory(
                    category
                );


                scrollToArticles();

            }
        );

    });


    /* =====================================================
       TOP CATEGORY NAVIGATION CLICK
    ===================================================== */

    categoryNavItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const category =
                    this.dataset.category ||
                    "all";


                setActiveCategory(
                    category
                );


                scrollToArticles();

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    function performSearch() {

        currentSearch =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        currentPage = 1;


        displayArticles();

    }


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );


        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       PAGINATION
    ===================================================== */

    function updatePagination(totalPages) {

        if (!pagination) return;


        const buttons =
            pagination.querySelectorAll(
                "button[data-page]"
            );


        buttons.forEach(function (button) {

            const page =
                button.dataset.page;


            /*
             * Next button
             */

            if (page === "next") {

                button.disabled =
                    currentPage >= totalPages ||
                    totalPages === 0;

                return;

            }


            /*
             * Number button
             */

            const pageNumber =
                parseInt(
                    page,
                    10
                );


            if (
                !isNaN(pageNumber) &&
                pageNumber <= totalPages
            ) {

                button.style.display =
                    "inline-flex";


                button.classList.toggle(
                    "active",
                    pageNumber ===
                    currentPage
                );

            }

            else {

                button.style.display =
                    "none";

            }

        });

    }


    /* =====================================================
       PAGINATION CLICK
    ===================================================== */

    if (pagination) {

        pagination.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "button[data-page]"
                    );


                if (!button) return;


                const page =
                    button.dataset.page;


                /*
                 * NEXT
                 */

                if (page === "next") {

                    const totalPages =
                        Math.ceil(
                            getFilteredArticles()
                                .length /
                            articlesPerPage
                        );


                    if (
                        currentPage <
                        totalPages
                    ) {

                        currentPage++;

                        displayArticles();

                        scrollToArticles();

                    }

                    return;

                }


                /*
                 * PAGE NUMBER
                 */

                const pageNumber =
                    parseInt(
                        page,
                        10
                    );


                if (!isNaN(pageNumber)) {

                    currentPage =
                        pageNumber;

                    displayArticles();

                    scrollToArticles();

                }

            }
        );

    }


    /* =====================================================
       SCROLL TO ARTICLES
    ===================================================== */

    function scrollToArticles() {

        if (!blogGrid) return;


        const offset = 120;


        const position =
            blogGrid.getBoundingClientRect()
                .top +
            window.scrollY -
            offset;


        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    }


    /* =====================================================
       LAZY LOAD IMAGES
    ===================================================== */

    blogSection
        .querySelectorAll("img")
        .forEach(function (image) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        });


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    displayArticles();


    /* =====================================================
       AOS REFRESH
    ===================================================== */

    if (
        typeof AOS !== "undefined"
    ) {

        AOS.refresh();

    }

});



/* =========================================================
   STACKLY FARMING - BLOG SEARCH + NEWSLETTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BLOG SECTION
    ===================================================== */

    const blogSection =
        document.querySelector(".farm-blog-section");

    if (!blogSection) return;


    /* =====================================================
       SEARCH ELEMENTS
    ===================================================== */

    const searchBox =
        blogSection.querySelector(".farm-search");

    const searchInput =
        blogSection.querySelector(
            ".farm-search input"
        );

    const searchButton =
        blogSection.querySelector(
            ".farm-search button"
        );


    /* =====================================================
       CREATE SEARCH MESSAGE
    ===================================================== */

    let searchMessage =
        blogSection.querySelector(
            ".farm-search-message"
        );


    if (!searchMessage && searchBox) {

        searchMessage =
            document.createElement("div");

        searchMessage.className =
            "farm-search-message";

        searchBox.parentNode.appendChild(
            searchMessage
        );

    }


    /* =====================================================
       SEARCH MESSAGE FUNCTION
    ===================================================== */

    function showSearchMessage(
        message,
        type
    ) {

        if (!searchMessage) return;

        searchMessage.textContent =
            message;

        searchMessage.className =
            "farm-search-message " +
            type;

    }


    /* =====================================================
       SEARCH FUNCTION
    ===================================================== */

    function performBlogSearch() {

        const keyword =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        /* ---------------------------------------------
           EMPTY SEARCH
        --------------------------------------------- */

        if (keyword === "") {

            showSearchMessage(
                "Please enter an article title or keyword.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           GET BLOG CARDS
        --------------------------------------------- */

        const cards =
            blogSection.querySelectorAll(
                ".farm-blog-card"
            );


        let foundArticles = 0;


        cards.forEach(function (card) {

            const title =
                card.querySelector("h2")
                    ? card.querySelector("h2")
                        .textContent
                        .toLowerCase()
                    : "";


            const description =
                card.querySelector("p")
                    ? card.querySelector("p")
                        .textContent
                        .toLowerCase()
                    : "";


            const category =
                card.querySelector(
                    ".farm-card-meta span:first-child"
                )
                    ? card.querySelector(
                        ".farm-card-meta span:first-child"
                    )
                        .textContent
                        .toLowerCase()
                    : "";


            const matches =
                title.includes(keyword) ||
                description.includes(keyword) ||
                category.includes(keyword);


            if (matches) {

                card.style.display = "";

                foundArticles++;

            }

            else {

                card.style.display = "none";

            }

        });


        /* ---------------------------------------------
           SEARCH RESULT
        --------------------------------------------- */

        if (foundArticles === 0) {

            showSearchMessage(
                "No articles found. Try another keyword.",
                "error"
            );

        }

        else {

            showSearchMessage(
                foundArticles +
                (foundArticles === 1
                    ? " article found."
                    : " articles found."),
                "success"
            );


            /* Smooth scroll */

            const grid =
                blogSection.querySelector(
                    ".farm-blog-grid"
                );


            if (grid) {

                const position =
                    grid.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    120;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }

        }

    }


    /* =====================================================
       SEARCH BUTTON CLICK
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                performBlogSearch();

            }
        );

    }


    /* =====================================================
       SEARCH ENTER KEY
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performBlogSearch();

                }

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH MESSAGE WHILE TYPING
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                if (
                    searchMessage &&
                    searchInput.value.trim() === ""
                ) {

                    searchMessage.textContent = "";

                    searchMessage.className =
                        "farm-search-message";

                }

            }
        );

    }


    /* =====================================================
       NEWSLETTER ELEMENTS
    ===================================================== */

    const newsletterBox =
        blogSection.querySelector(
            ".farm-newsletter-box"
        );


    if (!newsletterBox) return;


    const newsletterInput =
        newsletterBox.querySelector(
            'input[type="email"]'
        );


    const newsletterButton =
        newsletterBox.querySelector(
            "button"
        );


    const newsletterCheckbox =
        newsletterBox.querySelector(
            'input[type="checkbox"]'
        );


    /* =====================================================
       CREATE NEWSLETTER MESSAGE
    ===================================================== */

    let newsletterMessage =
        newsletterBox.querySelector(
            ".farm-newsletter-message"
        );


    if (!newsletterMessage) {

        newsletterMessage =
            document.createElement("div");

        newsletterMessage.className =
            "farm-newsletter-message";

        newsletterBox.appendChild(
            newsletterMessage
        );

    }


    /* =====================================================
       NEWSLETTER MESSAGE
    ===================================================== */

    function showNewsletterMessage(
        message,
        type
    ) {

        newsletterMessage.textContent =
            message;

        newsletterMessage.className =
            "farm-newsletter-message " +
            type;

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       SUBSCRIBE
    ===================================================== */

    if (newsletterButton) {

        newsletterButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const email =
                    newsletterInput
                        ? newsletterInput.value.trim()
                        : "";


                /* -----------------------------------------
                   EMPTY EMAIL
                ----------------------------------------- */

                if (email === "") {

                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );


                    if (newsletterInput) {

                        newsletterInput.focus();

                    }


                    return;

                }


                /* -----------------------------------------
                   INVALID EMAIL
                ----------------------------------------- */

                if (!isValidEmail(email)) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );


                    if (newsletterInput) {

                        newsletterInput.focus();

                    }


                    return;

                }


                /* -----------------------------------------
                   CHECKBOX VALIDATION
                ----------------------------------------- */

                if (
                    newsletterCheckbox &&
                    !newsletterCheckbox.checked
                ) {

                    showNewsletterMessage(
                        "Please agree to receive updates.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                showNewsletterMessage(
                    "Successfully subscribed! Thank you for joining us.",
                    "success"
                );


                /* -----------------------------------------
                   CLEAR EMAIL
                ----------------------------------------- */

                if (newsletterInput) {

                    newsletterInput.value = "";

                }


                /* -----------------------------------------
                   CLEAR CHECKBOX
                ----------------------------------------- */

                if (newsletterCheckbox) {

                    newsletterCheckbox.checked =
                        false;

                }


                /* -----------------------------------------
                   CHANGE BUTTON
                ----------------------------------------- */

                newsletterButton.textContent =
                    "Subscribed ✓";


                newsletterButton.disabled =
                    true;


                /* -----------------------------------------
                   RE-ENABLE AFTER 4 SECONDS
                   Optional
                ----------------------------------------- */

                setTimeout(function () {

                    newsletterButton.disabled =
                        false;

                    newsletterButton.textContent =
                        "Subscribe →";

                }, 4000);

            }
        );

    }

});

/* =========================================================
   STACKLY FARMING
   CONTACT FORM + CUSTOM DROPDOWN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET FORM ELEMENTS
    ===================================================== */

    const form = document.getElementById("stacklyMessageForm");
    const statusMessage = document.getElementById("stacklyFormStatus");

    if (!form || !statusMessage) {
        return;
    }


    /* =====================================================
       GET INPUT ELEMENTS
    ===================================================== */

    const nameInput = document.getElementById("stacklyFullName");
    const emailInput = document.getElementById("stacklyEmail");
    const phoneInput = document.getElementById("stacklyPhone");
    const messageInput = document.getElementById("stacklyMessage");

    const subjectDropdown =
        document.querySelector(".stackly-custom-select");

    const subjectSelected =
        document.querySelector(".stackly-select-selected");

    const subjectText =
        document.querySelector(".stackly-selected-text");

    const subjectOptions =
        document.querySelectorAll(".stackly-select-option");

    const subjectHiddenInput =
        document.getElementById("stacklySubjectValue");

    const submitButton =
        form.querySelector(".stackly-contact-submit");


    /* =====================================================
       CUSTOM SUBJECT DROPDOWN
    ===================================================== */

    if (
        subjectDropdown &&
        subjectSelected &&
        subjectText &&
        subjectHiddenInput
    ) {

        /* -------------------------------------------------
           OPEN / CLOSE DROPDOWN
        ------------------------------------------------- */

        subjectSelected.addEventListener("click", function (event) {

            event.stopPropagation();

            subjectDropdown.classList.toggle("active");

        });


        /* -------------------------------------------------
           SELECT DROPDOWN OPTION
        ------------------------------------------------- */

        subjectOptions.forEach(function (option) {

            option.addEventListener("click", function (event) {

                event.stopPropagation();

                const value = this.dataset.value;
                const text = this.textContent.trim();


                /* Update visible text */
                subjectText.textContent = text;


                /* Update hidden input */
                subjectHiddenInput.value = value;


                /* Remove previous selected class */
                subjectOptions.forEach(function (item) {

                    item.classList.remove("selected");

                });


                /* Add selected class */
                this.classList.add("selected");


                /* Close dropdown */
                subjectDropdown.classList.remove("active");

            });

        });


        /* -------------------------------------------------
           CLOSE WHEN CLICKING OUTSIDE
        ------------------------------------------------- */

        document.addEventListener("click", function (event) {

            if (!subjectDropdown.contains(event.target)) {

                subjectDropdown.classList.remove("active");

            }

        });


        /* -------------------------------------------------
           CLOSE WITH ESC KEY
        ------------------------------------------------- */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                subjectDropdown.classList.remove("active");

            }

        });

    }


    /* =====================================================
       NAME - ALLOW ONLY LETTERS AND SPACES
    ===================================================== */

    if (nameInput) {

        nameInput.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^A-Za-z ]/g,
                ""
            );

        });

    }


    /* =====================================================
       PHONE - ALLOW ONLY NUMBERS
    ===================================================== */

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^0-9]/g,
                ""
            );


            /* Maximum 10 digits */

            if (this.value.length > 10) {

                this.value =
                    this.value.substring(0, 10);

            }

        });

    }


    /* =====================================================
       EMAIL - LOWERCASE
    ===================================================== */

    if (emailInput) {

        emailInput.addEventListener("input", function () {

            this.value =
                this.value.replace(/\s/g, "");

        });


        emailInput.addEventListener("blur", function () {

            this.value =
                this.value.trim().toLowerCase();

        });

    }


    /* =====================================================
       TRIM INPUTS ON BLUR
    ===================================================== */

    const textFields = [
        nameInput,
        emailInput,
        phoneInput,
        messageInput
    ];

    textFields.forEach(function (field) {

        if (!field) {
            return;
        }

        field.addEventListener("blur", function () {

            this.value = this.value.trim();

        });

    });


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =================================================
           GET VALUES
        ================================================= */

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const phone =
            phoneInput.value.trim();

        /* IMPORTANT:
           Get subject from hidden input */

        const subject =
            subjectHiddenInput.value.trim();

        const message =
            messageInput.value.trim();


        /* =================================================
           CLEAR PREVIOUS STATUS
        ================================================= */

        statusMessage.textContent = "";

        statusMessage.className =
            "stackly-form-status";


        /* =================================================
           VALIDATION REGEX
        ================================================= */

        const namePattern =
            /^[A-Za-z ]+$/;


        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        const phonePattern =
            /^[0-9]{10}$/;


        /* =================================================
           EMPTY NAME
        ================================================= */

        if (name === "") {

            showError(
                "Please enter your name."
            );

            nameInput.focus();

            return;

        }


        /* =================================================
           EMPTY EMAIL
        ================================================= */

        if (email === "") {

            showError(
                "Please enter your email address."
            );

            emailInput.focus();

            return;

        }


        /* =================================================
           EMPTY PHONE
        ================================================= */

        if (phone === "") {

            showError(
                "Please enter your phone number."
            );

            phoneInput.focus();

            return;

        }


        /* =================================================
           EMPTY SUBJECT
        ================================================= */

        if (subject === "") {

            showError(
                "Please select a subject."
            );

            subjectSelected.focus();

            subjectDropdown.classList.add("active");

            return;

        }


        /* =================================================
           EMPTY MESSAGE
        ================================================= */

        if (message === "") {

            showError(
                "Please enter your message."
            );

            messageInput.focus();

            return;

        }


        /* =================================================
           NAME FORMAT
        ================================================= */

        if (!namePattern.test(name)) {

            showError(
                "Name should contain alphabets and spaces only."
            );

            nameInput.focus();

            return;

        }


        /* =================================================
           NAME LENGTH
        ================================================= */

        if (name.length < 2) {

            showError(
                "Name must contain at least 2 characters."
            );

            nameInput.focus();

            return;

        }


        /* =================================================
           EMAIL FORMAT
        ================================================= */

        if (!emailPattern.test(email)) {

            showError(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return;

        }


        /* =================================================
           PHONE FORMAT
        ================================================= */

        if (!phonePattern.test(phone)) {

            showError(
                "Phone number must contain exactly 10 digits."
            );

            phoneInput.focus();

            return;

        }


        /* =================================================
           MESSAGE LENGTH
        ================================================= */

        if (message.length < 10) {

            showError(
                "Message must contain at least 10 characters."
            );

            messageInput.focus();

            return;

        }


        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        statusMessage.textContent =
            "✓ Message sent successfully!";

        statusMessage.className =
            "stackly-form-status success";


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.style.opacity = "0.7";

            submitButton.style.cursor =
                "not-allowed";

        }


        /* =================================================
           RESET FORM
        ================================================= */

        form.reset();


        /* Reset custom dropdown */

        if (subjectText) {

            subjectText.textContent =
                "Select a subject";

        }


        if (subjectHiddenInput) {

            subjectHiddenInput.value = "";

        }


        subjectOptions.forEach(function (option) {

            option.classList.remove("selected");

        });


        if (subjectDropdown) {

            subjectDropdown.classList.remove("active");

        }


        /* =================================================
           REDIRECT TO 404 PAGE
        ================================================= */

        setTimeout(function () {

            window.location.href = "404.html";

        }, 1800);

    });


    /* =====================================================
       SHOW ERROR FUNCTION
    ===================================================== */

    function showError(message) {

        statusMessage.textContent =
            "✕ " + message;

        statusMessage.className =
            "stackly-form-status error";


        /* Smooth scroll */

        statusMessage.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });


        /* Shake animation */

        statusMessage.style.animation = "none";

        void statusMessage.offsetWidth;

        statusMessage.style.animation =
            "statusMessageAnimation 0.4s ease-out both";

    }

});

/* =========================================================
   STACKLY NAVIGATION - ACTIVE PAGE HIGHLIGHT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Get current page name
    let currentPage = window.location.pathname.split("/").pop();

    // If URL is empty, treat it as index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    // Convert possible default home URLs
    if (
        currentPage === "/" ||
        currentPage === "index"
    ) {
        currentPage = "index.html";
    }

    /* =====================================================
       DESKTOP NAVIGATION
    ===================================================== */

    const desktopLinks = document.querySelectorAll(
        ".farm-nav a"
    );

    desktopLinks.forEach(function (link) {

        // Remove existing active class
        link.classList.remove("active");

        // Get linked page
        const linkPage = link
            .getAttribute("href")
            .split("/")
            .pop()
            .split("#")[0];

        // Highlight current page
        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileLinks = document.querySelectorAll(
        ".farm-mobile-links a"
    );

    mobileLinks.forEach(function (link) {

        // Remove existing active class
        link.classList.remove("active");

        // Get linked page
        const linkPage = link
            .getAttribute("href")
            .split("/")
            .pop()
            .split("#")[0];

        // Highlight current page
        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================================
   STACKLY PREMIUM LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("stacklyLoader");
    const progressBar = document.getElementById("loaderProgressBar");
    const percentText = document.getElementById("loaderPercent");
    const messageText = document.getElementById("loaderMessage");
    const statusText = document.getElementById("loaderStatus");

    if (!loader) {
        return;
    }


    /* =====================================================
       PREVENT SCROLL WHILE LOADING
    ===================================================== */

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";


    /* =====================================================
       LOADING MESSAGES
    ===================================================== */

    const messages = [
        "Preparing your farming experience...",
        "Connecting smart agriculture systems...",
        "Optimizing your farming dashboard...",
        "Growing sustainable ideas...",
        "Preparing innovative solutions...",
        "Almost ready..."
    ];


    const statuses = [
        "Connecting to Stackly",
        "Loading agriculture systems",
        "Preparing smart solutions",
        "Optimizing experience",
        "Finalizing website",
        "Ready to grow"
    ];


    let progress = 0;

    let messageIndex = 0;


    /* =====================================================
       UPDATE MESSAGE
    ===================================================== */

    const messageInterval = setInterval(function () {

        messageIndex++;

        if (messageIndex >= messages.length) {
            messageIndex = messages.length - 1;
        }

        if (messageText) {
            messageText.style.opacity = "0";

            setTimeout(function () {

                messageText.textContent =
                    messages[messageIndex];

                messageText.style.opacity = "1";

            }, 180);
        }

        if (statusText) {

            statusText.style.opacity = "0";

            setTimeout(function () {

                statusText.textContent =
                    statuses[messageIndex];

                statusText.style.opacity = "1";

            }, 180);

        }

    }, 650);


    /* =====================================================
       PROGRESS ANIMATION
    ===================================================== */

    const progressInterval = setInterval(function () {

        /*
         * Slow down near 90%
         * so the page has time to finish loading.
         */

        if (progress < 70) {

            progress += Math.random() * 5 + 2;

        } else if (progress < 90) {

            progress += Math.random() * 2 + 1;

        } else if (progress < 97) {

            progress += .3;

        }


        if (progress > 97) {
            progress = 97;
        }


        updateProgress();

    }, 100);


    function updateProgress() {

        const roundedProgress =
            Math.floor(progress);

        if (progressBar) {

            progressBar.style.width =
                roundedProgress + "%";

        }

        if (percentText) {

            percentText.textContent =
                roundedProgress + "%";

        }

    }


    /* =====================================================
       PAGE LOAD COMPLETE
    ===================================================== */

    window.addEventListener("load", function () {

        clearInterval(progressInterval);
        clearInterval(messageInterval);


        progress = 100;


        if (progressBar) {

            progressBar.style.width = "100%";

        }


        if (percentText) {

            percentText.textContent = "100%";

        }


        if (messageText) {

            messageText.textContent =
                "Welcome to Stackly";

        }


        if (statusText) {

            statusText.textContent =
                "Ready to grow";

        }


        /*
         * Give the 100% state a moment
         * before closing the loader.
         */

        setTimeout(function () {

            hideLoader();

        }, 650);

    });


    /* =====================================================
       HIDE LOADER
    ===================================================== */

    function hideLoader() {

        loader.classList.add("loader-hidden");


        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";


        /*
         * Completely remove loader after animation.
         */

        setTimeout(function () {

            loader.style.display = "none";

        }, 2000);

    }

});