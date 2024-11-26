// Carregando Imagens e dados ao carregar a pagina
document.addEventListener("DOMContentLoaded", () => {

    const URL = 'http://localhost:4002/manager/getInfos';

    const idImage = localStorage.getItem('imageId')

    if (!idImage) {
        return alert("Tente voltar para home e acessar novamente está página");
    }

    const boxImage = document.querySelector('.boxImage');
    const boxBuy = document.querySelector('.boxBuy');

    const data = {
        idImage
    }

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            // console.log(data)
            const dados = data.dados;

            //Acessar a boxImage e alterar a src da imagem

            const images = boxImage.querySelectorAll('img');
            images.forEach(img => {
                img.src = dados.link;
                img.alt = dados.title
            });

            //Acessando boxBuy
            // console.log(boxBuy)

            const titleBuy = boxBuy.querySelector('.titleBuy');
            const title = titleBuy.querySelector('h2');
            const desc = titleBuy.querySelector('p');
            title.innerText = dados.title;
            desc.innerText = dados.desc

            const priceBuy = boxBuy.querySelector('.priceBuy');
            const price = priceBuy.querySelector('.price');
            const qtd = priceBuy.querySelector('.qtd');
            price.innerText = dados.price + ',00';
            qtd.innerText = dados.stockQTD

        })

});

//Enviar ao backEnd infos
document.getElementById('buttonBuy').addEventListener('click', () => {
    const idImage = localStorage.getItem('imageId');
    const userId = localStorage.getItem('userId');

    if (!idImage) {
        return alert('Tente retornar para a tela inicial e acessar novamente.');
    }

    if (!userId) {
        return alert('Faça Login novamente para prosseguir.')
    }

    const URL = 'http://localhost:4002/manager/buyItem';

    const data = {
        idImage,
        userId
    }

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            alert(data.message);
            if (!data.sucess) {
                return window.location.href = "../pages/buyPage.html"
            }

            return window.location.href = "../pages/home.html"

        })

})
