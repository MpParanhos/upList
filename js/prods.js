//Referências do DOM HTML

const tbodyList = document.getElementById('tbodyList');

const lblCod = document.getElementById('lblCod');
const inpNome = document.getElementById('inpNome');
const inpDesc = document.getElementById('inpDesc');
const inpQtda = document.getElementById('inpQtda');
const inpFab = document.getElementById('inpFab');

const btnAlterar = document.getElementById('btnAlterar');

const btnFirst = document.getElementById('btnFirst');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnLast = document.getElementById('btnLast');

const popUp = document.querySelector('.popUpWrapper');

let data, numberElements;

let state = {
    page: 1,
    totalPage: 0
};

const api = axios.create({
    baseURL:'http://18.224.8.119:3334/',
});

function consultaGeral(){
    console.log('Consulta de dados ...');
    api.get('produtos').then(res=>{
        console.log('Realizando a consulta ...');
        data = res.data;
        numberElements = data.length;
        //console.log(numberElements);

        state = {
            page: 1,
            totalPage: Math.ceil(numberElements / 5)
        }
        //console.log(state.totalPage);
        populateList();        
    })
}

function populateList(){
    let i, tr;
    tbodyList.innerHTML='';

    let initPage = state.page -1;
    let startCorte = initPage * 5;
    let endCorte = startCorte + 5;

    for (i = 0; i < data.length; i++){
        tr = '<tr>' +
                '<td>' + data[i].cod + '</td>' +
                '<td>' + data[i].nome + '</td>' +
                '<td>' + data[i].descri + '</td>' +
                '<td>' + data[i].qtda + '</td>' +
                '<td>' + data[i].fabricante + '</td>' +
                '<td>' + data[i].datahora + '</td>' +
                '<td> <a id="btnUpdate" onclick="onEdit(this)"> <img class="imgUpdate" src="../img/updateIcon.png"></img> </a></td>' 
             '</tr>';
        tbodyList.innerHTML += tr;
    };
}

function onEdit(td){
    let dataSelection = td.parentElement.parentElement;
    
    popUp.style.display= 'block'
    lblCod.innerHTML = dataSelection.cells[0].innerHTML;
    console.log(dataSelection);
    inpNome.value = dataSelection.cells[1].innerHTML;
    inpDesc.value = dataSelection.cells[2].innerHTML;
    inpQtda.value = dataSelection.cells[3].innerHTML;
    inpFab.value = dataSelection.cells[4].innerHTML;
}

function updateProds(){
    let codProd = lblCod.innerHTML;
    let nomeProd = inpNome.value;
    let descProd = inpDesc.value;
    let qtdaProd = inpQtda.value;
    let fabProd = inpFab.value;

    data = {
        'nome': nomeProd,
        'descri': descProd,
        'qtda': qtdaProd,
        'fabricante': fabProd
    };

    console.log('Código do produto = ' + codProd);

    api.put('produtos/' + codProd, data).then(res=>{
        console.log('Alteração realizada!');
        consultaGeral();
    }).catch(error=> console.log('Erro ao realizar a alteração'));
}

btnAlterar.onclick = ()=>{
    updateProds();
}

popUp.addEventListener('click', event =>{
    const classClick = event.target.classList[0];
    //console.log(classClick); //Show the class clicked
    if (classClick === 'popUpClose' ||
            classClick === 'closeLinkPopUp')
            {
                popUp.style.display = 'none' 
            }
    
});

const controls ={
    next(){
        state.page ++;
        if(state.page > state.totalPage){
            state.page --;
        }
    },
    prev(){
        state.page --;
        if(state.page < 1){
            state.page ++;
        }
    }, 
    goTo(page){
        if(page < 1){
            page = 1;
        }
        state.page = page;

        if(page > state.totalPage){
            state.page = state.totalPage;
        }
    }
}

btnFirst.onclick = ()=>{
    controls.goTo(1);
    //console.log(state.page);
}

btnPrev.onclick = ()=>{
    controls.prev();
    //console.log(state.page);
}

btnNext.onclick = ()=>{
    controls.next();
    //console.log(state.page);
}

btnLast.onclick = ()=>{
    controls.goTo(state.totalPage);
    //console.log(state.page);
}

consultaGeral();