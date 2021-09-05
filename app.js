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
            <img class='card-img' src=${data.pictures} alt='profile picture'>
        </div>
        <div class='card-info-container'>
            <h3 id='name' class='card-name'>${data.name}</h3>
            <p class='card-text'>${data.email}</p>
            <p class='card-text cap'>${data.location.city}, ${data.location.state}</p>
        </div>     
        `;

    return div;        
}


function resultPush(data) {
    for(let i = 0; i < data.length; i++) {
        let Newdata = data[i];
        userArray.push({name: `${Newdata.name.first} ${Newdata.name.last}`,
                        email: `${Newdata.email}`,
                        pictures:  `${Newdata.picture.medium}`,
                        location: {
                                    city: `${Newdata.location.city}`,
                                    country: `${Newdata.location.country}`,
                                    postcode: `${Newdata.location.postcode}`,
                                    state: `${Newdata.location.state}`,
                                    street: `${Newdata.location.street.number} ${Newdata.location.street.name}`
                                    },
                        phone: `${Newdata.phone}`,
                        bday: `${Newdata.dob.date}`
                        });
    }

galleryDisplay(userArray);
}




// fetch

fetch('https://randomuser.me/api/?results=12&nat=gb&name&location')
    .then(response => response.json())
    .then(data => resultPush(data.results))
