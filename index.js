let aboutDisplayed = false;

const divPortfolioResults = document.getElementById('project-portfolio');
const divContact = document.getElementById('contact-form');

function updateLikes (pLikes, projectId) {

    let projectLikeCount = parseInt(pLikes.innerText)

    fetch(`http://localhost:3000/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
        },
            body: JSON.stringify(
                {
                    "likes": projectLikeCount += 1
                }
            )
        })
        .then(response => response.json())
        .then((data) => {
            pLikes.innerText = `${data.likes} likes`;
            console.log(projectLikeCount);
        });
};

function renderProjectCard(project) {
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
    const pIndustry = document.createElement('p')
    pIndustry.setAttribute('id', project.industry)
    pIndustry.innerText = `Industry: ${project.industry}`
    const pLikes = document.createElement('p')
    pLikes.innerText = `${project.likes} likes      `
    const likeButton = document.createElement('button')
    likeButton.setAttribute('class','like-btn')
    likeButton.setAttribute('id', project.id)
    likeButton.innerText = '❤️'
    likeButton.addEventListener('click', ( )=> updateLikes(pLikes, project.id))
    divPortfolioResults.appendChild(divCard);
    divCard.append(h2, img, pDescription, pIndustry, likeButton, pLikes);
}


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

    //filter and display projects
    fetch('http://localhost:3000/projects')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        data.forEach(project => {
            //create elements to dynamically display projects
            renderProjectCard(project)
        })
    })

})



const select = document.querySelector('#industry-menu');

select.addEventListener('change', filterProjects);

function filterProjects () {
    let filterValue = select.value;
    const filterdProjects = document.querySelectorAll('.card').forEach(project => {
        project.innerText.includes(`${filterValue}`)
        ? project.style.display = ''
        : project.style.display = 'none';
    })
}

divContact.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch ("http://localhost:3000/messages/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify (
            {
                "name": name,
                "email": email,
                "message": message
            }
    )
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Thanks for submitting your message! I am busy coding so I might not get back to you for a while. Appreciate your patience.");
    })
    .catch(error => {
        // Handle errors
        console.error("Error:", error);
    });
});




            
            



