document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("pageLoader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("loader-hidden");
            setTimeout(() => loader.remove(), 500);
        }, 700);
    }
});

const darkBtn = document.getElementById("darkModeBtn");
const icon = darkBtn ? darkBtn.querySelector("i") : null;

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
}

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            if (icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
        } else {
            localStorage.setItem("theme", "light");
            if (icon) { icon.classList.remove("fa-sun"); icon.classList.add("fa-moon"); }
        }
    });
}

const searchData = [
    { label: "Canada Immigration", url: "canada.html" },
    { label: "Canada Work Permit", url: "canada.html" },
    { label: "Canada PR Program", url: "canada.html" },
    { label: "Family Sponsorship", url: "canada.html" },
    { label: "Student Visa Canada", url: "canada.html" },
    { label: "Australia Immigration", url: "other-countries.html" },
    { label: "UK Visa", url: "other-countries.html" },
    { label: "New Zealand Immigration", url: "other-countries.html" },
    { label: "USA Visa", url: "other-countries.html" },
    { label: "Europe Immigration", url: "other-countries.html" },
    { label: "Germany Visa", url: "other-countries.html" },
    { label: "Singapore Visa", url: "other-countries.html" },
    { label: "Dubai Work Visa", url: "other-countries.html" },
    { label: "Legal Services", url: "legal-services.html" },
    { label: "Visa Appeal", url: "legal-services.html" },
    { label: "Refugee Law", url: "legal-services.html" },
    { label: "Citizenship Services", url: "legal-services.html" },
    { label: "Visa Refusal Help", url: "legal-services.html" },
    { label: "About Us", url: "about.html" },
    { label: "Our Team", url: "about.html" },
    { label: "Success Stories", url: "success-stories.html" },
    { label: "Client Reviews", url: "success-stories.html" },
    { label: "Book Consultation", url: "consultation.html" },
    { label: "Free Consultation", url: "consultation.html" },
    { label: "Career Opportunities", url: "career.html" },
    { label: "Jobs at ATA", url: "career.html" },
    { label: "Contact Us", url: "contact.html" },
    { label: "Office Locations", url: "contact.html" },
    { label: "Scholarship Programs", url: "other-countries.html" },
    { label: "Nurse Migration", url: "other-countries.html" },
    { label: "MSc PhD Scholarships", url: "other-countries.html" },
    { label: "Newsletter Subscribe", url: "index.html" },
];

document.querySelectorAll(".search-container").forEach(container => {
    const input = container.querySelector("input");
    if (!input) return;

    const dropdown = document.createElement("div");
    dropdown.className = "search-dropdown";
    container.appendChild(dropdown);
    container.style.position = "relative";

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        dropdown.innerHTML = "";
        if (!q) { dropdown.style.display = "none"; return; }

        const matches = searchData.filter(item => item.label.toLowerCase().includes(q)).slice(0, 6);
        if (matches.length === 0) { dropdown.style.display = "none"; return; }

        matches.forEach(item => {
            const div = document.createElement("div");
            div.className = "search-item";
            div.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${item.label}`;
            div.addEventListener("click", () => {
                window.location.href = item.url;
            });
            dropdown.appendChild(div);
        });
        dropdown.style.display = "block";
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const q = input.value.trim().toLowerCase();
            const match = searchData.find(item => item.label.toLowerCase().includes(q));
            if (match) window.location.href = match.url;
            dropdown.style.display = "none";
        }
    });

    document.addEventListener("click", (e) => {
    document.querySelectorAll(".search-dropdown").forEach(dropdown => {
        if (!dropdown.parentElement.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });
});

});
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display = document.documentElement.scrollTop > 300 ? "flex" : "none";
    });
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetEl = document.querySelector(this.getAttribute("href"));
        if (targetEl) { e.preventDefault(); targetEl.scrollIntoView({ behavior: "smooth" }); }
    });
});

const counters = document.querySelectorAll(".stat-card h3");
if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.innerText;

                if (!isNaN(finalValue) && finalValue > 0) {
                    let value = 0;
                    const step = Math.ceil(finalValue / 80);
                    const update = () => {
                        value = Math.min(value + step, finalValue);
                        const suffix = text.includes("+") ? "+" : text.includes("/") ? text.replace(/[0-9]/g, "") : "";
                        counter.innerText = value.toLocaleString() + (text.includes("+") ? "+" : "");
                        if (value < finalValue) requestAnimationFrame(update);
                        else counter.innerText = text;
                    };
                    update();
                }
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function showToast(message, type = "success") {
    let toast = document.getElementById("globalToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "globalToast";
        document.body.appendChild(toast);
    }
    toast.className = `toast toast-${type} toast-show`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${message}`;
    setTimeout(() => { toast.classList.remove("toast-show"); }, 4000);
}

const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const msg = document.getElementById("successMessage");
        if (msg) { msg.style.display = "block"; msg.innerHTML = "✅ Your inquiry has been submitted! We will contact you within 24 hours."; }
        showToast("Inquiry submitted successfully!");
        this.reset();
    });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast("Message sent! We'll get back to you soon.");
        this.reset();
    });
}

document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast("You've subscribed to our newsletter!");
        this.reset();
    });
});

const consultationForm = document.getElementById("consultationForm");
if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast("Consultation booked! We will confirm your appointment shortly.");
        this.reset();
    });
}

const applyForm = document.getElementById("applyForm");
if (applyForm) {
    applyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast("Application submitted! Our HR team will review your profile.");
        this.reset();
    });
}

