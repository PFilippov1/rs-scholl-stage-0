
'use strict';
const hamburgerMenu = document.querySelector('.hamburger-menu');
const tabletNavMenu = document.querySelector('.tablet__nav__menu');
const navItemTablet = document.querySelectorAll('.nav__item__tablet');

hamburgerMenu.addEventListener('click', () => {
  tabletNavMenu.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const isClickInside = tabletNavMenu.contains(event.target) || hamburgerMenu.contains(event.target);

  if (!isClickInside) {
    tabletNavMenu.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  }
});

navItemTablet.forEach((item) => {
  item.addEventListener('click', () => {
    tabletNavMenu.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  });
});

//------------------------//


// Slider//

const sliderLine = document.querySelector('.slider-line');
const prevButton = document.querySelector('.left-arrow');
const nextButton = document.querySelector('.right-arrow');
const dots = document.querySelectorAll('.circle');

let position = 0;
let dotIndex = 0;
//functions for slider movement//

const nextSlide = () => {
  if (position < (dots.length - 1) * 475) {
    position += 475;
    dotIndex++
    nextButton.style.opacity = 1; // Show nextButton
  } else {
    position = (dots.length - 1) * 475;
    dotIndex = (dots.length - 1);
    nextButton.style.opacity = 0; // Hide nextButton
  }
  sliderLine.style.left = -position + 'px';
  thisSlide(dotIndex);

  if (position > 0) {
    prevButton.style.opacity = 1; // Show prevButton
  }
  thisSlide(dotIndex);

  // change opacity of nextButton
  if (position >= (dots.length - 1) * 475) {
    nextButton.style.opacity = 0;
  }
}

const prevSlide = () => {
  if (position > 0) {
    position -= 475;
    dotIndex--
    prevButton.style.opacity = 1; // Show prevButton
  } else {
    position = 0;
    dotIndex = 0
    prevButton.style.opacity = 0; // Hide prevButton
  }
  sliderLine.style.left = -position + 'px';
  thisSlide(dotIndex);

  if (position < (dots.length - 1) * 475) {
    nextButton.style.opacity = 1; // Show nextButton
  }
  thisSlide(dotIndex);
  // change opacity of prevButton
  if (position <= 0) {
    prevButton.style.opacity = 0;
  }
}
const thisSlide = (index) => {
  for (let dot of dots) {
    dot.classList.remove('active')
  }
  dots[index].classList.add('active')
}

//event listeners
nextButton.addEventListener('click', nextSlide)
prevButton.addEventListener('click', prevSlide)

//dots slider

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    position = 475 * index
    sliderLine.style.left = -position + 'px'
    dotIndex = index
    thisSlide(dotIndex)
  })
})



// -------------------------//

//section about: tabs for radio buttons
const allBooksWrapper = document.querySelector('.favorites-items');
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItems = document.querySelectorAll('.tabs__item');

tabsBtn.forEach((item) => {
  item.addEventListener('click', () => {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute('data-tab')
    let currentTab = document.querySelector(tabId)


    tabsBtn.forEach((item) => {
      item.classList.remove('active');
    });

    tabsItems.forEach((item) => {
      item.classList.remove('active');
    });

    currentBtn.classList.add('active');
    currentTab.classList.add('active');


    // Add the fade-out effect better effect

    // Check if the fade class is already present
    if (allBooksWrapper.classList.contains('fade')) {
      // Remove the fade class and add it back after a short delay
      allBooksWrapper.classList.remove('fade');
      setTimeout(() => {
        allBooksWrapper.classList.add('fade');
      }, 2000);
    } else {
      setTimeout(() => {
        allBooksWrapper.classList.add('fade');
      }, 10);
    }
  });
});

// Add the fade-in effect when the fade class is added back
allBooksWrapper.addEventListener('transitionend', () => {
  allBooksWrapper.classList.remove('fade');
});




// ---------------modals-----------

// -------------user icon click and appeared menu login/register

const profileIcon = document.querySelector('.profile-icon');
const dropMenuNoAuth = document.querySelector('.drop-menu__no-authorization');
const dropMenuWithAuth = document.querySelector('.drop-menu__with-authorization');
const profileIconAuthorized = document.querySelector('.profile-icon__authorized')
const textIconAuthorized = document.querySelector('.text-icon__authorized')

