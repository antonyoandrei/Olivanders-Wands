// Antonyo //

// Finish details //
function updateCheckoutInfo() {
  const updateFinishSection = () => {
    const getValue = (element) => parseFloat(element.textContent.replace('£', ''));
    const productImg = document.querySelector('.product__media__main__img');
    const productTitle = document.querySelector('.product__title');
    const productPrice = document.querySelector('.product__price');
    const totalPrice = document.getElementById('totalPrice');
    const orderProductImg = document.getElementById('orderProductImg');
    const orderProductTitle = document.getElementById('orderProductTitle');
    const orderInfoProductTitle = document.getElementById('orderInfoProductTitle');
    const orderInfoProductPrice = document.getElementById('orderInfoProductPrice');
    const shippingPriceElement = document.querySelector('#shippingPrice');

    orderProductImg.src = productImg.src;
    orderProductTitle.textContent = productTitle.textContent;
    orderInfoProductTitle.textContent = productTitle.textContent;
    orderInfoProductPrice.textContent = productPrice.textContent;

    const productPriceValue = getValue(productPrice);
    const shippingPriceValue = getValue(shippingPriceElement);

    const total = (productPriceValue + shippingPriceValue).toFixed(2);
    totalPrice.textContent = '£' + total;

  };

  const productTitle = document.querySelector('.product__title');
  productTitle.addEventListener('input', updateFinishSection);

  const productPrice = document.querySelector('.product__price');
  productPrice.addEventListener('input', updateFinishSection);

  updateFinishSection();
}

// Expandable description //

document.addEventListener('DOMContentLoaded', function() {
  var descriptionContent = document.querySelector('.product__description .description-content');
  var gradientOverlay = document.querySelector('.product__description .gradient-overlay');
  var readMoreBtn = document.querySelector('.product__description button.read-more');
  var isOpen = false;

  function toggleDescription() {
    isOpen = !isOpen;
    descriptionContent.style.maxHeight = isOpen ? '1000px' : '200px';
    gradientOverlay.style.opacity = isOpen ? '0' : '1';
    readMoreBtn.textContent = isOpen ? 'Read Less' : 'Read More';
    event.preventDefault();
  }

  readMoreBtn.addEventListener('click', toggleDescription);
});

// GIF //

const gifContainer = document.getElementById('gifContainer');
const gifImage = document.getElementById('gifImage');
let gifTimeout;
let keys = '';

function showGif() {
  gifContainer.style.display = 'block';
  gifTimeout = setTimeout(hideGif, 5000);
}

function hideGif() {
  gifContainer.style.display = 'none';
  clearTimeout(gifTimeout);
}

document.addEventListener('keydown', function(event) {

  let key = event.key
  if (!key) return
  keys += key;

  if (keys.includes('lovelace')) {
    showGif();
    keys = '';
  }
});

// Timer //

var minutes = 0;
var alarmInterval, timerInterval;

function updateTimer() {
  document.getElementById("registration_timer").textContent = minutes + " minutes";
}

function showAlarm() {
  var alarmElement = document.getElementById("custom_alarm");
  var minutesLeft = 4 - minutes;
  alarmElement.textContent = minutesLeft + " minutes left until refreshing";
  alarmElement.style.display = "block";
  setTimeout(function() {
    alarmElement.style.display = "none";
  }, 5000);
}

function startTimer() {
  minutes = 0;
  updateTimer();
  alarmInterval = setInterval(function() {
    if (minutes < 4) {
      showAlarm();
      minutes++;
      updateTimer();
    } else {
      clearInterval(alarmInterval);
      clearInterval(timerInterval);
      location.reload();
    }
  }, 60000);
  timerInterval = setInterval(function() {
    updateTimer();
  }, 60000);
}

function stopTimer() {
  clearInterval(alarmInterval);
  clearInterval(timerInterval);
}

// Checkboxes and buttons //

const termsCheckbox = document.getElementById('terms_checkbox');
const giftCheckbox = document.getElementById('gift');
const finishButton = document.getElementById('finish_button');
const completeOrder = document.querySelector('.complete_order');
const orderInfo = document.querySelector('.order_info');
const registrationTime = document.querySelector('.registration_time');
const lightningImage = document.getElementById('lightning_image');
const giftLightningImage = document.getElementById('gift_lightning_image');
const giftFields = document.getElementById('giftFields');
const regularAddressLightningImage = document.getElementById('address_lightning_image');
const regularAddressCheckbox = document.getElementById('regular_address');

