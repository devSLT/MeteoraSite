const formL = document.getElementById('myForm');

formL.addEventListener('submit', evento => {

    evento.preventDefault();

    const formData = new FormData(formL)
    const data = Object.fromEntries(formData)

    console.log(data)

    const URL = "http://localhost:8080/newUser";

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (!res.ok) {
                console.log(`Erro de requisição`)
            }
            return res.json()
        })
        .then((data) => {
            console.log(data)
            alert(data.message)
        })
        .catch((err) => {
            console.error(`Error de internet: ${err}`)
        })

})