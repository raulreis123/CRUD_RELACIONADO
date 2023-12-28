const urlGet = 'http://localhost:3000/index';
const urlGetPost = 'http://localhost:3000/getPost';
const urlPatch = 'http://localhost:3000/update';
const urlDel = 'http://localhost:3000/deletePost';
var conPass; //input de confirmação de senha na sessão 'Meus Dados'
var conBtn; //botão de confirmação de senha na sessão 'Meus Dados'
var valid; //input que armazena a senha do user
var dataUser; //dados do usuário
var dataPost; //dados das postagens
var responsePost; //postagens geradas no HTML

function userMain(){
    var dispMain = document.querySelector('.userMain');

    if (dispMain.style.height == '100px') {
        dispMain.style.height = '0px';
    } else {
        dispMain.style.height = '100px';
    }
}

//Atualização de usuário
async function upUser(){
    let vlSend = document.querySelectorAll('.dtUpUser');
    try {
        let userObj = {
            nome: vlSend[0].value,
            senha: vlSend[1].value
        };
        console.log(userObj)
        const id = dataUser.id;
        const response = await axios.patch(`${urlPatch}?id=${id}`, userObj)
        if(response.status == 200){
            alert('Usuário atualizado com sucesso, refaça login.');
            exit();
        } else{ alert('Atualização mal sucedida' + error) }
    } catch (error) {
        alert('Erro interno: ' + error)
    }
}

function closeUpUser(){
    let secMain = document.querySelector('.upUser');
    secMain.style.display = 'none';
}

//Pegar dados do usuário
async function getDataUser(){
    try {
        let response = await axios.get(urlGet);
        let dados = response.data;
        // console.log(dados)
        return dados.data;
    } catch (error) {
        console.error(error);
    }
}

async function getDataPost(){
    try {
        let response = await axios.get(urlGetPost);
        let dados = response.data;
        return dados;
    } catch (error) {
        alert('Servidor indisponível!')
        console.error(error)
        window.location.reload(true);
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    let dataLS;
    let dataLSP;
    dataLSP = await getDataPost();
    dataLS = await getDataUser();
    //console.log(dataLS)

    //console.log(dataLS);

    if(!localStorage.getItem('dataUser')){
        localStorage.setItem('dataUser', JSON.stringify(dataLS))
    }

    localStorage.setItem('dataPost', JSON.stringify(dataLSP));
    //console.log(localStorage.getItem('dataPost'))
    
    let createAt = JSON.parse(localStorage.getItem('dataUser'));
    let createAtP = JSON.parse(localStorage.getItem('dataPost'));

    if( createAt === null || createAt === undefined ){
        alert('Realize o login para acessar!');
        window.location.href = '../login/login.html';
    }

    dataUser = createAt;
    console.log(createAt);

    responsePost = postGenerator(createAtP);

    // Side menu objects
    const objects = document.querySelectorAll('.pMl');
    const editUser = document.querySelector('#editUser');
    console.log(editUser)
    let categories = objects[1];
    let myPost = objects[2];

    //Filtro de categorias
    categories.addEventListener('click', ()=>{
        const divCategories = document.querySelector('.categorias')

        if(divCategories.style.height == '90px'){
            divCategories.style.height = '0px';
        } else{ divCategories.style.height = '90px'; }
    })

    //Filtro "minhas postagens"
    myPost.addEventListener('click', ()=>{
        responsePost.forEach((item) => {
            const computedStyle = window.getComputedStyle(item);
            const isVisible = computedStyle.display !== 'none';

            if(isVisible){
                if( computedStyle.display == 'block'  ){
                    if(Number(item.id) !== createAt.id ){
                        //console.log(item.id)
                        item.style.display = 'none';
                    }
                }
            }else{ item.style.display = 'block' }
        })
    })

    editUser.addEventListener('click', ()=>{
        let divCont = document.querySelector('.upUser');

        let ternaryOp = divCont.style.display == 'block';
        if( ternaryOp ){ divCont.style.display = 'none' } else{ divCont.style.display = 'block' }
    })
})

function categoriesFilter(label){
    let type = label.textContent;
    
    responsePost.forEach(item =>{
        console.log(type)
        //ternary operator         has all     or         has class
        const shouldDisplay = type === 'Todos' || item.classList.contains(type);
        item.style.display = shouldDisplay ? 'block' : 'none';
    }) //                    operator    condição
}

//Mostrar menu de usuário
function showUser(){
    var showData = document.querySelectorAll('.showData');
    showData[0].value = dataUser.nome;
    showData[1].value = dataUser.email;
    showData[2].value = dataUser.password;
    //alert(showData)
    var cont = document.querySelector('.showUser');
    if (cont.style.display == 'block') {
        cont.style.display = 'none';
        conPass.style.display = 'none';
        conBtn.style.display = 'none';
        valid.type = 'password';
        conPass.value = ''; 
    } else {
        cont.style.display = 'block';
    }
}

function funPass(){
    conPass = document.querySelector('.confirmPass');
    conBtn = document.querySelector('.btnConPass');
    conPass.style.display = 'block';
    conBtn.style.display = 'block';
}

//validação de senha para exibi-la ao usuário
function validPass(){
    valid = document.querySelector('.pass');

    if( conPass.value == dataUser.data.password ){
        valid.type = 'text';
    } else{
        alert('Senha incorreta!');
        conPass.value = ''; 
    }
}

