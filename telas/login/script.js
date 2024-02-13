var user = {}
let valid;

const urlGet = 'http://localhost:3000/dados';
const urlPost = 'http://localhost:3000/sendData';
const urlLogin = 'http://localhost:3000/login';

async function validation(event){
    event.preventDefault();

    let emailV = document.querySelector('#textEmail').value
    let password = document.querySelector('#pass').value;
    let token;
    const userSend = {
        email: emailV,
        senha: password,
    }
    alert('execução')
    try {
        const response = await axios.post(urlLogin, userSend)
        alert('execução requisição login')
        console.log(response);
        valid = response.data;
        token = response.headers['authorization'];
        console.log(token)
    } catch (error) {
        alert(`Erro ao receber dados: ${error}`)
        return;
    }
    if( valid.acess ){
        console.log(`Token from Authorization: ${token}`)
        alert(valid.msg);
        const { id, email, nome } = valid.data;
        user = { id, email, password, nome };

        try {
            await axios.post(urlPost, user, { headers: { 'authorization' : token } });
            setTimeout(()=>{
                console.log('Redirecionando...')
                window.location.href = '../index/index.html';
            }, 500)
        } catch (error) {
            alert(`Erro no envio de dados: ${error}`);
        }
    } else{
        alert(valid.msg);
    }
}


document.addEventListener('DOMContentLoaded', async()=>{
    const loginForm = document.querySelector('#formulario');

    loginForm.addEventListener('submit', (event)=>{
        validation(event);
    })

    // const eventClick = document.querySelector('.entrada');
    // const eventEnter = document.querySelector('.txtPass');

    // eventClick.addEventListener('click', validation);
    // eventEnter.addEventListener('keypress', async(e)=>{
    //     if( e.key == 'Enter' ){
    //         await validation(e);
    //     }
    // });
})

function cadRouter(){
    window.location.href = '../cadastro/cadastro.html'
}

function veri(){
    let varVer = document.querySelector('.text').value;
    let msg = document.querySelector('.warn');
    let regex1 = /@/g;
    let regex2 = /\./g;

    let tof = regex1.test(varVer);
    let tof1 = regex2.test(varVer);

    msg.style.opacity = tof == true && tof1 == true ? '0' : '0.9';
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