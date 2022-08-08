import {
  generationsCustomPassword,
  validPhoneNumber,
  getParramUtm,
  commentVal,
  regValitatorInputText,
  thenkYouPage,
  generationsModalErrors,
  renderFormRegistrations,
  validEmail,
  preloaderFormSend,
  addLoader,
  removeLoader
} from './functions.js';

renderFormRegistrations('_main-form');
generationsModalErrors();


/* GOOGLE__POST__DATA */
function postToGoogle() {
  let gName = settingObjForm.postParams.first_name;
  let gSurname = settingObjForm.postParams.last_name;
  let gEmail = settingObjForm.postParams.email;
  let gPhone = settingObjForm.postParams.phone;
  let gOffer = settingObjForm.postParams.offer;
  let gKeitaro = settingObjForm.postParams.keitaro_id;
  let gComment = window.location.search;

  $.ajax({
    url: "https://docs.google.com/forms/d/e/1FAIpQLScA8YjP6wAwFSX5aa-cRBlnUozSER51TCnf2yEYEeEheaqobQ/formResponse?",
    data: {
      "entry.932590636": gName,
      "entry.1387156975": gSurname,
      "entry.1689213780": gEmail,
      "entry.1876323700": gPhone,
      "entry.642696968": gOffer,
      "entry.1503890842": gKeitaro,
      "entry.995748257": gComment
    },
    type: "POST",
    dataType: "xml",
    success: function (d) {}
  });
  return false;
}

/* GOOGLE__POST__DATA NOT VALID */
function postToGoogleNotValid() {
  let gName = settingObjForm.postParams.first_name;
  let gSurname = settingObjForm.postParams.last_name;
  let gEmail = settingObjForm.postParams.email;
  let gPhone = settingObjForm.postParams.phone;
  let gOffer = settingObjForm.postParams.offer;
  let gKeitaro = settingObjForm.postParams.keitaro_id;
  let gComment = settingObjForm.postParams.comment;

  $.ajax({
   url: "https://docs.google.com/forms/d/e/1FAIpQLSfTb0T8MwOnIpIxNUTYe8HGjdzsxjatcWjFuVRdPaovfZYsXA/formResponse?",
    data: {
      "entry.206436847": gName,
      "entry.942199885": gSurname,
      "entry.1184124977": gEmail,
      "entry.222305590": gPhone,
      "entry.667343570": gOffer,
      "entry.1955875079": gKeitaro,
      "entry.285230963": gComment
    },
    type: "POST",
    dataType: "xml",
    success: function (d) {}
  });
  return false;
}

/* ------------------------ */

const settingObjForm = {
  postParams: {
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    country_code: null,
    password: null,
    token: null,
    offer: null,
    comment: null,
    "keitaro_id": null,

    _setParams: function (answers) {
      const getDataMask = document.querySelector('.iti__selected-dial-code');

      this.first_name = document.querySelector('input[name="name"]').value
      this.last_name = document.querySelector('input[name="last_name"]').value
      this.email = document.querySelector('input[name="email"]').value
      // this.phone = `${getDataMask.textContent}${document.querySelector('input[name="phone"]').value}`
      this.country_code = 'US';
      // this.country_code = document.querySelector('input[name="code"]').value;
      this.offer = getParramUtm('offer');
      this.password = generationsCustomPassword();
      this.token = getParramUtm('token');
      this.comment = commentVal(answers);
      this.keitaro_id = localStorage.getItem('subid');

    }
  }
}


//Geo input Flags
const inputsPhone = document.querySelectorAll("._phone");
// inputsPhone.forEach(phone => {

// window.intlTelInput(phone, {
//     // allowDropdown: false,
//     // autoHideDialCode: true,
//     // autoPlaceholder: "on",
//     // dropdownContainer: document.body,
//     // excludeCountries: ["us"],
//     // formatOnDisplay: false,
//     geoIpLookup: function (callback) {
//       $.get(
//         "https://ipinfo.io/json?token=219a422f09ea70",
//         function () {},
//         "jsonp"
//       ).always(function (resp) {
//         const countryCode = resp && resp.country ? resp.country : "";
//         document.querySelectorAll('input[name="code"]').forEach(item => item.value = countryCode);

//         callback(countryCode);
//       });
//     },
//     initialCountry: "auto",

//     // hiddenInput: "full_number",

