document.addEventListener("DOMContentLoaded", () => {

    const URL = 'http://localhost:4002/manager/loadInfos';
    const container = document.querySelectorAll('.itemComprar');

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            const dados = data.dados;

            dados.forEach((dado, index) => {
                const itemDiv = container[index];  // Pega cada div correspondente ao index

                if (itemDiv) {
                    const imgElement = itemDiv.querySelector('img');
                    imgElement.src = dado.link || imgElement.src;

                    imgElement.id = `image-${dado._id}`;

                    imgElement.alt = dado.title

                }

            })

        })

})