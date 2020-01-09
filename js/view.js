import * as Views from './modules/views.js'


let containerElement = document.querySelector(".container");

function loginScreen() {
    containerElement.innerHTML = Views.loginHTML;
}

function loginSuccess(name) {
    containerElement.innerHTML = `
    <div id="settings-button">
        <input class="btn" type="button" value="Settings"/>
    </div>
    <div class="success-text" id="welcome-screen-message">Welcome, ${name}!
    </div>
    <input class="btn" id="logout-button" type="button" value="Logout">
    `;
    // document.querySelector("#welcome-screen-message").classList.add("success-text");
}

function loginFailure(msg) {
    // containerElement.innerHTML = Views.loginHTML;
    document.querySelector("#login-error-msg").innerHTML=msg;
}

function registrationScreen() {
    containerElement.innerHTML = Views.registerHTML;
}

function fieldEntryError(element, msg) {
    element.innerHTML = msg;

}

function settingsScreen(user) {
    containerElement.innerHTML =  `
    <form id="settings-page">
        <div>
            <h2>Update Your Details</h2>
            <div>
                <input type="text" name="fName" placeholder="First Name" value=${user.firstName}>
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="text" name="lName" placeholder="Last Name" value=${user.lastName}>
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="email" name="email" placeholder="Email" value=${user.email}>
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="password" name="pwd" placeholder="Password" value=${user.password}>
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="phone" name="phone" placeholder="Phone" value=${user.phone}>
                <span></span>  <!-- Error message Here -->
            </div>
            <input class="btn" id="back-button" type="button" value="Back">
            <input class="btn" type="submit" value="Update">
        </div>
    </form>
    `
}

export { loginScreen, 
    loginSuccess, 
    loginFailure, 
    registrationScreen,
    fieldEntryError,
    settingsScreen
}