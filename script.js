// Smooth scrolling
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll animations for services and portfolio
function revealOnScroll() {
    const cards = document.querySelectorAll('.card');
    const items = document.querySelectorAll('.portfolio-item');
    const windowBottom = window.innerHeight;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < windowBottom - 50) card.classList.add('visible');
    });
    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if(itemTop < windowBottom - 50) item.classList.add('visible');
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Contact form submit to Google Sheets
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };

    fetch("https://script.google.com/macros/s/AKfycbxEnk1hWEkdRT4NSmEYps8V-BvaPXOH1Mt_7bV76_vRyMYAtLBK7CDBaCVfm0SHpOUs6g/exec", { // Replace with your Apps Script URL
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        formMessage.textContent = "Thank you! We have received your message and shall communicate back soon.";
        formMessage.style.display = "block";
        contactForm.reset();
        setTimeout(() => formMessage.style.display = "none", 7000);
    })
});
// ==============================
// DYNAMIC YOUTUBE VIDEO GALLERY
// ==============================
const videos = [
    {
    id: "4jc0OxfdOAg",
    title: "I STILL RISE ",
    thumbnail: "https://img.youtube.com/vi/4jc0OxfdOAg/hqdefault.jpg"
},
{
    id: "18_a0mzKXUY",
    title: "SMARTFIX STUDIO THEME SONG - Official",
    thumbnail: "https://img.youtube.com/vi/18_a0mzKXUY/hqdefault.jpg"
},
    {
        id: "ePIaOESAD5A",
        title: "THROUGH THE SILENCE -",
        thumbnail: "https://img.youtube.com/vi/ePIaOESAD5A/hqdefault.jpg"
    },
    {
        id: "VIDEO_ID_3",
        title: "SmartFix Studio Song 3",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_3/hqdefault.jpg"
    }
];

const gallery = document.querySelector('.video-gallery');

videos.forEach(video => {
    const card = document.createElement('div');
    card.classList.add('video-card');

    card.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}">
        <h3>${video.title}</h3>
    `;

    card.addEventListener('click', () => {
        window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
    });

    gallery.appendChild(card);
});
