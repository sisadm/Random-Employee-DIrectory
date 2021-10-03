let userArray = [];
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const searchContainer = document.querySelector('.search-container');


// fetch

fetch('https://randomuser.me/api/?results=12&nat=gb&name&location')
    .then(response => response.json())
    .then(data => resultPush(data.results))
    .catch((error) => {
        console.error('Error:', error);
    });



// Functions

function addSearch() {
    searchContainer.innerHTML = `
        <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;
}

// create modal and add to the page

function modalPart() {
    let modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');
    modalDiv.setAttribute('style', 'display: none');
    modalDiv.innerHTML = `
        <div id='outsideArrowL'>
            <div class='leftArrow'></div>
        </div>
        <div id='outsideArrowR'>
            <div class='rightArrow'></div>
        </div>
        <div class='modal'>
            <div id='insideArrowL'>
                <div class='leftArrow'></div>
            </div>
            <div id='insideArrowR'>
                <div class='rightArrow'></div>
            </div>
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
addSearch();

// display clicked card to modal

function modalDisplay(id) {
    let modalDivSelect = document.querySelector('.modal-container');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const modalName = document.querySelector('.modal-name');
    const modalEmail = document.querySelector('#email');
    const modalCity = document.querySelector('#city');
    const modalTel = document.querySelector('#tel');
    const modalLoc = document.querySelector('#location');
    const modalBday = document.querySelector('#bday');
    const arrayElement = userArray[id];

    modalDivSelect.style.display = 'block';
    modal.removeAttribute('id');
    modal.setAttribute('id', id);
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

body.addEventListener('click', e => {

    // Open card to pop up as modal
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

    // Modal button interactions
    if(e.target.classList == 'modal-close-btn' || e.target.nodeName == 'STRONG' ||
        e.target.classList == 'modal-container') {
        document.querySelector('.modal-container').style.display = 'none';
    }

    // arrow move to left 

    if(e.target.getAttribute('id') == 'outsideArrowL' || 
        e.target.getAttribute('id') == 'insideArrowL' ||
        e.target.classList == 'leftArrow'){
        let modalNumber = document.querySelector('.modal').getAttribute('id');
        if(modalNumber == 0) {
            modalDisplay(userArray.length - 1);
        } else {
            modalDisplay(modalNumber - 1);
        }
    }

    // arrow move to right

    if(e.target.getAttribute('id') == 'outsideArrowR' || 
        e.target.getAttribute('id') == 'insideArrowR' ||
        e.target.classList == 'rightArrow'){
        let modalNumber = document.querySelector('.modal').getAttribute('id');
        console.log(modalNumber)
        if(modalNumber == userArray.length - 1) {
            modalDisplay(userArray.length - userArray.length);
        } else {
            modalDisplay(parseInt(modalNumber) + 1);
        }
    }
});






