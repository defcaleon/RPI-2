//DOM
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    body = document.querySelector('body'),
    btn = document.getElementById('bcBtn'),
    quote = document.getElementById('quote'),
    quoteBtn = document.getElementById('refreshQuote'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    weatherWind=document.querySelector('.weather-wind'),
    weatherHumidity=document.querySelector('.weather-humidity'),
    city = document.querySelector('.city'),

    arr_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    arr_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];


let base;
let i = 0;


//Show time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        dayWeek = today.getDay(),
        day = today.getDate(),
        month = today.getMonth();


    //Output

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = `${arr_week[dayWeek]}<span>, </span>${day} ${arr_month[month]}`;
    setTimeout(showTime, 1000);
}

//add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


//Set background and greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 5) {
        base = '../images/night/';
        greeting.textContent = 'Good Night';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        base = '../images/morning/';
        greeting.textContent = 'Good morning';
    } else if (hour < 18) {
        base = '../images/day/';
        greeting.textContent = 'Good Afternoon';
    } else {
        base = '../images/evening/';
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';

    }

    //every hour
    setTimeout(showTime, 1000 * 60 & 60);
    getImage(base);
}

//set name
function setName(e) {
    if (e.type === 'keypress') {
        //check enter press
        if (e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        if (name.innerHTML === '')
            name.innerHTML = buff_text;

            localStorage.setItem('name', e.target.innerText);

    }
}

//set focus
function setFocus(e) {
    if (e.type === 'keypress') {
        //check enter press
        if (e.keyCode === 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        if (focus.innerHTML === '') {
            focus.innerHTML = buff_text;
        }

            localStorage.setItem('focus', e.target.innerText);

    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        //check enter press
        if (e.keyCode === 13) {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
            city.blur();
        }
    } else {
        if (city.innerHTML === '') {
            city.innerHTML = buff_text;
        }
        localStorage.setItem('city', e.target.innerText);
    }

}

//get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//get city
function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather();
    }
}

function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage(base) {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false
    }, 1000);
}

async function getQuote() {
    const url = `https://api.chucknorris.io/jokes/random`;
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = data.value;

}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=32668db5559e877281a139dd47d93fee&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
        weatherIcon.className = 'weather-icon owf';
        city.textContent = 'Incorrect city name';
        temperature.innerHTML = ``;
        weatherDescription.textContent =  ``;
        weatherHumidity.innerHTML = ``;
        weatherWind.innerHTML = ``;
        return;
    }
    console.log("dddd");
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent='wind: '+data.wind.speed+' m/s';
    weatherHumidity.textContent='humidity: '+data.main.humidity+'%';

}




//Run

document.addEventListener('DOMContentLoaded', getQuote);
showTime();
setBgGreet();
getName();
getFocus();
getCity();


name.addEventListener('click', () => {
    buff_text = name.innerHTML;
    name.innerHTML = '';
})
name.addEventListener("keypress", setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', () => {
    buff_text = focus.innerHTML;
    focus.innerHTML = '';
})
focus.addEventListener("keypress", setFocus);
focus.addEventListener('blur', setFocus);
btn.addEventListener('click', () => {
    getImage(base)
});


quoteBtn.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', () => {
    buff_text = city.innerHTML;
    city.innerHTML = '';
})


