import * as Model from './model.js';
import * as View from './view.js';

const LOGIN_INCORRECT = "Sorry, incorrect credentials.";
const LOGIN_NO_DATA = "Please fill in both fields.";
const EMPTY_FIELD_ERROR = "This field is required";
const INVALID_EMAIL = "Invalid email address";
const INVALID_PHONE = "(XXX)-XXX-XXXX";
const debug = false;


function loginFail(msg) {
    View.loginFailure(msg);
    loginEventListeners();
}
async function loginEventListener(email, password) {
    if (email !== '' && password !== '') { // values entered in both email and pwd fields

        let response = await Model.login(email, password)
        if (debug) { console.log("submit response = " + response); }
        if (response != -1) { //success
            Model.updateLocalStorage(response);
            loginSuccess(response.Table[0]);
        } else {   
            loginFail(LOGIN_INCORRECT);
        }
    } else {
        loginFail(LOGIN_NO_DATA);
    }
};

async function handleRegistrationEmail () {
    // console.log("need to check email " + document.querySelector("input[type=email]").value);
    let emailMsgSpan = document.getElementsByName("email")[0].nextElementSibling;
    let emailInUse = await Model.checkIfEmailExists(document.querySelector("input[type=email]").value);
    if (emailInUse) {
        View.fieldEntryError(emailMsgSpan, "This email is already taken.");
    } else { // else email is available to use for this user
        View.fieldEntryError(emailMsgSpan, "");
    }
}

function checkRegistrationUpdateForms() {
    let isError = false;
    const fName = document.getElementsByName("fName")[0];
    const lName = document.getElementsByName("lName")[0];
    const email = document.getElementsByName("email")[0];
    const password = document.getElementsByName("pwd")[0];
    const phone = document.getElementsByName("phone")[0];

    if (fName.value === "") {
        View.fieldEntryError(fName.nextElementSibling, EMPTY_FIELD_ERROR);
        isError = true;
    } else { 
        View.fieldEntryError(fName.nextElementSibling, "");
    }

    if (lName.value === "") {
        View.fieldEntryError(lName.nextElementSibling, EMPTY_FIELD_ERROR);
        isError = true;
    } else { 
        View.fieldEntryError(lName.nextElementSibling, "");
    }

    if (email.value === "") {
        View.fieldEntryError(email.nextElementSibling, EMPTY_FIELD_ERROR);
        isError = true;
    } else if ( new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email.value) === false) {
        View.fieldEntryError(email.nextElementSibling, INVALID_EMAIL);
        isError = true;
    } else { 
        View.fieldEntryError(email.nextElementSibling, "");
    }

    if (password.value === "") {
        View.fieldEntryError(password.nextElementSibling, EMPTY_FIELD_ERROR);
        isError = true;
    } else { 
        View.fieldEntryError(password.nextElementSibling, "");
    }

    if (phone.value === "") {
        View.fieldEntryError(phone.nextElementSibling, EMPTY_FIELD_ERROR);
        isError = true;
    } else if (new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(phone.value) === false) {
        View.fieldEntryError(phone.nextElementSibling, INVALID_PHONE);
        isError = true;
    } else { 
        View.fieldEntryError(phone.nextElementSibling, "");
    }

    return isError;
}

async function handleRegistrationRegisterButtonClicked (formData) {
    let isError = checkRegistrationUpdateForms();
    if (!isError) {
        let user = await Model.registerNewEmployee(formData);
        if (user !== 0) {
            // console.log ("Successfully registered " + user.firstName);
            loginEventListener(user.email, user.password);
        } else {
            if (debug) {console.log("error in registering user");}
        }
    } else {
        if (debug) {console.log ("Error in form");}
    }

}

function showRegistrationScreen() {
     View.registrationScreen();
    document.querySelector("span").classList.add("error");
    document.querySelector("#register").addEventListener("submit", function(e) {
            e.preventDefault();
            handleRegistrationRegisterButtonClicked(this);
    });
    document.querySelector("input[type=button]").addEventListener("click", showLoginScreen);
    document.querySelector("input[type=email]").addEventListener("blur", handleRegistrationEmail )
}

async function handleUpdateSettingsButtonClicked(formData) {
    // console.log(formData);
    let isError = checkRegistrationUpdateForms();
    if (!isError) {
        let response = await Model.updateEmployeeData(formData.elements);
        if (response.affectedRows !== 0) {
            if (debug) {console.log("successful update");}
            loginEventListener(formData.elements[2].value, formData.elements[3].value);
        } else {
            if (debug) {console.log("update failed");}
        }
    }
}

function showSettingsScreen(user) {
    View.settingsScreen(user);
    document.querySelector("#settings-page").addEventListener("submit", function(e) {
        e.preventDefault();
        handleUpdateSettingsButtonClicked(this);
    });
    document.querySelector("#back-button").addEventListener("click", () => loginSuccess(user))
}

function loginEventListeners() {

    document.querySelector("#login").addEventListener("submit", function(e) {
        e.preventDefault(); 
        let email = this.elements[0].value;
        let password = this.elements[1].value;
        loginEventListener(email, password);
    });

    document.querySelector("#newRegistrationButton").addEventListener("click", showRegistrationScreen);
}

function loginSuccess(user) {
    View.loginSuccess(user.firstName);
    document.querySelector("#settings-button input").addEventListener("click", function(e) {
        e.preventDefault();
        showSettingsScreen(user);
    }); 
    document.querySelector("#logout-button").addEventListener("click", () => {
        Model.updateLocalStorage("");
        showLoginScreen();
    })

}

function showLoginScreen() {
    View.loginScreen();
    loginEventListeners();
}

function init () {
    let user = Model.checkLocalStorage();
    if (user !== -1 ) {  // user is recognized
        loginSuccess(user);
    } else {
        showLoginScreen();
    }


}

export { init };