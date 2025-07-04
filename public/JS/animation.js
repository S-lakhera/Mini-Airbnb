let tl = gsap.timeline();

tl.from(".navbar", {
    y: -50,
    duration: 0.25,
    delay: 0.15,
    opacity: 0
});

tl.from(".fa-compass-drafting", {
    y: -50,
    duration: 0.15,
    opacity: 0
});

tl.from(".navbar-nav a", {
    y: -80,
    duration: 0.35,
    stagger: 0.2,
    opacity: 0
});

// 🔍 Animate search input boxes
tl.from([".search-inp", ".search-inp-2", ".search-btn", ".search-btn-2"], {
    scale: 0.9,
    opacity: 0,
    duration: 0.4,
    // stagger: 0.1,
    ease: "back.out(1.7)"
});

// 🌙 Animate theme toggle icon
tl.from("#dark-mode-icon", {
    y: -40,
    opacity: 0,
    rotate: 180,
    duration: 0.5,
    ease: "power2.out"
});


tl.from("#card", {
    duration: 0.5,
    opacity: 0
})

// Page entrance animation
gsap.from(".form-container", {
    y: -50,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
});

// Animate step transitions
const formSteps = document.querySelectorAll(".form-step");
const progressDots = document.querySelectorAll(".progress-step");

function animateStepIn(index) {
    gsap.fromTo(formSteps[index],
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
}

function animateProgress(index) {
    gsap.fromTo(progressDots[index],
        { scale: 0.7, opacity: 0.5 },
        { scale: 1.1, opacity: 1, duration: 0.3, ease: "back.out(2)", yoyo: true });
}

let currentStep = 0;

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        steps[currentStep].classList.remove("active");
        progressSteps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
        progressSteps[currentStep].classList.add("active");

        animateStepIn(currentStep);
        animateProgress(currentStep);
    });
});

backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        steps[currentStep].classList.remove("active");
        progressSteps[currentStep].classList.remove("active");
        currentStep--;
        steps[currentStep].classList.add("active");
        progressSteps[currentStep].classList.add("active");

        animateStepIn(currentStep);
        animateProgress(currentStep);
    });
});