regularAddressCheckbox.addEventListener('change', function() {
  regularAddressLightningImage.style.display = regularAddressCheckbox.checked ? 'block' : 'none';
});

giftCheckbox.addEventListener('change', function() {
  giftFields.style.display = giftCheckbox.checked ? 'block' : 'none';
  giftLightningImage.style.display = giftCheckbox.checked ? 'block' : 'none';
});

completeOrder.style.display = 'none';
registrationTime.style.display = 'none';

termsCheckbox.addEventListener('change', function() {
  finishButton.disabled = !termsCheckbox.checked;
  lightningImage.style.display = termsCheckbox.checked ? 'block' : 'none';
});

finishButton.addEventListener('click', function() {
  completeOrder.style.display = 'block';
  orderInfo.style.display = 'none';
  registrationTime.style.display = 'block';
  setTimeout(function() {
    location.reload();
  }, 5000);
});

termsCheckbox.addEventListener('change', function() {
  finishButton.disabled = !termsCheckbox.checked;
  if (termsCheckbox.checked) {
    finishButton.style.opacity = 1;
  } else {
    finishButton.style.opacity = 0.5;
  }
});

// Delivery date and price//

const deliveryDate = document.querySelector('.order_info__delivery_date');
const shippingTypeRadios = document.querySelectorAll('input[name="shipping-method"]');
const productPrice = document.querySelector('.order_info__product_price');
const shippingPrice = document.querySelector('.order_details__shipping');
const totalPrice = document.querySelector('.order_details__total');

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function updateDeliveryDate() {
  const today = new Date();
  const selectedShippingOption = document.querySelector('input[name="shipping-method"]:checked');

  if (selectedShippingOption) {
    const deliveryTime = {
      free: 72,
      extra: 48,
      premium: 24
    }[selectedShippingOption.value];

    const deliveryDateText = new Date(today.getTime() + deliveryTime * 60 * 60 * 1000);
    const minDate = formatDate(deliveryDateText);
    const maxDate = formatDate(new Date(deliveryDateText.getTime() + 24 * 60 * 60 * 1000));
    deliveryDate.innerHTML = `Your order will arrive between <b>${minDate}</b> and <b>${maxDate}</b>`;
  }
}

shippingTypeRadios.forEach(radio => {
  radio.addEventListener('change', updateDeliveryDate);
});

function updateShippingPrice() {
  const shippingPriceElement = document.querySelector('#shippingPrice');
  const selectedShippingOption = document.querySelector('input[name="shipping-method"]:checked');

  if (selectedShippingOption) {
    const shippingPrice = {
      free: '£0.00',
      extra: '£4.99',
      premium: '£9.99'
    }[selectedShippingOption.value];

    shippingPriceElement.innerHTML = shippingPrice;
    updateCheckoutInfo()
  }
}

shippingTypeRadios.forEach(radio => {
  radio.addEventListener('change', updateDeliveryDate);
  radio.addEventListener('change', updateShippingPrice);
});

// Miguel //

// Getting dates //

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowPlus1 = new Date(today)
tomorrowPlus1.setDate(tomorrowPlus1.getDate() + 2)
const tomorrowPlus2 = new Date(today)
tomorrowPlus2.setDate(tomorrowPlus2.getDate() + 3)
const tomorrowPlus3 = new Date(today)
tomorrowPlus3.setDate(tomorrowPlus3.getDate() + 4)

// Adding text when radio checked //

function addText() {
  const free = document.getElementById("free");
  const extra = document.getElementById("extra");
  const premium = document.getElementById("premium");
  const orderText = document.querySelector(".order_text");

  if (free.checked) {
    orderText.innerHTML = `Your shipment will arrive between ${formatDate(tomorrowPlus2)} and ${formatDate(tomorrowPlus3)}`;
  } else if (extra.checked) {
    orderText.innerHTML = `Your shipment will arrive between ${formatDate(tomorrowPlus1)} and ${formatDate(tomorrowPlus2)}`;
  } else if (premium.checked) {
    orderText.innerHTML = `Your shipment will arrive between ${formatDate(tomorrow)} and ${formatDate(tomorrowPlus1)}`;
  }
}