//     // localizedCountries: { 'de': 'Deutschland' },
//     // nationalMode: false,
//     // onlyCountries: ["us", "ca"],
//     placeholderNumberType: "MOBILE",
//     preferredCountries: ["ca", "us"],
//     separateDialCode: true,
//     utilsScript: "lending/build/js/utils.mjs",
//   });

// })


inputsPhone.forEach(phone => {

window.intlTelInput(phone, {
    // allowDropdown: false,
    // autoHideDialCode: true,
    // autoPlaceholder: "on",
    // dropdownContainer: document.body,
    // excludeCountries: ["us"],
    // formatOnDisplay: false,
    geoIpLookup: function (callback) {
      $.get(
        "https://ipinfo.io/json?token=219a422f09ea70",
        function () {},
        "jsonp"
      ).always(function (resp) {
        const countryCode = resp && resp.country ? resp.country : "";
        document.querySelectorAll('input[name="code"]').forEach(item => item.value = countryCode);

        callback(countryCode);
      });
    },
    initialCountry: "auto",

    // hiddenInput: "full_number",

    // localizedCountries: { 'de': 'Deutschland' },
    // nationalMode: false,
    // onlyCountries: ["us", "ca", "au"],
    placeholderNumberType: "MOBILE",
    preferredCountries: ["ca", "us", "au"],
    separateDialCode: true,
    utilsScript: "lending/build/js/utils.mjs",
  });

})
//Geo input Flags

const modalError = document.querySelector('.modal-errors');

const formName = document.querySelectorAll('input[name="name"]');
const formLastName = document.querySelectorAll('input[name="last_name"]');
const formEmail = document.querySelectorAll('input[name="email"]');

//messageErrorsModal
const closeModal = document.querySelector('.modal-errors__close');
const modal_errors__content = document.querySelector('.modal-errors__content');
closeModal.addEventListener('click', () => modalError.classList.remove('active'));
//End messageErrorsModal

formName.forEach(input => {
  input.addEventListener('input', function (e) {
    for (let i = 0; i < formName.length; i++) {
      formName[i].value = e.target.value
    }
    formName.value = e.target.value
  })
});

formLastName.forEach(input => {
  input.addEventListener('input', function (e) {
    for (let i = 0; i < formLastName.length; i++) {
      formLastName[i].value = e.target.value
    }
    formLastName.value = e.target.value
  })
});

formEmail.forEach(input => {
  input.addEventListener('input', function (e) {
    for (let i = 0; i < formEmail.length; i++) {
      formEmail[i].value = e.target.value
    }
    formEmail.value = e.target.value
  })
});

/* inputsPhone.forEach(input => {
  input.addEventListener('keydown', function (e) {
    for (let i = 0; i < inputsPhone.length; i++) {
      inputsPhone[i].value = e.target.value
    }
    inputsPhone.value = e.target.value
  })
}); */

const allArraysInputs = [
  ...document.querySelectorAll('input[name="last_name"]'),
  ...document.querySelectorAll('input[name="name"]'),
//   ...document.querySelectorAll('input[name="phone"]'),
  ...document.querySelectorAll('input[name="email"]'),
];
const allPhoneInput = document.querySelectorAll('input[name="phone"]')
let phonPlasholder = allPhoneInput.placeholder;
//Post data form

const allBtnSubmit = document.querySelectorAll('.buttonSend');
const btnFormText = document.querySelectorAll('.btnFormText');

