var user = {
    id: 0,
    email: '',
    senha: '',
    nome: ''
}

const urlPost = 'http://localhost:3000/registro'; 
const URLGet = 'http://localhost:3000/dados';

function veri(){
    var connVeri = document.querySelectorAll('.inPass');
    var emailInput = document.querySelector('.email').value;
    var nameInput = document.querySelector('.nome').value;

    var emailExists = false;

    async function main(){
        try {
            const resp = await getData();
        
            for (let i = 0; i < resp.length; i++) {
                //console.log(resp)
                if( emailInput === resp[i].email ){
                    alert('Este email já existe');
                    emailExists = true;
                    break;
                }
            }

        } catch (error) {
            console.log('erro encontrado', error)
        }

        if(!emailExists){
            if( connVeri[0].value == connVeri[1].value ){       
                // var passHash = await hashCode(connVeri[0]);
                // console.log(passHash);
                user.email = emailInput;
                user.senha = connVeri[0].value;
                user.nome = nameInput;
    
                console.log(user.email);
                console.log(user.senha);
                console.log(user.nome);
    
                axios.post(urlPost, user)
                .then(response => {
                    console.log('Resposta:', response.data);
                    alert("Dados cadastrados!");
                    setTimeout(()=>{
                        window.location.href = "../login/login.html";
                    }, 2000)
    
                })
                .catch(error => {
                    console.error('erro:', error);
                });
                
            } else{ 
                alert('Senhas não condizente!');
                connVeri.forEach(function(element){
                    element.value = '';
                });
            }
        } 
         
    }

    async function getData(){
        try {
            const response = await axios.get(URLGet);
            const dados = response.data;
            return dados;
        } catch (error) {
            console.log('erro ao obter dados', error)
        }
        
    }

    main();


}

// async function hashCode(stringTohash){
//     const encoder = new TextEncoder();
//     var stringBit = encoder.encode(stringTohash);

//     const hashBuffer = await crypto.subtle.digest('SHA-256', stringBit); //API nativa do navegador
//     const hashConvert = Array.from(new Uint8Array(hashBuffer)) // convertido em hex de 8 bits (0 a 255)
//     const hashHex = hashConvert.map(byte => byte.toString(16).padStart(2, '0')).join(''); //join contatena tudo na mesma string

//     return hashHex;
// }


function chbx(){
    var ch = document.querySelector('#checkbx');
    var inPass = document.querySelectorAll('.inPass');

    if( ch.checked ){
        inPass.forEach(function(element){
            element.type = 'text';
        });
    } else{
        inPass.forEach(function(element){
            element.type = 'password';
        });
    }
}