const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach(function(radio) {
  radio.addEventListener("click", addText);
});


// Modal Open and Close //

const modal = document.querySelector(".modal")
const openModal = document.querySelector(".product__atc")

openModal.addEventListener("click", (event) => {
  event.preventDefault();
  modal.showModal();
  startTimer();
})

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.close();
    stopTimer();
  }
})

// JS Modal //

// First form set to 0  //

var n = 0;

// Display Current Form  //

showForm(n);

const footer = document.querySelector(".modal__footer")
const marker = document.querySelectorAll(".progress_tracker__step__marker")


showForm(n);

function showForm(n) {
  var x = document.getElementsByClassName("form__container");

  x[1].style.display = "none";
  x[2].style.display = "none";
  x[3].style.display = "none";

  const allForms = document.querySelectorAll('[data-type="form"]')

  allForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputs = form.querySelectorAll('.form__input');
      let isValid = true;
      if (form === document.querySelector('[data-form="profile"]')) {
        inputs.forEach(input => {
          if (!validateProfileFormInputs(input)) {
            isValid = false;
          }
        });
      } else if (form === document.querySelector('[data-form="address"]')) {
        inputs.forEach(input => {
          if (!validateAddressFormInputs(input)) {
            isValid = false;
          }
        })
      } else if (form === document.querySelector('[data-form="shipping"]')) {
        inputs.forEach(input => {
          if (!validateShippingFormInputs(input)) {
            isValid = false;
          }
        })
      }
      if (isValid) {
        changeTab();
      }
    });
  });

  function changeTab() {
    const marker = document.querySelectorAll('.progress_tracker__step__marker');
    const x = document.querySelectorAll('.form__container');
    n++;

    if (n === 1) {
      x[1].style.display = "block";
      x[0].style.display = "none";
      x[2].style.display = "none";
      x[3].style.display = "none";
      marker[1].classList.add("current");
    } else if (n === 2) {
      x[2].style.display = "block";
      x[0].style.display = "none";
      x[1].style.display = "none";
      x[3].style.display = "none";
      marker[2].classList.add("current");
    } else if (n === 3) {
      x[3].style.display = "flex";
      x[0].style.display = "none";
      x[1].style.display = "none";
      x[2].style.display = "none";
      marker[3].classList.add("current");
    }
  }

  // Clear Btn Functionality //
  const clearBtn = document.querySelectorAll("[data-type='clearBtn']");
  clearBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault()
      const form = btn.closest('form');
      form.reset();
      clearErrors();
    });
  });


  // Clear all errors //
  function clearErrors() {
    errorMessages = document.querySelectorAll('.input__message__container')
    if (errorMessages.length != 0) {
      errorMessages.forEach(message => message.textContent = '')
    }
  }

  const countrySelectorElement = document.querySelector('[name="country"]');
  countrySelectorElement.addEventListener('change', changeCountryCode);
  
  //Function to get country code and display it
  function changeCountryCode(){
  let selectedCountryValue = document.querySelector('[name="country"]').value;
  let countryCodeInputElement = document.querySelector('[name="countryCode"]');
  countryCodeInputElement.value = selectedCountryValue;
  }

  //Function to validate the Shipping form inputs
  function validateShippingFormInputs(input) {
    const form = input.closest('[data-form="shipping"]');
    const selectedOption = form.querySelector('input[name="shipping-method"]:checked');
    const inputContainer = form.querySelector('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (!selectedOption) {
      messageContainer.textContent = 'Please select a shipping type.';
      return false;
    }


    return true;
  }



  // Function to validate the profile form inputs
  function validateProfileFormInputs(input) {
    const form = input.closest('[data-form]');

    if (form.dataset.form === 'profile') {
      if (input.dataset.input === 'user-name') {
        return validateUsernameInput(input);
      } else if (input.dataset.input === 'email') {
        return validateEmailInput(input);
      } else if (input.dataset.input === 'password') {
        return validatePasswordInput(input);
      } else if (input.dataset.input === 'confirm-password') {
        return validateConfirmPasswordInput(input);
      }
    }

    return true;
  }

  // Function to validate the username input
  function validateUsernameInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter a username.';
      return false;
    } else if (/\s/.test(inputValue)) {
      messageContainer.textContent = 'Username cannot contain spaces.';
      return false;
    } else if (inputValue.length < 5 || inputValue.length > 20) {
      messageContainer.textContent = 'Username must be between 5 and 20 characters long.';
      return false;
    }

    return true;
  }

  // Function to validate the email input
  function validateEmailInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    // Email validation 
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter an email address.';
      return false;
    } else if (inputValue.length > 50) {
      messageContainer.textContent = 'Email address must be less than 50 characters long.';
      return false;
    } else if (!emailRegex.test(inputValue)) {
      messageContainer.textContent = 'Please enter a valid email address.';
      return false;
    }

    return true;
  }

  // Function to validate the password input
  function validatePasswordInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter a password.';
      return false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,20}/.test(inputValue)) {
      messageContainer.textContent = 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.';
      return false;
    }

    return true;
  }

  // Function to validate the confirm password input
  function validateConfirmPasswordInput(input) {
    const inputValue = input.value.trim();
    const passwordInput = input.form.querySelector('[data-input="password"]');
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please confirm your password.';
      return false;
    } else if (inputValue !== passwordInput.value) {
      messageContainer.textContent = 'Passwords do not match.';
      return false;
    }

    return true;
  }

  function clearErrorMessage(input) {
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    if(messageContainer) messageContainer.textContent = '';
  }

  function validateAddressFormInputs(input) {
    const form = input.closest('[data-form="address"]');

    if (form) {
      if (input.dataset.input === 'first-name') {
        return validateFirstNameInput(input);
      } else if (input.dataset.input === 'last-name') {
        return validateLastNameInput(input);
      } else if (input.dataset.input === 'birthday') {
        return validateBirthdayInput(input);
      } else if (input.dataset.input === 'address1') {
        return validateAddress1Input(input);
      } else if (input.dataset.input === 'address2') {
        return validateAddress2Input(input);
      } else if (input.dataset.input === 'postal-code') {
        return validatePostalCodeInput(input);
      } else if (input.dataset.input === 'phone') {
        return validatePhoneInput(input);
      }
    }

    return true;
  }

  function validateFirstNameInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your first name.';
      return false;
    } else if (inputValue.length > 20) {
      messageContainer.textContent = 'First name must be less than 20 characters long.';
      return false;
    }

    return true;
  }

  function validateLastNameInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your last name.';
      return false;
    } else if (inputValue.length > 20) {
      messageContainer.textContent = 'Last name must be less than 20 characters long.';
      return false;
    }

    return true;
  }

  function validateBirthdayInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your birthday.';
      return false;
    }

    return true;
  }

  function validateAddress1Input(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your address.';
      return false;
    } else if (inputValue.length > 50) {
      messageContainer.textContent = 'Address must be less than 50 characters long.';
      return false;
    }

    return true;
  }

  function validateAddress2Input(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue.length > 50) {
      messageContainer.textContent = 'Address line 2 must be less than 50 characters long.';
      return false;
    }

    return true;
  }

  function validatePostalCodeInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your postal code.';
      return false;
    } else if (!/^\d{5}$/.test(inputValue)) {
      messageContainer.textContent = 'Postal code must contain 5 digits.';
      return false;
    }

    return true;
  }

  function validatePhoneInput(input) {
    const inputValue = input.value.trim();
    const inputContainer = input.closest('.input__container');
    const messageContainer = inputContainer.querySelector('.input__message__container');
    messageContainer.textContent = '';

    if (inputValue === '') {
      messageContainer.textContent = 'Please enter your phone number.';
      return false;
    } else if (!/^\d{1,9}$/.test(inputValue)) {
      messageContainer.textContent = 'Phone number must contain only numeric values (up to 9 digits).';
      return false;
    }

    return true;
  }


  const shippingFormInputs = document.querySelectorAll('[data-form="shipping"] .form__radio')
  shippingFormInputs.forEach(input => {
    input.addEventListener('focus', () => {
      clearErrorMessage(input);
    })
  })


  const addressFormInputs = document.querySelectorAll('[data-form="address"] .form__input');
  addressFormInputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateAddressFormInputs(input);
    });

    input.addEventListener('focus', () => {
      clearErrorMessage(input);
    });
  });


  const profileFormInputs = document.querySelectorAll('[data-form="profile"] .form__input');
  profileFormInputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateProfileFormInputs(input);
    });

    input.addEventListener('focus', () => {
      clearErrorMessage(input);
    });
  })
};