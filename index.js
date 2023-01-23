let aboutDisplayed = false;
let clickMenu = false;
const divContact = document.getElementById('contact-form');


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
        const select = document.querySelector('#industry-menu');
        const divPortfolioResults = document.getElementById('project-portfolio');

        select.addEventListener('change', event => {

            const selectedOption = event.target.value;
            const filteredProjects = filterData(data, "industry", selectedOption);
            
            function filterData(data, key, value) {
                return data.filter(item => item[key] === value);
            }

            function displayProjects(data) {
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
                    likeButton.innerText = '❤️'
                    divPortfolioResults.appendChild(divCard);
                    divCard.appendChild(h2);
                    divCard.appendChild(img);
                    divCard.appendChild(pDescription);
                    divCard.appendChild(likeButton);
                    divCard.appendChild(pLikes);
                });
            }
            
            displayProjects(filteredProjects);

        });



    })

    divPortfolio.addEventListener('click', event => {
        event.preventDefault()

        let projectId = event.target.id;
        let projectLikeCount = parseInt(event.target.nextElementSibling.innerText)

        fetch(`http://localhost:3000/projects/${projectId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
        },
        body: JSON.stringify(
            {
                "likes": projectLikeCount += 1
            }
        )
        })
        .then(response => response.json())
        .then(likes => console.log(likes))
    })

});


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
        alert("Thanks for submitting your message! I am busy coding so I might not get back to you for a while. Appreciate your patience.");
    })
    .catch(error => {
        // Handle errors
        console.error("Error:", error);
    });
});
