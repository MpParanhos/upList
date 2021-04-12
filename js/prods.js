//Referências do DOM HTML

const tbodyList = document.getElementById('tbodyList');

const popUp = document.querySelector('.popUpWrapper');


const api = axios.create({
    baseURL:'http://18.224.8.119:3334/',
});

function consultaGeral(){
    console.log('Consulta de dados ...');
    api.get('produtos').then(res=>{
        console.log('Realizando a consulta ...');

        const data = res.data;
        let i, tr;
        tbodyList.innerHTML='';
        for (i = 0; i < data.length; i++){
            tr = '<tr>' +
                    '<td>' + data[i].code + '</td>' +
                    '<td>' + data[i].nome + '</td>' +
                    '<td>' + data[i].descri + '</td>' +
                    '<td>' + data[i].qtda + '</td>' +
                    '<td>' + data[i].fabricante + '</td>' +
                    '<td>' + data[i].datahora + '</td>' +
                    '<td> <a id="btnUpdate" onclick="onEdit(this)"> <img class="imgUpdate" src="../img/updateIcon.png"></img> </a></td>' 
                 '</tr>';
            tbodyList.innerHTML += tr;
        };
    })
}

function onEdit(){
    popUp.style.display= 'block'
}

popUp.addEventListener('click', event =>{
    const classClick = event.target.classList[0];
    console.log(classClick);
    if (classClick === 'popUpClose' ||
            classClick === 'closeLinkPopUp')
            {
                popUp.style.display = 'none' 
            }
    
})

consultaGeral();