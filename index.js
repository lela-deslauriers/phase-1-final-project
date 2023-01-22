let aboutDisplayed = false;

document.addEventListener("DOMContentLoaded", () => {
    const aboutButton = document.querySelector('#about-me-btn');
    const aboutContainer = document.querySelector('.container');
    
    //about hide & seek
    aboutButton.addEventListener('click', () => {
        aboutDisplayed = !aboutDisplayed;
        if (aboutDisplayed) {
            aboutContainer.style.display = "block";
        } else {
            aboutContainer.style.display = "none";
        }
    });

    console.log(document.getElementById('project-portfolio'));


    fetch('http://localhost:3000/projects')

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const divPortfolio = document.getElementById('project-portfolio');
        const projectPortfolio = [];

        console.log(data);
        data.forEach(project => {
            //dynamically display projects
            const divCard = document.createElement('div')
            divCard.setAttribute('class', 'card')
            divCard.setAttribute('id', project.name)
            const h2 = document.createElement('h2')
            h2.innerText = project.name
            const img = document.createElement('img')
            img.src = project.image
            img.setAttribute('class', 'project-image')
            const pDescription = document.createElement('p')
            pDescription.innerText = project.description
            const pLikes = document.createElement('p')
            pLikes.innerText = `${project.likes} likes      `
            const likeButton = document.createElement('button')
            likeButton.setAttribute('class','like-btn')
            likeButton.setAttribute('id', project.id)
            likeButton.innerText = 'Like ❤️'
            divPortfolio.appendChild(divCard);
            divCard.appendChild(h2);
            divCard.appendChild(img);
            divCard.appendChild(pDescription);
            divCard.appendChild(pLikes);
            pLikes.appendChild(likeButton);
        });
        
    });


});
