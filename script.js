document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Sidebar View Overlay Controller ---
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const sidebar = document.getElementById("sidebar");

    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener("click", (e) => {
            sidebar.classList.toggle("active");
            e.stopPropagation();
        });

        // Close sidebar when clicking outside on mobile devices
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }

    // --- Soft Micro-Interactivity: Active Menu Navigation Transitions ---
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // --- Dynamic Animated Data Counters ---
    const counters = document.querySelectorAll(".counter");
    
    const runCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const duration = 1200; // Animation running time in milliseconds
            const startStep = target / (duration / 16); // Approximating 60fps execution steps
            let currentNum = 0;

            const updateValue = () => {
                currentNum += startStep;
                if (currentNum < target) {
                    if (target % 1 !== 0) {
                        // Decimal precision handling formatting (e.g. percentages)
                        counter.innerText = currentNum.toFixed(1) + "%";
                    } else {
                        counter.innerText = (counter.innerText.startsWith("$") ? "$" : "") + Math.floor(currentNum).toLocaleString();
                    }
                    requestAnimationFrame(updateValue);
                } else {
                    if (target % 1 !== 0) {
                        counter.innerText = target.toFixed(1) + "%";
                    } else {
                        // Formats currencies versus flat structural IDs cleanly
                        if(target > 500) {
                             counter.innerText = (target === 48250 ? "$" : "") + target.toLocaleString();
                        } else {
                             counter.innerText = target;
                        }
                    }
                }
            };
            updateValue();
        });
    };

    // Trigger counters smoothly on document initialization
    runCounters();

    // --- Dynamic User Header Clock Date Output ---
    const updateLiveDate = () => {
        const dateElement = document.getElementById("live-date");
        if (dateElement) {
            const current = new Date();
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            dateElement.innerText = current.toLocaleDateString('en-US', options);
        }
    };
    updateLiveDate();

    // --- Interactive Action Alerts ---
    const notificationBtn = document.querySelector(".notification-trigger");
    if(notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            const badge = document.querySelector(".notification-badge");
            if(badge) badge.style.display = "none"; // Clear layout updates badge on check
            alert("No unread alerts remaining.");
        });
    }
});