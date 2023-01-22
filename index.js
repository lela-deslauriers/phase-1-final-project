let aboutDisplayed = false;
function filterData(data, key, value) {
    return data.filter(item => item[key] === value);
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


    fetch('http://localhost:3000/projects')

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const divPortfolio = document.getElementById('project-portfolio');
        const select = document.querySelector('#industry-menu');
        console.log(document.querySelector('#industry-menu'));
        const optionSaaS = document.querySelector('#SaaS');
        console.log(optionSaaS.value);
        const optionEdTech = document.querySelector('#Ed-Tech');
        console.log(optionEdTech.value);

        select.addEventListener('click', function(event) {
            console.log(event.target.value)
            const filteredProjects = filterData(data, "industry", event.target.value);
            console.log(filteredProjects);

            })

        //select industry option from menu and filter project data accordingly. can I create a variable and assign the value of the option, and then intropolate the variable to the fetch URL? Then using the selected results, display only those projects. 

        // options.forEach((option) => {
        //     option.addEventListener("click", () => {
        //         select.querySelector()
        //     })
        // })


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
            likeButton.innerText = '❤️'
            divPortfolio.appendChild(divCard);
            divCard.appendChild(h2);
            divCard.appendChild(img);
            divCard.appendChild(pDescription);
            divCard.appendChild(likeButton);
            divCard.appendChild(pLikes);
        });
        
    });


});

//CONTACT FORM
// Need to write code to get input values and post them to db
// fetch ("http://localhost:3000/messages/", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
//     body: JSON.stringify (
            // {
            //     "name": name,
            //     "email": email,
            //     "message": message
            // }
//     )
// })
// .then(response => response.json())
// .then(data => {
    //console.log(data)
    //document.querySelector('#contact-form').value = ""

//})