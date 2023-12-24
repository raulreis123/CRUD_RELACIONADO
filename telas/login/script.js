let receb;
var user = {
    id: 0,
    email: '',
    password: '',
    nome: ''
}

const urlGet = 'http://localhost:3000/dados';
const urlPost = 'http://localhost:3000/sendData';
const urlLogin = 'http://localhost:3000/login';

async function valid(){
    let emailV = document.querySelector('#textEmail').value
    let password = document.querySelector('#pass').value
    const userSend = {
        email: emailV,
        senha: password
    }
    
    try {
        const response = await axios.post(urlLogin, userSend)
        console.log(response);
        valid = response;
        receb = response.data.data;
        console.log(receb)
    } catch (error) {
        alert(`Erro ao receber dados: ${error}`)
    }

    if( valid.status == 200 ){
        alert('acesso permitido');
        const { id, email, nome } = receb;
        user = { id, email, password, nome };

        try {
            axios.post(urlPost, user);
            setTimeout(()=>{window.location.href = '../index/index.html';}, 1000)
        } catch (error) {
            alert(`Erro no envio de dados: ${error}`);
        }
    } else{
        alert('acesso negado');
    }
}

document.addEventListener('DOMContentLoaded', async()=>{
    const eventClick = document.querySelector('.entrada');
    const eventEnter = document.querySelector('.txtPass');

    eventClick.addEventListener('click', valid);
    eventEnter.addEventListener('keypress', async(e)=>{
        if( e.key == 'Enter' ){
            await valid();
        }
    });
})

function cadRouter(){
    window.location.href = '../cadastro/cadastro.html'
}

function veri(){
    let varver = document.querySelector('.text').value;
    let msg = document.querySelector('.warn');
    let regex1 = /@/g;
    let regex2 = /\./g;

    let tof = regex1.test(varver);
    let tof1 = regex2.test(varver);

    if(tof === true && tof1 === true){
        msg.style.opacity = '0';
    } else{ 
        msg.style.opacity = '0.9'; 
    }
}

function chbx(){
    let chbx = document.getElementById('chbox');
    let pass = document.getElementById('pass');

    if(chbx.checked){
        pass.type = 'text';
    } else{
        pass.type = 'password';
    }
}

async function hashCode(pass){
    const encoder = new TextEncoder();
    const stringBit = encoder.encode(pass);

    const hashBuffer = await crypto.subtle.digest('SHA-256', stringBit); //API nativa do navegador
    const hashConvert = Array.from(new Uint8Array(hashBuffer)) // convertido em hex de 8 bits (0 a 255)
    const hashHex = hashConvert.map(byte => byte.toString(16).padStart(2, '0')).join(''); //join contatena tudo na mesma string

    return hashHex;
}