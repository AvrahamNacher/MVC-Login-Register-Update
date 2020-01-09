
const loginHTML = `
    <h1>
        Demo Login Page
    </h1>
    <form id="login">
        <div>
            <label for="email">Email address:</label>
            <input type="email" id="email" name="email">
        </div>
        <div>
            <label for="pwd">Password:</label>
            <input type="password" id="pwd" name="pwd">
        </div>

        <input class="btn" type="submit" value="Login">
        <div id="login-error-msg" class="error-text"></div>
    </form>
    <div>
        <div class="dividing-line"></div>
        <div id="newRegistrationButton">Not yet a member?</div>
    </div>
    `;

    const registerHTML = `
    <form id="register">
        <div>
            <h2>Enter Your Registration Details</h2>
            <div>
                <input type="text" name="fName" placeholder="First Name">
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="text" name="lName" placeholder="Last Name">
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="email" name="email" placeholder="Email">
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="password" name="pwd" placeholder="Password">
                <span></span>  <!-- Error message Here -->
            </div>
            <div>
                <input type="phone" name="phone" placeholder="Phone">
                <span></span>  <!-- Error message Here -->
            </div>
            <input class="btn" id="back-button" type="button" value="Back">
            <input class="btn" type="submit" value="Register">

        </div>
    </form>
    `;

    

    export { loginHTML, registerHTML }