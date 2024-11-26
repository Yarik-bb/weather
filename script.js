
const API_KEY = '303fc5ee6b3aa815eb6709a3cdf295ae'; 


const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.getElementById('get-weather').addEventListener('click', function () {
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        alert("Будь ласка, введіть місто!");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uk&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Місто не знайдено. Перевірте назву.");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;

            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('description').textContent = weatherDescription;
        })
        .catch(error => {
            alert(error.message);
        });
});


document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const nickname = document.getElementById('nickname').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (nickname === "" || comment === "") {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    document.getElementById('user-name').textContent = nickname;
    document.getElementById('user-comment').textContent = comment;

    alert("Дякуємо за ваш відгук!");
});


const randomComments = [
    { name: "Олександр", comment: "Чудовий сервіс, дякую!" },
    { name: "Марія", comment: "Було б добре бачити прогноз на тиждень." },
    { name: "Іван", comment: "Все працює, як і очікував!" },
    { name: "Олена", comment: "Дуже зручно, рекомендую!" },
    { name: "Михайло", comment: "Прогноз погоди точний, дякую!" }
];

function displayRandomComments() {
    const commentsContainer = document.getElementById('random-comments');
    commentsContainer.innerHTML = "";

    const randomIndex = Math.floor(Math.random() * randomComments.length);
    const randomComment = randomComments[randomIndex];

    const commentElement = document.createElement('li');
    commentElement.innerHTML = `<strong>${randomComment.name}:</strong> ${randomComment.comment}`;
    commentsContainer.appendChild(commentElement);
}


window.onload = displayRandomComments;
