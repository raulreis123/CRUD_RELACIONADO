var base64;

document.addEventListener('DOMContentLoaded', ()=>{
    const forms = document.querySelector('#formulario');

    forms.addEventListener('submit', async(event)=>{
        event.preventDefault();

        let titleData = document.querySelector('.Intitle').value;
        let typeData = document.querySelector('#dataType').value;
        let contData = document.querySelector('#contPost').value;
        let userData = localStorage.getItem('dataUser');

        let userParse = JSON.parse(userData);
        console.log(userData)
        let data = {
            titulo: titleData,
            tipo: typeData,
            imagem: base64,
            conteudo: contData,
            usuario_id: userParse.id
        }

        console.log(data);
    
    
        await axios.post('http://localhost:3000/cadPost', data)
        .then(response => {
            alert(response.data);
            window.location.href = '../index/index.html';
        })
        .catch(error => {
            console.error('erro:', error);
        });    
    })
})

function sendImage(){
    let prewview = document.querySelector('.imagemRend');
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.onloadend = function (){
		prewview.src = reader.result;
        base64 = reader.result;
	}

    if(file){
        reader.readAsDataURL(file);
    } else{
        alert('Arquivo inválido')
    }
}
