let base64;
let prewview;
let file

document.addEventListener('DOMContentLoaded', ()=>{
    const forms = document.querySelector('#formulario');
    prewview = document.querySelector('.imagemRend');

    forms.addEventListener('submit', async(event)=>{
        event.preventDefault();

        let titleData = document.querySelector('.Intitle').value;
        let typeData = document.querySelector('#dataType').value;
        let contData = document.querySelector('#contPost').value;
        let userData = localStorage.getItem('dataUser');
        file = document.querySelector('input[type=file]').files[0];

        let userParse = JSON.parse(userData);
        console.log(userData)
        let data = {
            titulo: titleData,
            tipo: typeData,
            imagem: base64,
            conteudo: contData,
            usuario_id: userParse.id
        }

        //console.log(data);
    
        let computedStyle = window.getComputedStyle(prewview);
    
        if( computedStyle.height > computedStyle.width || !computedStyle ){
            alert('A imagem deve ser horizontal!');
            prewview.src = '';
            return;
        }

        console.log(file.type);

        if( file.type != "image/png" ){
            alert('A imagem deve ser PNG');
            return;
        }

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
    const reader = new FileReader();
    let fileParse = document.querySelector('input[type=file]').files[0];

    if(fileParse)

    if(fileParse){
        reader.readAsDataURL(fileParse);
    } else{
        alert('Arquivo inválido')
    }

    reader.onloadend = function (){
		prewview.src = reader.result;
        base64 = reader.result;
	}
}
