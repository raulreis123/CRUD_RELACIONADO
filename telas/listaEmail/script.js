const URLGet = 'http://localhost:3000/dados';
const URLDel = 'http://localhost:3000/delete';
const URLedit = 'http://localhost:3000/update';
let dataUpdateFunction; //variável para função em escopo global
// var valid = false;

function acessInterno(){ //função com o get de dados
    const container = document.querySelector('.container'); //selecionando o container dos dados
    

    async function dataUpdate(){ 
        try {
            var data = await getData(); //esperando dados vindos de getData

            container.textContent = ''; 
            for (let i = 0; i < data.length; i++){
                const container1 = document.createElement('div');
                const containerBtn = document.createElement('div');
                let testText = document.createElement('p'); //criando novo elemento pra cada repetição
                let btnEx = document.createElement('button');
                let btnUp = document.createElement('button');

                btnUp.innerHTML = 'Editar';
                btnEx.innerHTML = 'Excluir';
                testText.textContent = data[i].email; //inserindo o texto de dados

                containerBtn.classList.add('ctnBtn')
                testText.classList.add('cntrEmails');
                btnEx.classList.add('btnEx');
                btnUp.classList.add('btnUp');

                container1.appendChild(testText);
                containerBtn.appendChild(btnEx);
                containerBtn.appendChild(btnUp);
                container.appendChild(containerBtn)
                container.appendChild(container1);
                //console.log(testText);

                btnEx.onclick = ()=>{
                    var confirmDiv = document.querySelector('.containerConfirm');
                    let trBt = document.querySelector('#trBt');
                    let fsBt = document.querySelector('#fsBt');
                    confirmDiv.style.display = 'block';

                    fsBt.addEventListener('click', ()=>{ confirmDiv.style.display = 'none'; })

                    trBt.addEventListener('click', async()=>{
                        try{
                            const id = data[i].id;
                            console.log(id);
                            const resultado = await axios.delete(`${URLDel}?id=${id}`);
                            if(resultado.status === 200){
                                alert('Exclusão bem sucedida.');
                                confirmDiv.style.display = 'none';
                                dataUpdateFunction();
                            } else{
                                console.log('Exclusão mal sucedida', resultado.status)
                            }
                        } catch(error){
                            console.error('Erro durante exclusão', error)                        
                        }
                    }) 
                }

                btnUp.onclick = ()=>{
                    let userObj = {
                        nome: '',
                        senha: ''
                    }
                    var editDiv = document.querySelector('.containerEdit');
                    let trBt = document.querySelector('#trBt1');
                    let fsBt = document.querySelector('#fsBt1');
                    let vlSend = document.querySelectorAll('.sendObj');
                    editDiv.style.display = 'block';

                    fsBt.addEventListener('click', ()=>{editDiv.style.display = 'none'})

                    trBt.addEventListener('click', async()=>{
                        try {
                            const id = data[i].id;
                            console.log(id);
                            userObj.nome = vlSend[0].value;
                            userObj.senha = vlSend[1].value;
                            console.log(userObj)
                            const resultado = await axios.patch(`${URLedit}?id=${id}`, userObj)
                            if(resultado.status == 200){
                                alert('Usuário atualizado com sucesso.');
                                editDiv.style.display = 'none'
                            } else{ alert('Atualização mal sucedida' + error) }
                        } catch (error) {
                            alert('Erro durante exclusão: ' + error)
                        }
                    })
                }
            }

        } catch (error) {
            console.log('erro ao capturar dados: ' + error)
        }
    }
    
    async function getData(){ //recebendo dados do server
        var container = document.createElement('div');
        var text = document.createElement('p');

        try{
            response = await axios.get(URLGet);
            container.style.display = 'none';
            dados = response.data;
            console.log('dados recebidos com sucesso');
            return dados; //retornando coleção de users
        } catch (error) {
            console.log('Falha na conexão: ' + error);
            container.classList.add('dispServer');
            text.textContent = 'servidor indisponível no momento';
            container.appendChild(text);
            document.body.appendChild(container); //anexando container a um elemento existente
            console.log(text.textContent);
            throw error;
        }
    }

    dataUpdateFunction = dataUpdate; //Liberando para acesso global
}


document.addEventListener('DOMContentLoaded', ()=>{
    acessInterno(); // carregando função junto com a página
})

function dataVeri(){
    if(dataUpdateFunction){
        dataUpdateFunction(); 
    } else{ console.log('função indisponível, espere o carregamento da página'); }
}