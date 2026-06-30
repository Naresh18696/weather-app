// ========================================
// AI Weather Assistant
// script.js
// ========================================

// ---------- Elements ----------

const darkBtn = document.getElementById("darkMode");

const body = document.body;

const loader = document.querySelector(".loader");

const form = document.querySelector(".search-box");

const input = document.querySelector("input[name='city']");

const bgDiv = document.querySelector('.background'); // Your background div
// ========================================
// Dark Mode
// ========================================

const theme = localStorage.getItem("theme");

if (theme === "dark") {

    body.classList.add("dark");
  bgDiv.classList.add('dark-bg');

    darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

darkBtn.addEventListener("click", () => {

    body.classList.toggle("dark");
    //  bgDiv.classList.toggle('background');
  bgDiv.classList.toggle('dark-bg');

    if (body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        darkBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        darkBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});

// ========================================
// Loader
// ========================================

window.addEventListener("load", () => {

    loader.classList.add("hidden");

});


// ========================================
// Search Validation
// ========================================

form.addEventListener("submit", (e) => {

    const city = input.value.trim();

    if (city.length === 0) {

        e.preventDefault();

        showToast("Please enter a city name.");

        return;

    }

    loader.classList.remove("hidden");

});

// ========================================
// Press Enter
// ========================================

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        loader.classList.remove("hidden");

    }

});

// ========================================
// Card Animation
// ========================================

const cards = document.querySelectorAll(".glass");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

        card.style.transition = ".3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ========================================
// Toast Notification
// ========================================

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

// ========================================
// Auto Hide Toast
// ========================================

window.showToast = showToast;

// ========================================
// Weather Card Animation
// ========================================

const weatherCard = document.querySelector(".weather-card");

if (weatherCard) {

    weatherCard.animate(

        [

            {

                opacity: 0,

                transform: "translateY(30px)"

            },

            {

                opacity: 1,

                transform: "translateY(0)"

            }

        ],

        {

            duration: 700

        }

    );

}

// ========================================
// Scroll Reveal
// ========================================

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},

{

threshold:.2

}

);

document.querySelectorAll(".glass").forEach(el=>{

observer.observe(el);

});

// ========================================
// Current Year
// ========================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

// ========================================
// Background Animation
// ========================================

document.addEventListener("mousemove",(e)=>{

const x=e.clientX/window.innerWidth;

const y=e.clientY/window.innerHeight;

document.querySelector(".background").style.transform=`translate(${x*10}px,${y*10}px)`;

});

// ========================================
// Network Error Example
// ========================================

window.addEventListener("offline",()=>{

showToast("No Internet Connection");

});

window.addEventListener("online",()=>{

showToast("Connected");

});