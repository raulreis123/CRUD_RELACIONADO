let receb;
var user = {
    id: 0,
    email: '',
    password: '',
    nome: ''
}

const urlGet = 'http://localhost:3000/dados';
const urlPost = 'http://localhost:3000/sendData';

document.addEventListener('DOMContentLoaded', getData);

async function getData(){
    try {
        axios.get(urlGet)
        .then(response => {
            receb = response.data;
            console.log(receb)
        })
        .catch(error => {
            alert('Erro ao obter dados do servidor:', error);
            window.location.reload(true);
        });
    } catch (error) {
        alert('Não foi possível obter os dados' + error)
    }
    
}


async function valid(){
    let emailV = document.querySelector('#textEmail').value
    let password = document.querySelector('#pass').value
    let passV;
    let key = 0;
    var valid = false;
    
    for (let i = 0; i < receb.length; i++) {
        try {
            passV = await hashCode(password);
            console.log(passV)
        } catch (error) {
            console.log('Não foi possivel realizar a autenticação: ' + error)
        }

        if( emailV == receb[i].email && passV == receb[i].senha ){
            valid = true;
            key = i;
            break;
        } 
    }

    if( valid ){
        alert('acesso permitido');
        user.id = receb[key].id;
        user.email = receb[key].email;
        user.password = password;
        user.nome = receb[key].nome;
        try {
            axios.post(urlPost, user);
            setTimeout(()=>{window.location.href = '../index/index.html';}, 1000)
        } catch (error) {
            alert(error)
        }
    } else{
        alert('acesso negado');
    }

    // console.log(/*receb[0].email*/Object.values(receb));
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
    var varver = document.querySelector('.text').value;
    var msg = document.querySelector('.warn');
    var regex1 = /@/g;
    var regex2 = /\./g;

    var tof = regex1.test(varver);
    var tof1 = regex2.test(varver);

    if(tof === true && tof1 === true){
        msg.style.opacity = '0';
        //console.log('email invalido');
    } else{ 
        msg.style.opacity = '0.9';
        //console.log('email valido') 
    }
}

function chbx(){
    var chbx = document.getElementById('chbox');
    var pass = document.getElementById('pass');

    console.log(pass);

    if(chbx.checked){
        pass.type = 'text';
    } else{
        pass.type = 'password';
    }
}

async function hashCode(pass){
    const encoder = new TextEncoder();
    var stringBit = encoder.encode(pass);

    const hashBuffer = await crypto.subtle.digest('SHA-256', stringBit); //API nativa do navegador
    const hashConvert = Array.from(new Uint8Array(hashBuffer)) // convertido em hex de 8 bits (0 a 255)
    const hashHex = hashConvert.map(byte => byte.toString(16).padStart(2, '0')).join(''); //join contatena tudo na mesma string

    return hashHex;
}