import * as Ajax from './modules/ajax.js'

let person = null;

function checkLocalStorage() {
    let personJSON = localStorage.getItem("user");
    if (personJSON != null) {
        person = JSON.parse(personJSON);
        return person.Table[0];
    } else {
        // console.log("no localStorage info");
        return -1;
    }
}

function updateLocalStorage(user) {  // if user is "" then delete the key from localStorage
    if (user !== "") {
        let userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
    } else {
        localStorage.removeItem("user");
    }
}

async function login(email, pwd) {
    var settings = {
        "url": "https://login-test-01-b40d33.appdrag.site/api/Login-Register-Update-Demo-Pages/Login",
        "data": {
            "email" : email,
            "password" : pwd,
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };

    const response = await Ajax.readData(settings);
    return (response.Table.length == 0)
    ? -1
    : response;
}

async function registerNewEmployee(theForm) {
    var token = "Token" + (Math.floor(Math.random() * 99999999) + 100000000);
    var formData = new FormData(theForm);
    formData.append("token", token);
    var arr = [];
    for (let item of formData.entries()) {
        // console.log(item[0] + ": " + item[1]);
        arr.push(item[1]);
    }
    var settings = {
        "url": "https://login-test-01-b40d33.appdrag.site/api/Login-Register-Update-Demo-Pages/Register",
        "data": {
            "fName" : arr[0],
            "lName" : arr[1],
            "email" : arr[2],
            "password" : arr[3],
            "phone" : arr[4],
            "token" : arr[5]
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    let user = 0;
    let response1 = await $.ajax(settings);
    if (response1.affectedRows !== 0) {
        let response2 = await login(arr[2], arr[3]);
        user = (response2.Table.length !== 0)
        ? response2.Table[0]
        : 0;
    }
    return user;
}

async function checkIfEmailExists(email) {
    var settings = {
        "url": "https://login-test-01-b40d33.appdrag.site/api/Login-Register-Update-Demo-Pages/getOneByEmail",
        "data": {
            "email" : email,
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "GET",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    let emailInUse = await Ajax.readData(settings);
    // console.log("email in use?");
    // console.log(emailInUse);
    return (emailInUse.Table[0] !== undefined)
        ? true
        : false

}

async function updateEmployeeData(user) {
    const userID = JSON.parse(localStorage.getItem("user")).Table[0].id;

    var settings = {
        "url": "https://login-test-01-b40d33.appdrag.site/api/Login-Register-Update-Demo-Pages/UpdateEmployeeData",
        "data": {
            "id" : userID,
            "firstName" : user[0].value,
            "lastName" : user[1].value,
            "email" : user[2].value,
            "password" : user[3].value,
            "phone" : user[4].value
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    let response = await $.ajax(settings);
    return response;
}

export { login, 
        checkLocalStorage, 
        updateLocalStorage, 
        registerNewEmployee, 
        checkIfEmailExists,
        updateEmployeeData
    }
