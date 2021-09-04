let userArray = [];
const gallery = document.querySelector('#gallery');


// create functions which display the API results

function galleryDisplay(data) {
    for(let i = 0; i < data.length; i++) {
        gallery.append(cardDisplay(data[i]));
    }
}


function cardDisplay(data) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class='card-img-container'>
            <img class='card-img' src=${data.picture.medium} alt='profile picture'>
        </div>
        <div class='card-info-container'>
            <h3 id='name' class='card-name'>${data.name.first} ${data.name.second}</h3>
            <p class='card-text'>${data.email}</p>
            <p class='card-text cap'>${data.location.city}, ${data.location.state}</p>
        </div>     
        `;

    return div;        
}


function resultPush(data) {
    for(const element of data) {
        userArray.push(element);
    }

    galleryDisplay(userArray);
}




// fetch

fetch('https://randomuser.me/api/?results=12&nat=gb&name&location')
    .then(response => response.json())
    .then(data => resultPush(data.results))
