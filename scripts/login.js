const formL = document.getElementById('myForm');

formL.addEventListener('submit', evento => {

    evento.preventDefault();

    const formData = new FormData(formL)
    const data = Object.fromEntries(formData)

    console.log(data)

    const URL = "https://meteora-api-theta.vercel.app/login";

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
            if (data.message =="Login realizado com sucesso") {
                window.location.href = "../pages/home.html"
            } else {
                alert(data.message)
            }
        })
        .catch((err) => {
            console.error(`Error de internet: ${err}`)
        })

})