profileIcon.addEventListener('click', () => {
  dropMenuNoAuth.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.drop-menu__no-authorization') && !event.target.closest('.profile-icon')) {
    dropMenuNoAuth.classList.remove('active');
  }
});

profileIconAuthorized.addEventListener('click', () => {
  dropMenuWithAuth.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.drop-menu__with-authorization') && !event.target.closest('.profile-icon__authorized')) {
    dropMenuWithAuth.classList.remove('active');
  }
});



const toMyProfile = document.querySelector('.drop-menu__my-profile');
toMyProfile.addEventListener('click', () => {
  modalProfile.style.display = 'block'
})

const buttonToMyProfile = document.querySelector('.button-to-profile');
buttonToMyProfile.addEventListener('click', () => {
  modalProfile.style.display = 'block'
})



// ------- open login
const dropMenuLogin = document.querySelector('.drop-menu__login');
dropMenuLogin.addEventListener('click', (elem) => {
  modalLogin.style.display = "block";
});


const toRegister = document.querySelector('.to-register-form');
toRegister.addEventListener('click', (elem) => {
  modalLogin.style.display = 'none'
  modalRegister.style.display = "block"
});



// ------- open register
const dropMenuRegister = document.querySelector('.drop-menu__register');
const modalRegister = document.querySelector('.modal__register');
dropMenuRegister.addEventListener('click', (elem) => {
  modalRegister.style.display = "block"
})

const toLogin = document.querySelector('.to-login-form');
toLogin.addEventListener('click', (elem) => {
  modalRegister.style.display = 'none'
  modalLogin.style.display = 'block'
});

// ------------close modal windows


const closeModalBtn = document.querySelector('.close-modal-btn>img');
const modalLogin = document.querySelector('.modal__login');
const modalProfile = document.querySelector('.modal__profile');
const buyCard = document.querySelector('.modal__buy-library-card');


document.addEventListener('click', (event) => {
  console.log(event.target);
  if (event.target.classList.contains('modal__login')) {
    modalLogin.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__register')) {
    modalRegister.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__profile')) {
    modalProfile.style.display = 'none';
  }
});


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__buy-library-card')) {
    buyCard.style.display = 'none';
  }
});
// ------------------------------



// ---close all modal buttons----
const closeModalBtnAll = document.querySelectorAll('.close-modal-btn>img');
closeModalBtnAll.forEach((element) => {
  element.addEventListener('click', () => {
    modalRegister.style.display = 'none';
    modalLogin.style.display = 'none';
    modalProfile.style.display = 'none';
    buyCard.style.display = 'none';
  });
});

// -----button -sign-up
const signUpButton = document.querySelector('.sign-up');
const logInButton = document.querySelector('.log-in');

signUpButton.addEventListener('click', (event) => {
  modalRegister.style.display = 'block'
})

logInButton.addEventListener('click', (event) => {
  modalLogin.style.display = 'block'
})
// -----------button before login-------
const buttonBook = document.querySelectorAll('.button');

function showModalLogin() {
  modalLogin.style.display = 'block';
}
if (localStorage.getItem('isAuth') !== 'true') {
  buttonBook.forEach((element) => {
    element.addEventListener('click', showModalLogin);
  });
} else {
  buttonBook.forEach((elem) => {
    elem.removeEventListener('click', showModalLogin);
  });
  modalLogin.style.display = 'none';
}





// ---------------sticky code--------


const radioWrapper = document.querySelector('.radio-wrapper');

window.addEventListener('scroll', function () {
  if (radioWrapper.getBoundingClientRect().top <= 0) {
    radioWrapper.classList.add('sticky');
  } else {
    radioWrapper.classList.remove('sticky');
  }
});



// ---------------logic storage
const fieldInitials = document.querySelector('.user-name__first-letters')
const userNameSurname = document.querySelector('.profile-user-name')
const profileCardNumber = document.querySelector('.prifile-card-number')
const visits = document.querySelectorAll('.visits');
const books = document.querySelectorAll('.books');
const showInfoUser = document.querySelector('.show-info-registrated-user');
const libraryCardAfterRegistrationAndAuth = document.querySelector('.digital-library-card__after-registration')
const libraryCardBeforeRegistrationAndAuth = document.querySelector('.library-card__wrapper')
const formLibraryCard = document.querySelector('#library-card-form');
const cardFormAfterRegistrationName = document.querySelector('.holder-name');
const cardFormAfterRegistrationCard = document.querySelector('.holder-card');
const bookInput = document.querySelector('.book-input')
const loginForm = document.querySelector('.login__form')
const emailOrCardInput = loginForm.querySelector('#email-or-card')
const loginPassword = loginForm.querySelector('#password')
const dropMenuProfileText = document.querySelector('.profile-icon__authorized .drop-menu-profile')