//Deletar dados de usuário
function exit(){
    localStorage.removeItem('dataUser');
    localStorage.removeItem('dataPost');
    alert('removido')
    window.location.href = '../login/login.html';
    
}

function menuLat(){
    const contBar = document.querySelector('.menuLateral');

    if( contBar.style.transform == 'translateX(0px)' ){
        contBar.style.transform = 'translateX(-250px)';
    } else { contBar.style.transform = 'translateX(-0px)'; }
}

//Direcionamento à aba de nova postagem
function newPost(){
    window.location.href = '../postagem/post.html';
}

//Gerador de posts
function postGenerator(post){
    // console.log(post)
    const primarySec = document.querySelector('.contVal');
    let divContArray = [];

    if(Array.isArray(post)){
        post.forEach(item => {
            //console.log(item)
            let divCont = document.createElement('div');
            let divHead = document.createElement('div');
            let title = document.createElement('label');
            let type = document.createElement('label');
            let imagePost = document.createElement('img');
            let imageURL = 'data:image/png;base64,' + item.imagem;
            imagePost.src = imageURL;
            let conteudo = document.createElement('label');
            let separ = document.createElement('br');
    

            type.textContent = `(${item.tipo})`;
            title.textContent = item.titulo;
            //imagePost.src = 'data:image/jpeg;base64,' + item.imagem;


            let sizeCont = document.createElement('p');
            sizeCont.textContent = 'Ver mais...';
            sizeCont.style.cursor = 'pointer';
            sizeCont.style.color = 'blue';
        

            sizeCont.addEventListener('click', ()=>{
                showPost(item, imageURL);
            });
        

            let conteudoCortado = document.createElement('span');
            conteudoCortado.textContent = item.conteudo.substring(0, 100) + '...';
            
            conteudo.appendChild(conteudoCortado);
            conteudo.appendChild(sizeCont);
            
    
            divCont.classList.add('displayMidia');
            divHead.classList.add('displayHeadMidia');
            title.classList.add('titleCont');
            imagePost.classList.add('imagePost');
            
            imagePost.style.maxHeight = '100px';

            divHead.appendChild(title);
            divHead.appendChild(type);
            divCont.appendChild(divHead);
            divCont.appendChild(imagePost);
            divCont.appendChild(separ)
            divCont.appendChild(conteudo);
            divCont.id = item.usuario_id;
            divCont.classList.add(item.tipo);
    
            primarySec.appendChild(divCont);
            
            divContArray.push(divCont);
        });
    } else{ alert('Array inválido') }

    return divContArray;
}

//Mostrar informações de postagem
function showPost(postInfo, recImage){
    let secMain = document.querySelector('.showPost');
    let imagePost = document.createElement('img');
    let parTitle = document.createElement('p');

    imagePost.src = recImage;
    parTitle.textContent = postInfo.titulo;
    parTitle.style.fontSize = '25px';

    imagePost.style.maxHeight = '300px';

    let computedStyle = window.getComputedStyle(secMain);
    let transform = computedStyle.getPropertyValue('transform');
    let divMain = document.createElement('div');

    divMain.style.textAlign = 'center';
    divMain.style.overflow = 'auto';

    let btn = document.createElement('button');
    let btnEx;
    btn.textContent = 'Sair';
    
    btn.classList.add('postBtn');
    

    divMain.appendChild(parTitle);
    divMain.appendChild(document.createElement('p')).textContent = `(${postInfo.tipo})`;
    // console.log(imagePost)
    divMain.appendChild(imagePost);
    divMain.appendChild(document.createElement('p')).textContent = postInfo.conteudo;;

    divMain.appendChild(btn);
    
    if( transform == 'matrix(1, 0, 0, 1, -1662.5, 0)'){
        secMain.style.transform = 'translateX(-50%)';
        secMain.appendChild(divMain);
    } else { 
        secMain.style.transform = 'translateX(-237.5%)';
        secMain.textContent = '';
    }

    //Exclusão apenas para criador
    if( postInfo.usuario_id === dataUser.id ){
        let btnEx = document.createElement('button');
        btnEx.textContent = 'Excluir';
        btnEx.classList.add('postBtnEx');
        divMain.appendChild(btnEx);

        btnEx.addEventListener('click', async()=>{
            try {
                let postId = postInfo.id;
                const response = await axios.delete(`${urlDel}?id=${postId}`);

                if(response.status === 200){
                    alert('Exclusão feita com sucesso!');
                    window.location.reload(true);
                } else{ throw new Error('Problema na operação') }
            } catch (error) {
                console.error(error.msg);
            }
        })
    }else{
        console.log('inapto');
    }

    btn.addEventListener('click', ()=>{
        secMain.style.transform = 'translateX(-237.5%)';
        setTimeout(()=>{
            secMain.textContent = '';
        }, 2000)
    })
}

// Limpar localStorage ao fechamento de aba
let isTabClosing = false

window.addEventListener('beforeunload', () => {
    if (isTabClosing) {
        localStorage.removeItem('dataUser');
        localStorage.removeItem('dataPost');
    }
});

window.addEventListener('visibilitychange', ()=>{
    if( document.visibilityState === 'hidden' ) {
        isTabClosing = true;
    }
})