const user = document.getElementById('uname');
const password = document.getElementById('pwd');

let IsLoggedIn = false;

// Login function
function Login() {
    fetch("./js/users.json").then(res => res.json())
        .then((data) => {
            data.forEach((result, index) => {
                if (result.username === user.value) {
                    if (result.password === password.value) {
                        IsLoggedIn = true
                        alert("Logged in Successfully!!")
                        sessionStorage.setItem("Data", JSON.stringify(result))
                        sessionStorage.setItem("IsLoggedIn", true)
                        setTimeout(() => {
                            location.assign("index.html")
                        }, 1000)
                    }
                }
            })
            if (!IsLoggedIn) {
                alert("Invalid Credentials!!")
            }
        }
        )
}

const showName = sessionStorage.getItem("Data")
const showLogin = sessionStorage.getItem("IsLoggedIn")
const Data = JSON.parse(showName)

//After Login
window.onload = function afterLogin() {
    const services_tab = document.getElementById('services');
    const booking_tab = document.getElementById('booking');
    const login_tab = document.getElementById('login');
    const reports_tab = document.getElementById('reports');
    const logout_tab = document.getElementById('logout');

    const name = document.getElementById("name")

    if (showLogin) {
        fetch("./js/users.json").then(res => res.json())
            .then((data) => {
                let userAdmin = false;
                data.forEach((result, index) => {
                    if (result.username === Data.username && result.password === Data.password && result.name === "Admin") {
                        userAdmin = true
                        return true
                    }
                })

                switch (userAdmin) {
                    case true:
                        if (login_tab) {
                            login_tab.remove();
                        }
                        if (services_tab) {
                            services_tab.remove();
                        }
                        if (booking_tab) {
                            booking_tab.remove();
                        }
                        name.innerHTML = `Hi, ${Data.name} |`
                        break;
                    default:
                        if (login_tab) {
                            login_tab.remove();
                        }
                        if (reports_tab) {
                            reports_tab.remove();
                        }
                        name.innerHTML = `Hi, ${Data.name} |`
                }
            })
    } else {
        if (services_tab) {
            services_tab.remove();
        }
        if (booking_tab) {
            booking_tab.remove();
        }
        if (reports_tab) {
            reports_tab.remove();
        }
        if (logout_tab) {
            logout_tab.remove();
        }
    }
}

if (showLogin) {
    if (Data.name === "Admin") {
        document.getElementById('exploreBtn').style.display = 'none';
    }
}

//Explore Button Home
const exploreNow = () => {
    if (showLogin) {
        location.assign("services.html")
    } else {
        location.assign("login.html")
    }
}

//Service More Details
const MoreDetails = (e) => {
    console.log(e)
    location.assign(`${e}.html`)
}

// Go to back page
function goBack() {
    history.back()
}

// Book Service
function bookService() {
    const url = window.location.pathname.split("AutoMob/");
    const storeUrl = url[1].replace('.html', '')
    sessionStorage.setItem("URL", storeUrl)
    location.assign('booking.html')
}

// Book service select dropdown
function serviceDropdown() {
    const service = sessionStorage.getItem("URL")
    const getUrl = window.location.pathname.split("AutoMob/")

    if (getUrl[1] === "booking.html") {
        const selectSer = document.getElementById("selectService").options
        const opts = [...selectSer].map(el => el);
        opts.forEach(element => {
            const elMain = element.innerHTML
            const el = elMain.toLowerCase().split(" ").join("-")
            if ((el === service) === true) {
                element.setAttribute("selected", true)
            }
        });

        const appointment = new Date().toISOString().split('T')[0];
        document.getElementById("appointmentDate").setAttribute('min', appointment);
    }
}
serviceDropdown()

// Booking submit data
const nameFull = document.getElementById("nameFull");
const emailId = document.getElementById("emailId");
const phone = document.getElementById("phNo");
const selectService = document.getElementById("selectService");
const make = document.getElementById("carMake");
const model = document.getElementById("carModel");
const fuelType = document.getElementById("fuelType");
const appointmentDate = document.getElementById("appointmentDate");
const address = document.getElementById("address");
const formElem = document.getElementById("formElem");

formElem.addEventListener("submit", (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('name', nameFull.value)
    formData.append('email', emailId.value)
    formData.append('phone', phone.value)
    formData.append('service', selectService.value)
    formData.append('make', make.value)
    formData.append('model', model.value)
    // formData.append('fuelType', fuelType.value)
    formData.append('appointment', appointmentDate.value)
    formData.append('address', address.value)

    var bookings = [];
    var obj = {};

    for (let [name, value] of formData) {
        obj[name] = value;

        bookings.push(obj)
    }

    const data = JSON.stringify(bookings)

    localStorage.setItem("bookings", data)

    var retrievedPerson = JSON.parse(localStorage.getItem('bookings'))

    console.log(retrievedPerson)

    localStorage.clear();
})


// Booking successfull popups
function bookingSuccess() {
    const getUrl = window.location.pathname.split("AutoMob/")
    if (getUrl[1] === "booking-success.html") {
        setTimeout(() => {
            prompt('On scale of 1-10, howlikely are you to recommend our website to your friends & family?', 100);
            alert(`Thank you for your feedback`);
            location.assign("index.html")
        }, 1000)
    }
}
bookingSuccess()

//Logout
const logout = document.getElementById("logout");

function Logout() {
    sessionStorage.clear()
    alert("Logged out Successfully")
    location.assign("index.html")
}

// Offer count
var endDate = new Date("06-07-2022");
endDate.setDate(endDate.getDate() + 2);
let endTime = endDate.getTime();
const counter = document.getElementById("counter")
let todayDate = new Date();
let todayTime = todayDate.getTime();
let remainingTime = endTime - todayTime;
let oneMin = 60 * 1000;
let oneHr = 60 * oneMin;
let oneDay = 24 * oneHr;
let daysLeft = Math.floor(remainingTime / oneDay);

function countdown() {
    if (counter != null) {
        if (endTime < todayTime) {
            counter.innerHTML = "Offer Ends!!!";
        } else {
            const test = `${daysLeft} days`
            counter.innerHTML = test
        }
    }
}
countdown();