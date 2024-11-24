const item = document.querySelectorAll('.itemComprar');

item.forEach((element) => {
    element.addEventListener('click', () => {
        const imageDiv = element.querySelector('img');

        const removeCH = imageDiv.id.replace(/^image-/, '');

        localStorage.setItem('imageId', removeCH)

        const idImage = localStorage.getItem('imageId');

        const data = {
            idImage
        }

        const URL = 'http://localhost:4002/manager/getInfos';

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
                        console.log(errorMessage);
                        throw new Error(errorMessage);
                    })
                }
                return res.json()
            })
            .then((data) => {

                if (!data.sucess) {
                    return alert(data.message)
                }

                return window.location.href = "../pages/buyPage.html";

            })
            .catch((err) => {
                console.error(`Error de internet: ${err}`)
            })

    })
})

