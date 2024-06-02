const formL = document.getElementById('myForm');

formL.addEventListener('submit', evento => {

    evento.preventDefault();

    const formData = new FormData(formL)
    const data = Object.fromEntries(formData)

    console.log('Enviado')

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
                return res.json().then(errorData => {
                    const errorMessage = errorData.message || "Erro desconhecido";
                    alert(errorMessage);
                    throw new Error(errorMessage);
                });
            }
            return res.json()
        })
        .then((data) => {
            alert(data.message)
        })
        .catch((err) => {
            console.error(`Erro de internet: ${err}`)
        })

})