const cvUpload = document.getElementById("cvUpload");
if (cvUpload) {
    cvUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            showToast("CV file must be less than 5MB.", "error");
            this.value = "";
        } else if (file) {
            showToast(`File "${file.name}" selected successfully.`);
        }
    });
}

document.querySelectorAll(".faq-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const content = item.querySelector(".faq-content");
        const icon = btn.querySelector("i");
        const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

        document.querySelectorAll(".faq-content").forEach(c => c.style.maxHeight = null);
        document.querySelectorAll(".faq-btn i").forEach(i => { i.classList.remove("fa-minus"); i.classList.add("fa-plus"); });

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) { icon.classList.remove("fa-plus"); icon.classList.add("fa-minus"); }
        }
    });
});

function filterJobs(category, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".job-card").forEach(job => {
        const cat = job.getAttribute("data-category") || "";
        job.style.display = (category === "all" || cat.includes(category)) ? "block" : "none";
    });
}

function setJobTitle(title) {
    const input = document.getElementById("jobTitle");
    if (input) input.value = title;
    const form = document.getElementById("applyForm");
    if (form) form.scrollIntoView({ behavior: "smooth" });
}

const revealEls = document.querySelectorAll(".card, .testimonial, .ad-card, .resource-card, .find-card, .stat-card, .team-card, .story-card, .service-item, .job-card");
if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => { el.classList.add("reveal-on-scroll"); revealObserver.observe(el); });
}

const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) link.classList.add("active-nav");
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("nav-open");
        hamburger.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            navLinks.classList.remove("nav-open");
            hamburger.classList.remove("open");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove("nav-open");
            hamburger.classList.remove("open");
        }
    });
}

function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");

    if (chatbot.style.display === "none" || chatbot.style.display === "") {
        chatbot.style.display = "block";
    } else {
        chatbot.style.display = "none";
    }
}

function addMessage(message, sender) {
    const messages = document.getElementById("chatMessages");

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-msg " + sender;

    msgDiv.innerHTML = `<div class="msg-bubble">${message}</div>`;

    messages.appendChild(msgDiv);

    messages.scrollTop = messages.scrollHeight;
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
        const reply = generateReply(text);
        addMessage(reply, "bot");
    }, 600);
}

function quickReply(text) {
    document.getElementById("chatInput").value = text;
    sendChat();
}

function chatEnter(event) {
    if (event.key === "Enter") {
        sendChat();
    }
}

function generateReply(text) {

    const msg = text.toLowerCase();

    if (msg.includes("canada pr") || msg.includes("express entry") || msg.includes("pnp")) {
        return "🇨🇦 Canada PR options include Express Entry, PNP programs, and Family Sponsorship. We can evaluate your eligibility and guide you step by step.";
    }

    if (msg.includes("student") || msg.includes("study permit")) {
        return "🎓 Student visa services available for Canada, UK, Australia, and New Zealand. We help with admission, visa filing, and interview preparation.";
    }

    if (msg.includes("work permit") || msg.includes("job visa")) {
        return "💼 Work permits are available based on job offers and eligibility. We can guide you through documentation and employer requirements.";
    }

    if (msg.includes("consultation") || msg.includes("book") || msg.includes("appointment")) {
        return "📅 You can book a free consultation through our contact page. Our team will review your profile and suggest the best pathway.";
    }

    if (msg.includes("refused") || msg.includes("rejected")) {
        return "⚠️ Visa refusal support available. We can analyze your refusal letter and help you reapply with a stronger profile.";
    }

    if (msg.includes("success") || msg.includes("stories") || msg.includes("testimonial")) {
        return "⭐ We have many successful cases for Canada PR, Student Visa, and Work Permits. Would you like to see Student, Work, or PR success stories?";
    }

    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("location")) {
        return "📞 You can contact us via phone, email, or visit our office. Our support team is available 24/7.";
    }

    if (msg.includes("career") || msg.includes("job") || msg.includes("vacancy") || msg.includes("intern")) {
        return "💼 We offer career opportunities, internships, and growth programs. Send your CV for available positions.";
    }

    if (msg.includes("immigration") || msg.includes("visa")) {
        return "🌍 We provide immigration services for Canada, UK, USA, Australia, and New Zealand. Tell me your goal and I’ll guide you.";
    }

    return "Thank you for your message 🙏 Our Ardent team will assist you shortly. Please select a category for faster help.";
}

document.querySelectorAll(".dropdown > a").forEach(item => {
  item.addEventListener("click", function (e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();

      const parent = this.parentElement;
      const menu = parent.querySelector(".dropdown-menu");

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach(m => {
        if (m !== menu) m.classList.remove("open");
      });

      menu.classList.toggle("open");
    }
  });
});

function selectService(service) {
    document.getElementById("service").value = service;
}

window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const country = params.get("country");

    if (country) {
        document.getElementById("country").value = country;
    }

});

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");

    if (country) {
        const select = document.querySelector("select#country");

        if (select) {
            select.value = country;
        }

        const inquiry = document.getElementById("inquiry");

        if (inquiry) {
            setTimeout(() => {
                inquiry.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    }
});

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        showToast("Account Created Successfully!");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    });

}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (
            email === "admin@gmail.com" &&
            password === "123456"
        ) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("role", "admin");

            showToast("Admin Login Successful!");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

            return;
        }

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password
        ) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("role", "user");

            showToast("Login Successful!");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {

            showToast("Invalid Email or Password!", "error");

        }

    });

}

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");

    showToast("Logged Out Successfully!");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

}