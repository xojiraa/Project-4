const btn = document.getElementById("theme-toggle");

function getCurrentTheme(){
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme){ return savedTheme; }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}


document.body.setAttribute('data-theme', getCurrentTheme());

btn.addEventListener("click", () => {
const current = document.body.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';

document.body.setAttribute('data-theme', next);
localStorage.setItem("theme", next);

});

function openlightbox(imageSrc, description) {
        document.getElementById('lightboxImage').src = imageSrc;

        const descriptionElement = document.getElementById('lightboxDescription');
        if(description){
            descriptionElement.innerText = description;
        }
        else {
            descriptionElement.innerText = '';
        }
    
}