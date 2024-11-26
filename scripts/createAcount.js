const formL = document.getElementById('myForm');

formL.addEventListener('submit', evento => {

    evento.preventDefault();

    const formData = new FormData(formL)
    const data = Object.fromEntries(formData)

    // console.log(data)

    const URL = "http://localhost:4002/api/newUser";

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
                });
            }
            return res.json()
        })
        .then((data) => {

            if (!data.sucess) {
                return alert(data.message);
            }

            alert(data.message);
            return window.location.href = "../pages/login.html"

        })
        .catch((err) => {
            console.error(`Erro de internet: ${err}`)
        })

})