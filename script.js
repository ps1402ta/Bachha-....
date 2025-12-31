document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");
    const screens = document.querySelectorAll(".screen");
    const longMessage = `Sun yaar... (Paste your full emotional message here) ... Ly ❤️‍🩹`;

    // --- HELPER: SHOW NEXT SCREEN ---
    window.nextStep = (current) => {
        const currentScreen = document.getElementById(`step${current}`);
        const nextScreen = document.getElementById(`step${current + 1}`);
        if (currentScreen) currentScreen.classList.remove("active");
        if (nextScreen) nextScreen.classList.add("active");
        
        // Trigger specific logic for steps
        if (current + 1 === 5) startTypewriter();
        if (current + 1 === 11) startConfettiLoop();
    };

    // --- STEP 1: UNLOCK & MUSIC ---
    document.getElementById("unlock-btn").addEventListener("click", () => {
        music.play().catch(e => console.log("Music play blocked"));
        nextStep(1); // Go to Countdown
        startCountdown();
    });

    // --- STEP 2: COUNTDOWN LOGIC ---
    function startCountdown() {
        let count = 5;
        const countEl = document.getElementById("count-num");
        const timer = setInterval(() => {
            count--;
            countEl.innerText = count;
            if (count <= 0) {
                clearInterval(timer);
                nextStep(2); // Go to Loader
                setTimeout(() => nextStep(3), 3500); // Wait 3.5s then Go to Greeting
            }
        }, 1000);
    }

    // --- STEP 5: TYPEWRITER STORY ---
    function startTypewriter() {
        const el = document.getElementById("typewriter-text");
        const nextBtn = document.getElementById("m-next");
        let i = 0;
        function type() {
            if (i < longMessage.length) {
                el.innerHTML += longMessage.charAt(i);
                i++;
                el.scrollTop = el.scrollHeight;
                setTimeout(type, 40);
            } else {
                nextBtn.classList.remove("hidden");
            }
        }
        type();
    }

    // --- STEP 7: CAKE INTERACTION ---
    document.getElementById("cake-interactive").addEventListener("click", function() {
        this.classList.add("cake-is-cut");
        document.getElementById("cake-msg").innerText = "Wish Granted! ❤️";
        document.getElementById("cake-next").classList.remove("hidden");
        // Chota confetti blast
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    });

    // --- STEP 8 & 9: GIFT & HEART EXPLOSION ---
    document.getElementById("gift-interactive").addEventListener("click", () => {
        const overlay = document.getElementById("heart-explosion-overlay");
        overlay.classList.add("show");
        
        // Blast dher saare hearts
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.className = "exploding-heart";
                heart.innerHTML = "❤️";
                heart.style.left = Math.random() * 100 + "vw";
                heart.style.top = Math.random() * 100 + "vh";
                heart.style.fontSize = (Math.random() * 50 + 20) + "px";
                overlay.appendChild(heart);
            }, i * 10);
        }

        // Tap overlay to clear and see English Wish (Step 10)
        overlay.addEventListener("click", () => {
            overlay.style.transition = "2s";
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
                nextStep(8); // Go to Step 10 (English Wish)
                // Hum Step 9 overlay tha, skip karke direct 10 pe bhej rahe hain
            }, 1000);
        }, { once: true });
    });

    // --- STEP 11: INFINITE CONFETTI ---
    function startConfettiLoop() {
        const end = Date.now() + (30 * 1000);
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }

    // --- GENERATE STARS (Background) ---
    const starsBox = document.getElementById("stars-box");
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = Math.random() * 3 + "px";
        star.style.height = star.style.width;
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDelay = Math.random() * 2 + "s";
        starsBox.appendChild(star);
    }
});
