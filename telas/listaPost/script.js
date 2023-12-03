const urlGet = 'http://localhost:3000/getPost';
const urlDel = 'http://localhost:3000/deletePost';

async function getPost(){
    try {
        const response = await axios.get(urlGet);
        if(response.status == 200){
            console.log(response.data.msg);
            postGenerator(response.data)
        } else { throw new Error('Erro na solicitação'); }
    } catch (error) {
        console.error('Erro durante solicitação' + error);
    }
}

function postGenerator(post){
    const main = document.querySelector('.container');
    main.textContent = '';
    
    post.forEach(elm => {
        let container = document.createElement('div')
        let title = document.createElement('label');
        let type = document.createElement('label');
        let exBtn = document.createElement('button');

        title.textContent = elm.titulo;
        type.textContent = `(${elm.tipo})`;
        exBtn.textContent = 'Excluir'

        exBtn.addEventListener('click', async()=>{
            try {
                let postId = elm.id;
                const response = await axios.delete(`${urlDel}?id=${postId}`);

                if(response.status === 200){
                    alert('Exclusão feita com sucesso!');
                    getPost();
                } else{ throw new Error('Problema na operação') }
            } catch (error) {
                console.error(error);
            }
        })

        container.classList.add('containerPost');
        title.classList.add('title');
        type.classList.add('tipoMd');
        exBtn.classList.add('btnEx');

        container.appendChild(title);
        container.appendChild(type);
        container.appendChild(exBtn);
        main.appendChild(container);
    });
}