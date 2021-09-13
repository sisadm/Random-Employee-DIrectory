let userArray = [];
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');




// Functions

// create modal and add to the page

function modalPart() {
    let modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');
    modalDiv.setAttribute('style', 'display: none');
    modalDiv.innerHTML = `
        <div class='modal'>
            <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
            <div class='modal-info-container'>
                <img class="modal-img" src="" alt="profile picture">
                <h3 id="name" class="modal-name cap"></h3>
                <p class="modal-text" id='email'>l</p>
                <p class="modal-text cap" id='city'></p>
                <hr>
                <p class="modal-text" id='tel'></p>
                <p class="modal-text" id='location'></p>
                <p class="modal-text" id='bday'></p>
            </div>
        </div>
    `;
    insertAfter(gallery, modalDiv);
}

// insert element after.
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }



// create functions which display the API results

function galleryDisplay(data) {
    for(let i = 0; i < data.length; i++) {
        gallery.append(cardDisplay(data[i], i));
    }
}

function cardDisplay(data, num) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('id', num);
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

// create object value of array 

function resultPush(data) {
    for(let i = 0; i < data.length; i++) {
        let Newdata = data[i];
        userArray.push({name: `${Newdata.name.first} ${Newdata.name.last}`,
                        email: `${Newdata.email}`,
                        pictures:  `${Newdata.picture.large}`,
                        location: {
                                    city: `${Newdata.location.city}`,
                                    country: `${Newdata.location.country}`,
                                    postcode: `${Newdata.location.postcode}`,
                                    state: `${Newdata.location.state}`,
                                    street: `${Newdata.location.street.number} ${Newdata.location.street.name}`
                                    },
                        phone: `${Newdata.phone}`,
                        bday: `${Newdata.dob.date}`,
                        display: `true`
                        });
    }

galleryDisplay(userArray);
}

// function calls

modalPart();

// display clicked card to modal

function modalDisplay(id) {
    const modalDivSelect = document.querySelector('.modal-container');
    const modalImg = document.querySelector('.modal-img');
    const modalName = document.querySelector('.modal-name');
    const modalEmail = document.querySelector('#email');
    const modalCity = document.querySelector('#city');
    const modalTel = document.querySelector('#tel');
    const modalLoc = document.querySelector('#location');
    const modalBday = document.querySelector('#bday');
    const arrayElement = userArray[id];

    modalDivSelect.style.display = 'block';
    modalImg.setAttribute('src', `${arrayElement.pictures}`);
    modalName.innerHTML = arrayElement.name;
    modalEmail.innerHTML = arrayElement.email;
    modalCity.innerHTML = arrayElement.location.city;
    modalTel.innerHTML = arrayElement.phone;
    modalLoc.innerHTML = `${arrayElement.location.street}, 
                            ${arrayElement.location.state}, ${arrayElement.location.country}, 
                            ${arrayElement.location.postcode}`;
    modalBday.innerHTML = arrayElement.bday;
}





// event listener 

gallery.addEventListener('click', e => {
    if(e.target.classList == 'card' || e.target.classList == 'card-img' ||
        e.target.classList == 'card-img-container' || e.target.classList == 'card-info-container' ||
        e.target.classList == 'card-text' || e.target.classList == 'card-name' ) 
        {

            if(e.target.classList == 'card-img' || e.target.classList == 'card-text' ||
                e.target.classList == 'card-name') {

                modalDisplay(e.target.parentNode.parentNode.getAttribute('id'))

            } else if(e.target.classList == 'card-img-container' || e.target.classList == 'card-info-container') {

                modalDisplay(e.target.parentNode.getAttribute('id'))

            } else {
                modalDisplay(e.target.getAttribute('id'));
            }
        

    }
});






// fetch

fetch('https://randomuser.me/api/?results=12&nat=gb&name&location')
    .then(response => response.json())
    .then(data => resultPush(data.results))
    .catch((error) => {
        console.error('Error:', error)});