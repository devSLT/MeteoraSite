const formL = document.getElementById('myForm');

formL.addEventListener('submit', evento => {

    evento.preventDefault();

    const formData = new FormData(formL);
    const data = Object.fromEntries(formData);

    const URL = "http://localhost:4002/api/login";

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(errorData => {
                    const errorMessage = errorData.message || "Erro desconhecido";
                    alert(errorMessage);
                    throw new Error(errorMessage);
                })
            }
            return res.json()
        })
        .then((data) => {

            if (!data.sucess) {
                console.log(data.message)
                return alert(data.message);
            }

            const userId = data.userId;
            localStorage.setItem('userId', userId);
            alert(data.message);
            return window.location.href = "../pages/home.html"

        })
        .catch((err) => {
            console.error(`Error de internet: ${err}`)
        })

})