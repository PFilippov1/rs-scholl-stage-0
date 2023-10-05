// import '/env.js';
// const secretKey = window.env.SECRET_KEY;
// const apiKey = window.env.API_KEY;
// ===========================================

const API_KEY = '4j0m0uONoxaib1uyfP6BtI6WWRcC13mCtYCcI-WthZE'
const url = 'https://api.unsplash.com/search/photos?per_page=30&query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo'

const galleryContainer = document.querySelector('.wrapper');
const inputId = document.querySelector('#input');
const inputIcon = document.querySelector('.input__icon')

//start page with onfocus()
inputIcon.innerHTML = '🔎'

function handleInput() {
  if (inputId.value.length > 0) {
    inputIcon.innerHTML = '&#9986';
  } else {
    inputIcon.innerHTML = '🔎';
  }
};
inputId.addEventListener("input", handleInput);


// cut the input value
inputIcon.addEventListener('click', (elem) => {
  console.log(elem.target)
  if (inputIcon.innerHTML == '✂') {
    inputId.value = '';
    inputIcon.innerHTML = '🔎';
    inputId.focus();
  }
});



async function getDataStart() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showImage(data)
}
getDataStart();


inputId.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const inputValue = inputId.value
    const urlAPI = `https://api.unsplash.com/search/photos?per_page=50&query=${inputValue}&orientation=landscape&client_id=${API_KEY}`
    getData(urlAPI);
  }
});



async function getData(urlUserAPI) {
  galleryContainer.innerHTML = ''; //clear data, without it elements will be add to the container 
  const res = await fetch(urlUserAPI);
  const data = await res.json();
  console.log(data);
  showImage(data)
}




async function showImage(apiData) {
  if (!apiData || !apiData.results) {
    return;

  } else if (apiData.results.length === 0) {
    galleryContainer.textContent = 'No match Images'
  }

  apiData.results.forEach((apiData) => {
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = apiData.urls.regular;
    img.alt = `image`;
    galleryContainer.append(img);
  });
}


// ==========================

// create modal
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// show modal with img
function showModal(imgSrc) {
  const modalImg = document.createElement('img');
  modalImg.src = imgSrc;
  modalImg.alt = 'modal-image';
  modalImg.classList.add('modal__img');
  modal.appendChild(modalImg);
  galleryContainer.removeEventListener('click', imgClickHandler);
  modal.style.display = 'block';
}

// hide modal  
function hideModal() {
  // delete data from modal   
  modal.innerHTML = '';

  galleryContainer.addEventListener('click', imgClickHandler);

  modal.style.display = 'none';
}

function imgClickHandler(elem) {
  if (elem.target.classList.contains('img')) {
    const imgSrc = elem.target.src;
    showModal(imgSrc);
  }
}

galleryContainer.addEventListener('click', imgClickHandler);

// modal click
modal.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal__img')) {
    hideModal();
  }
});

modal.addEventListener('click', (e) => {
  // check click modal or window
  // console.log(e.target)
  if (e.target === document.querySelector('.modal') || e.target.closest('.modal')) {
    hideModal();
  }
});