// ------------registration of new user

const findIsAuthUser = function () {
  let authUser = null;
  const usersData = JSON.parse(localStorage.getItem('users')) || [];

  for (const user of usersData) {
    if (user.isAuth === true) {
      authUser = user;
      break;
    }
  }

  return authUser;
};
const user = findIsAuthUser();





let userData = {};
let numberOfEnter = 1
let usersData = JSON.parse(localStorage.getItem('users')) || [];
const registerForm = document.querySelector('.register__form');

const firstName = registerForm.querySelector('#firstname');
firstName.addEventListener('input', (event) => {
  userData.firstName = event.target.value;
});

const lastName = registerForm.querySelector('#lastname');
lastName.addEventListener('input', (event) => {
  userData.lastName = event.target.value;
});
// -----------validation email
const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
email.addEventListener('blur', (event) => {
  const emailValue = event.target.value;
  if (emailRegex.test(emailValue)) {
    userData.email = emailValue;
  } else {
    // Если email не проходит проверку, очищаем поле
    alert('incorrect email type, please check it')
    event.target.value = '';
  }
});

const password = registerForm.querySelector('#pass');
password.addEventListener('input', (event) => {
  userData.password = event.target.value;
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Остановить отправку формы

  // Проверить, что такой пользователь еще не зарегистрирован
  const emailExists = usersData.some(user => user.email === userData.email);
  if (emailExists) {
    alert('User with such email already exists');
    return;
  }

  userData['isAuth'] = true;
  userData['isSubscriptionBuy'] = false;
  userData['userBooks'] = [];
  userData['NumberOfEnter'] = numberOfEnter;
  userData['cardNumber'] = generateRandomCardNumber();


  const nameSurname = userData.firstName + ' ' + userData.lastName
  console.log(nameSurname)
  const firstLettersOfInput = (userData.firstName[0] + userData.lastName[0]).toUpperCase();

  userData['initials'] = firstLettersOfInput;

  const NumberOfCard = userData['cardNumber']
  console.log(NumberOfCard + ' ' + 'this number')

  // Добавить новый объект userData в массив usersData
  usersData.push(userData);

  // Сохранить массив usersData в Local Storage
  localStorage.setItem('users', JSON.stringify(usersData));

  // Проверить, что данные были сохранены
  console.log(localStorage.getItem('users'));

  // Очистить объект userData
  userData = {};

  // Очистить поля формы
  registerForm.reset();
  modalRegister.style.display = 'none'


  localStorage.setItem('isAuth', true);

  // changeLogoAfterRegistration(firstLettersOfInput, profileIconAuthorized, textIconAuthorized, dropMenuProfileText, NumberOfCard)
  // titleAuthorizedUser(profileIconAuthorized, nameSurname)

  // const lastUser = usersData.pop();

  // addUserFieldsWithoutTimeOut(lastUser, visits, books)
  // profileInformation(lastUser, fieldInitials, userNameSurname, profileCardNumber)
  // addUserFieldsWithoutTimeOut(lastUser, visits, books)
  window.location.reload();
});



if (localStorage.getItem('isAuth') == 'true') {

  profileInformation(user, fieldInitials, userNameSurname, profileCardNumber)
  changeLogoAfterRegistration(user.initials, profileIconAuthorized, textIconAuthorized, dropMenuProfileText, user.cardNumber);
  titleAuthorizedUser(profileIconAuthorized, user.firstName + ' ' + user.lastName)
  addUserFieldsWithoutTimeOut(user, visits, books, cardFormAfterRegistrationName, cardFormAfterRegistrationCard)
  bookContentTextField(user, bookInput)
}else {
  console.log('user not authorized')
}





function changeLogoAfterRegistration(fieldValues, IconAuthorized, textAuthorized, ProfileText, cardNumberProfile) {
  if (usersData != null || usersData != undefined || usersData.length != 0)
    textAuthorized.textContent = fieldValues;
  IconAuthorized.style.display = 'block';
  ProfileText.textContent = cardNumberProfile;
  profileIcon.style.display = 'none';

  libraryCardBeforeRegistrationAndAuth.style.display = 'none';
  libraryCardAfterRegistrationAndAuth.style.display = 'flex';
  libraryCardAfterRegistrationAndAuth.style.flexDirection = 'column';

}

