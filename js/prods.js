//Referências do DOM HTML

const tbodyList = document.getElementById('tbodyList');

const lblCod = document.getElementById('lblCod');
const inpNome = document.getElementById('inpNome');
const inpDesc = document.getElementById('inpDesc');
const inpQtda = document.getElementById('inpQtda');
const inpFab = document.getElementById('inpFab');

const lblCodAdd = document.getElementById('lblCodAdd');
const inpNomeAdd = document.getElementById('inpNomeAdd');
const inpDescAdd = document.getElementById('inpDescAdd');
const inpQtdaAdd = document.getElementById('inpQtdaAdd');
const inpFabAdd = document.getElementById('inpFabAdd');

const lblCodDel = document.getElementById('lblCodDel');

const btnSearch = document.getElementById('btnSearch');
const boxSel = document.getElementById('boxSel');
const tInput = document.getElementById('tInput');

const btnAdd = document.getElementById('btnAdd');

const btnAlterar = document.getElementById('btnAlterar');
const btnDeleteS = document.getElementById('btnDeleteS');
const btnDeleteN = document.getElementById('btnDeleteN');
const btnInsert = document.getElementById('btnInsert');

const btnFirst = document.getElementById('btnFirst');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnLast = document.getElementById('btnLast');

const lblPage = document.getElementById('lblPage');

const popUp = document.querySelector('.popUpWrapper');
const popUpDelete = document.querySelector('.popUpDelete');
const popUpInsert = document.querySelector('.popUpInsert');

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

function consultaEspec(value){    
    if(boxSel.value === "cod"){
        api.get('produto/' + value).then(res=>{
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
    }if(boxSel.value === "nome"){
        api.get('produtos/' + value).then(res=>{
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
    }if(boxSel.value === "fabricante"){
        api.get('produtosfab/' + value).then(res=>{
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
}
btnSearch.onclick = ()=>{
    consultaEspec(tInput.value);
}



function populateList(){
    let i, tr;
    tbodyList.innerHTML='';

    let initPage = state.page -1;
    let startCorte = initPage * 5;
    let endCorte = startCorte + 5;

    const paginateItens = data.slice(startCorte, endCorte);

    for (i = 0; i < paginateItens.length; i++){
        tr = '<tr>' +
                '<td>' + paginateItens[i].cod + '</td>' +
                '<td>' + paginateItens[i].nome + '</td>' +
                '<td>' + paginateItens[i].descri + '</td>' +
                '<td>' + paginateItens[i].qtda + '</td>' +
                '<td>' + paginateItens[i].fabricante + '</td>' +
                '<td>' + paginateItens[i].datahora + '</td>' +
                '<td> <a id="btnUpdate" onclick="onEdit(this)"> <img class="imgUpdate" src="../img/updateIcon.png"></img> </a> <a id="btnDelete" onclick="onDel(this)"> <img class="imgUpdate" src="../img/delete.png"></img> </a></td>'
             '</tr>';
        tbodyList.innerHTML += tr;
    };
    lblPage.innerHTML = state.page + ' / ' + state.totalPage;
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

function onDel(td){
    let dataSelection = td.parentElement.parentElement;
    
    popUpDelete.style.display= 'block'
    lblCodDel.innerHTML = dataSelection.cells[0].innerHTML;
    console.log(dataSelection);
}

function deleteProd(){
    let codProd = lblCodDel.innerHTML;
    
    console.log('Código do produto = ' + codProd);

    api.delete('produto/' + codProd).then(res=>{
        console.log('Exclusão Realizada!');
        consultaGeral();
    }).catch(error=> console.log('Erro ao realizar a exclusão'));
}
btnDeleteS.onclick = ()=>{
    deleteProd();
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

    api.put('produto/' + codProd, data).then(res=>{
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
popUpDelete.addEventListener('click', event =>{
    const classClick = event.target.classList[0];
    //console.log(classClick); //Show the class clicked
    if (classClick === 'popUpClose' ||
            classClick === 'closeLinkPopUp')
            {
                popUpDelete.style.display = 'none' 
            }
    
});
popUpInsert.addEventListener('click', event =>{
    const classClick = event.target.classList[0];
    //console.log(classClick); //Show the class clicked
    if (classClick === 'popUpClose' ||
            classClick === 'closeLinkPopUp')
            {
                popUpInsert.style.display = 'none' 
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
    populateList();
    //console.log(state.page);
}

btnPrev.onclick = ()=>{
    controls.prev();
    populateList();
    //console.log(state.page);
}

btnNext.onclick = ()=>{
    controls.next();
    populateList();
    //console.log(state.page);
}

btnLast.onclick = ()=>{
    controls.goTo(state.totalPage);
    populateList();
    //console.log(state.page);
}

boxSel.addEventListener('click', searchSize);

function searchSize(){
    if (boxSel.value === 'cod'){
        tInput.style.width = '60px';
        boxSel.style.width = '40px';
        tInput.value = '';
    }if (boxSel.value === 'nome'){
        tInput.style.width = '150px';
        boxSel.style.width = '60px';
        tInput.value = '';
    }if (boxSel.value === 'fabricante'){
        tInput.style.width = '100px';
        boxSel.style.width = '90px';
        tInput.value = '';
    }
}

consultaGeral();