const postData = async (data) => {
  // email
  // password
  // first_name
  // last_name
  // phone
  // country_name
  // country_code
  // promo
  // comment
  // token
  //"keitaro_id"


  addLoader(allBtnSubmit,btnFormText);
  // preloaderFormSend();



  try {
    const response = await fetch("./order.php", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const result = await response.json();

    if (result.success) {
      preloaderFormSend();
      //Track Registration event for facebook
      function leadTrack() {
        fbq('track', "Lead");
      }
      function googleReg() {
        let gId = getCookie('googleId');
        let gPixel = getCookie('pixelg');
        gtag('event', 'conversion', `{'send_to': '${gPixel}/${gId}'}`);
      }

      leadTrack();
      googleReg();
      postToGoogle();
      setTimeout(() => {
        thenkYouPage();
      }, 1000);


    } else {
      allBtnSubmit.forEach(btn => {
        btn.disabled = true;
      });
      //Выключаем loader
      removeLoader(allBtnSubmit,btnFormText);
      postToGoogleNotValid();
      //
      // const email = result.message.email || '';
      // const tel = result.message.phone || '';
      messageErrorsModal();

    }
  } catch (error) {
  postToGoogleNotValid();
    console.error("Ошибка:", error);
  }
  // mainForm.reset();
};
const allForm = document.querySelectorAll('._main-form');
allForm.forEach(form => {

form.addEventListener("submit", (e) => {

  //PHONE VALIDATION
  const currentForm = e.target.closest('form');
  const phoneNumberCurrent = currentForm.querySelector('input[name="phone"]').value;
  const mnc = currentForm.querySelector('.iti__selected-dial-code').textContent;
  const formErrorContent = currentForm.querySelector('.form-error-content');
  // console.log(formErrorContent)

    const maskForm = currentForm.querySelector('.iti__selected-dial-code');
    const valuePhone = currentForm.querySelector('._phone');
    const answerssValue = currentForm.querySelector('input[name="answer"]');

    settingObjForm.postParams.phone = `${maskForm.textContent}${valuePhone.value}`;
    e.preventDefault();
    regValitatorInputText(formName);
    regValitatorInputText(formLastName);
    validEmail(formEmail);

    validPhoneNumber(allPhoneInput,phonPlasholder)

    const validForm = allArraysInputs.every((item) => {
      return item.classList.contains("valid");
    });
    const validFormPhone = valuePhone.classList.contains('valid');

    if (validForm && validFormPhone) {
      addLoader(allBtnSubmit,btnFormText)
        //PHONE VALIDATION
      fetch(`https://apilayer.net/api/validate?access_key=e2cc27bace1a1eeb5e1d590bc75ade76&number=${mnc}${phoneNumberCurrent}`)
      .then((response) => {
       
        return response.json();
        
      })
      .then((data) => {
         console.log(data);
        if(data.valid) {
          settingObjForm.postParams._setParams(answerssValue.value)
          postData(settingObjForm.postParams);
          formErrorContent.classList.remove('active')
        }
        else if (!data.valid) {
          removeLoader(allBtnSubmit,btnFormText)
          formErrorContent.classList.add('active');
        }
      });
      //
      for (let i = 0; i < allArraysInputs.length; i++) {
        allArraysInputs[i].classList.remove('valid');
      }
    }
  });
})


function messageErrorsModal() {
  modalError.classList.add('active');
}

//Рекапча
//Mask Phone
const inpuMaskFun = () => {
  $(function () {
    const inputPlacholder = document.querySelector('._phone');
    let result = ''
    for (let i = 0; i < inputPlacholder.placeholder.length; i++) {
      if (inputPlacholder.placeholder[i] !== ' ' && inputPlacholder.placeholder[i] !== '-') {
        /* console.log(inputPlacholder.placeholder[i]) */
        result += 9
      }
    }
    phonPlasholder = result
    inputPlacholder.value = ''
/*     console.log(result);
    console.log(result.length); */
    $.mask.definitions["~"] = "[+-]";
    // $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy",completed:function(){alert("completed!");}});
    // $(".phone").mask("(999) 999-9999");
    // $("#phoneExt").mask("(999) 999-9999? x99999");
    $("._phone").mask(`${result}`);
    // $("#tin").mask("99-9999999");
    // $("#ssn").mask("999-99-9999");
    // $("#product").mask("a*-999-a999", { placeholder: " " });
    // $("#eyescript").mask("~9.99 ~9.99 999");
    // $("#po").mask("PO: aaa-999-***");
    // $("#pct").mask("99%");
    // $("._phone").mask("(999) 999-9999", { autoclear: false, completed:function(){alert("completed autoclear!");} });
    // $("#phoneExtAutoclearFalse").mask("(999) 999-9999? x99999", { autoclear: false });

    // $("input").blur(function() {
    //     $("#info").html("Unmasked value: " + $(this).mask());
    // }).dblclick(function() {
    //     $(this).unmask();
    // });
  });
}
  window.addEventListener("load", function(event) {
    inpuMaskFun()
  });
//Mask Phone
const test = document.querySelectorAll('.iti__flag-container');
test.forEach(element => {
  element.addEventListener('click', () => {
    inpuMaskFun()
  })
});