// -------cardNumber generate

function generateRandomCardNumber() {
  const cardNumber = [];
  for (let i = 0; i < 9; i++) {
    cardNumber.push(Math.floor(Math.random() * 16));
  }
  const hexString = cardNumber.map((number) => number.toString(16)).join('');
  const result = hexString.slice(0, 9).toUpperCase();
  return result;
}
console.log(generateRandomCardNumber());

// -----------log In process


loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Остановить отправку формы
  // Получить email и пароль из формы
  const emailOrCard = emailOrCardInput.value;
  const password = loginPassword.value;
  console.log(email)
  console.log(password)

  // Проверить, что такой пользователь существует в массиве usersData
  const userExists = usersData.some(user => (user.email === emailOrCard || user.cardNumber === emailOrCard) && user.password === password);

  if (!userExists) {
    alert('User does not exist');
    return;
  }

  // Пользователь существует, авторизовать его
  const userIndex = usersData.findIndex(user => user.email === emailOrCard || user.cardNumber === emailOrCard)
  // Если пользователь найден
  if (userIndex !== -1) {
    // Получить пользователя из массива `usersData`
    const user = usersData[userIndex];
    user['isAuth'] = true;
    const firstLettersLoginInput = (user.firstName[0] + user.lastName[0]).toUpperCase();
    const afterLoginFirstNameSecondName = (user.firstName + ' ' + user.lastName);
    console.log(afterLoginFirstNameSecondName)

    const NumberOfCard = user['cardNumber']
    console.log(NumberOfCard + ' ' + ' login form')
    user['NumberOfEnter'] = ++user['NumberOfEnter'];
    user.userBooks.length
    localStorage.setItem('isAuth', true);
    // Сохранить изменения в локальном хранилище
    localStorage.setItem('users', JSON.stringify(usersData));
    window.location.reload();

  }
  // Сбросить форму
  loginForm.reset();
  modalLogin.style.display = 'none';

});

// const findIsAuthUser = function () {
//   let authUser = null;
//   const usersData = JSON.parse(localStorage.getItem('users')) || [];

//   for (const user of usersData) {
//     if (user.isAuth === true) {
//       authUser = user;
//       break;
//     }
//   }

//   return authUser;
// };
// const user = findIsAuthUser();


console.log(user + '555555555555555555')




if (localStorage.getItem('isAuth') == 'true') {

  profileInformation(user, fieldInitials, userNameSurname, profileCardNumber)
  changeLogoAfterRegistration(user.initials, profileIconAuthorized, textIconAuthorized, dropMenuProfileText, user.cardNumber);
  titleAuthorizedUser(profileIconAuthorized, user.firstName + ' ' + user.lastName)
  addUserFieldsWithoutTimeOut(user, visits, books, cardFormAfterRegistrationName, cardFormAfterRegistrationCard)
  bookContentTextField(user, bookInput)
}else {
  console.log('user not authorized')
}



function profileInformation(userInformation, fieldInitialsUser, nameSurname, profileCardNum) {
  fieldInitialsUser.textContent = userInformation.initials;
  nameSurname.textContent = userInformation.firstName + ' ' + userInformation.lastName;
  profileCardNum.textContent = userInformation.cardNumber;
}


// -----users books information in profile-----


// function bookContentTextField(userInformation, usersBooks) {
//   const books = userInformation.userBooks.map(book => {
//     return `<li>${book.bookName} ${book.authorName}</li>`;
//   });

//   usersBooks.innerHTML = books.join('');
// }



function bookContentTextField(userInformation, usersBooks) {
  const books = userInformation?.userBooks?.map(book => {
    return `<li>${book.bookName} ${book.authorName}</li>`;
  });

  usersBooks.innerHTML = books?.join('') || '';
}

// ----------------------------------------------------WTF!!!!------------------------------------------




function showModalBuyCard() {
  buyCard.style.display = 'block';
}


if (localStorage.getItem('isAuth') == 'true' && user.isSubscriptionBuy === false) {
  buttonBook.forEach((elem) => {
    elem.addEventListener('click', showModalBuyCard);
  });
} else if (localStorage.getItem('isAuth') == 'false') {
  buttonBook.forEach((elem) => {
    elem.removeEventListener('click', showModalBuyCard);
  });
} else if (user !== null && user.isAuth === true) {
  buttonBook.forEach((elem) => {
    elem.removeEventListener('click', showModalBuyCard);
  });
}




// ---------------------------------------------------------------------------------------------


// -----------log Out process
const logOut = document.querySelector('.drop-menu__logout');
logOut.addEventListener('click', () => {
  profileIconAuthorized.style.display = 'none';
  profileIcon.style.display = 'block';

  libraryCardBeforeRegistrationAndAuth.style.display = 'flex';
  libraryCardAfterRegistrationAndAuth.style.display = 'none';
  libraryCardAfterRegistrationAndAuth.style.flexDirection = 'column';

  findIsAuth()
  window.location.reload();
})

// ----------- delete  isAuth for all-------
function findIsAuth() {
  // Получить глобальную переменную usersData
  const usersData = JSON.parse(localStorage.getItem('users')) || [];

  usersData.forEach((user) => {
    if (user.isAuth === true) {
      user.isAuth = false;
      localStorage.setItem('users', JSON.stringify(usersData));
    }
  });

  localStorage.setItem('isAuth', false);
}



// ------ title icon function
function titleAuthorizedUser(UserProfileIcon, firstNameSecondName) {
  UserProfileIcon.setAttribute('title', firstNameSecondName);
}

// -----------------library card without auth only registration-----------------------------

const librarySubmitBtnNoAuth = document.querySelector('.library-submit-button');
const inputName = document.querySelector('.input-name');
const inputCardNumber = document.querySelector('.input-card-number');
if (localStorage.getItem('isAuth') == 'false') {
  formLibraryCard.addEventListener('submit', (event) => {
    event.preventDefault();

    addUserFieldsWithTimeOut()

    // Сбросить форму
    formLibraryCard.reset();
  });
} else {


}



// ------------------------------------------------------------------------------------------

function addUserFieldsWithTimeOut() {
  const readersName = inputName.value;
  const cardNumber = inputCardNumber.value;
  // Проверить, что такой пользователь существует в массиве usersData
  const userExists = usersData.some(user => (user.firstName + ' ' + user.lastName === readersName && user.cardNumber === cardNumber));

  if (!userExists) {
    alert('User does not exist');
    return;
  }

  // Пользователь существует, авторизовать его
  const userIndex = usersData.findIndex(user => user.cardNumber === cardNumber)
  // Если пользователь найден
  if (userIndex !== -1) {
    // Получить пользователя из массива usersData
    const user = usersData[userIndex];


    visits.forEach((element) => {
      element.textContent = user.NumberOfEnter;
    });

    books.forEach((element) => {
      element.textContent = user.userBooks.length;
    });

    console.log(visits.textContent);
    console.log(books.textContent);

    setTimeout(() => {
      // Скрыть блоки
      librarySubmitBtnNoAuth.style.display = 'none';
      showInfoUser.style.display = 'flex';

      // Запустить таймер
      const timer = setInterval(() => {
        // Скрыть блоки
        librarySubmitBtnNoAuth.style.display = 'block';
        showInfoUser.style.display = 'none';

        // Остановить таймер
        clearInterval(timer);
      }, 10000);

    }, 0);
  }
}




function addUserFieldsWithoutTimeOut(userInformation, numberOfVisits, booksNumber, inputName, inputCard) {
  numberOfVisits.forEach((element) => {
    element.textContent = userInformation.NumberOfEnter;
  });

  booksNumber.forEach((element) => {
    element.textContent = userInformation.userBooks.length;
  });

  inputName.value = userInformation.firstName + ' ' + userInformation.lastName;
  inputCard.value = userInformation.cardNumber;

  console.log(userInformation.NumberOfEnter);
  console.log(userInformation.userBooks.length);
}



// ----copy button----
const cardNumberValue = document.querySelector('.prifile-card-number');
const copyIcon = document.querySelector('.prifile-card-icon');

copyIcon.addEventListener('click', () => {
  const cardNumberValue = document.querySelector('.prifile-card-number').textContent;
  navigator.clipboard.writeText(cardNumberValue);
  alert('The card number has been copied to your clipboard.');
});

// ----------modal by library card ---------------
const buyCardModal = document.querySelector('.modal__buy-library-card');
const buyCardForm = document.querySelector('.buy-library-card__form');

buyCardForm.addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем отправку формы
  const cardNumberInput = document.getElementById('cardnumber');
  const monthYearCodeInput = document.getElementById('month-year-code');
  const yearCodeInput = document.getElementById('year-code');
  const cvcInput = document.getElementById('cvc');
  const cardNumberValue = cardNumberInput.value.replace(/\s+/g, '');
  if (cardNumberValue.length !== 16) {
    event.preventDefault(); // отменяем отправку формы
    alert('password should be 16 numbers length');
  }

  if (monthYearCodeInput.value.length !== 2 || yearCodeInput.value.length !== 2 || cvcInput.value.length !== 3) {

    alert('fields "Expiration code" and "CVC" should contain 2 and 3 numbers');
  }
  else {

    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = usersData.find(u => u.isAuth === true);
    console.log(userToUpdate)
    if (userToUpdate) {
      userToUpdate.isSubscriptionBuy = true;
    }
    localStorage.setItem('users', JSON.stringify(usersData));
    buyCardModal.style.display = 'none'; // скрываем модальное окно
    window.location.reload();
  }
});

// -------------buy books and add to storage ------------------

function byBook(bookClass) {
  let userBookOwn = {}
  // Get the book container elements
  const bookContainers = document.querySelectorAll(bookClass);

  // Loop through the book container elements
  for (const bookContainer of bookContainers) {


    const bookName = bookContainer.querySelector('.book-name').textContent;
    const authorName = bookContainer.querySelector('.author-name').textContent;

    userBookOwn['bookName'] = bookName;
    userBookOwn['authorName'] = authorName;
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdateBook = usersData.find(u => u.isAuth === true && u.isSubscriptionBuy === true);

    if (userToUpdateBook) {
      const existingBooks = Array.isArray(userToUpdateBook.userBooks) ? userToUpdateBook.userBooks : [];

      // Check if the book already exists
      const isBookExists = existingBooks.some(b => b.bookName === bookName && b.authorName === authorName);

      if (!isBookExists) {
        existingBooks.push({ bookName, authorName });
        userToUpdateBook.userBooks = existingBooks;
        localStorage.setItem('users', JSON.stringify(usersData));
      }
    }
    // update profile input books field
    bookContentTextField(userToUpdateBook, bookInput)

    // check isAuth, update button and text disable
    const buyButton = bookContainer.querySelector('.button');
    if (userToUpdateBook) {
      buyButton.textContent = 'Own';
      buyButton.style.backgroundColor = '#fff';
      buyButton.style.color = '#bb945f';
      buyButton.disabled = true;
    }
  }
  
}



const btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', (event) => {
  byBook('.book1');
})


const btn2 = document.querySelector('.btn2');
btn2.addEventListener('click', (event) => {
  byBook('.book2');
})

const btn3 = document.querySelector('.btn3');
btn3.addEventListener('click', (event) => {
  byBook('.book3');
})


const btn4 = document.querySelector('.btn4');
btn4.addEventListener('click', (event) => {
  byBook('.book4');
})

const btn5 = document.querySelector('.btn5');
btn5.addEventListener('click', (event) => {
  byBook('.book5');
})

const btn6 = document.querySelector('.btn6');
btn6.addEventListener('click', (event) => {
  byBook('.book6');
})

const btn7 = document.querySelector('.btn7');
btn7.addEventListener('click', (event) => {
  byBook('.book7');
})

const btn8 = document.querySelector('.btn8');
btn8.addEventListener('click', (event) => {
  byBook('.book8');
})

const btn9 = document.querySelector('.btn9');
btn9.addEventListener('click', (event) => {
  byBook('.book9');
})

const btn10 = document.querySelector('.btn10');
btn10.addEventListener('click', (event) => {
  byBook('.book10');
})

const btn11 = document.querySelector('.btn11');
btn11.addEventListener('click', (event) => {
  byBook('.book11');
})

const btn12 = document.querySelector('.btn12');
btn12.addEventListener('click', (event) => {
  byBook('.book12');
})

const btn13 = document.querySelector('.btn13');
btn13.addEventListener('click', (event) => {
  byBook('.book13');
})

const btn14 = document.querySelector('.btn14');
btn14.addEventListener('click', (event) => {
  byBook('.book14');
})

const btn15 = document.querySelector('.btn15');
btn15.addEventListener('click', (event) => {
  byBook('.book15');
})

const btn16 = document.querySelector('.btn16');
btn16.addEventListener('click', (event) => {
  byBook('.book16');
})


