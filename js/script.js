const tempMax = document.getElementById('temp-max')
const tempMin = document.getElementById('temp-min')
const sensacao = document.getElementById('sensacao')
const tempo = document.getElementById('temp-princ')
const descricao = document.getElementById('descricao')

const cidade = document.getElementById('cidade')

const barraPesquisa = document.getElementById('input-cidade') 
barraPesquisa.addEventListener('keydown', campo => {
    if(campo.key === 'Enter'){
        let conteudoBarra = document.getElementById('input-cidade') 
        if(conteudoBarra.value.length > 2){
            ul.innerHTML = ""
            buscarCidade(conteudoBarra.value)
        }
    }
})

const ul = document.querySelector('#resultado-busca')
const fundo = document.querySelector('#fundo-busca')

fundo.addEventListener('click', () => {
    ul.innerHTML = ""
    fundo.style.display = "none"
})


// Buscar cidades
function buscarCidade(cityName){
    let API = "b56b8b0245bb40c8dcd1ca9721f9213f"
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API}`)
        .then(bruto => bruto.json())
        .then(result => {
            result.map(itens => {
                atualizarPesquisa(itens.name, itens.state, itens.lat, itens.lon)
            })
        })
} 

function atualizarPesquisa(cid, estad, lat, lon){
    
    const li = document.createElement('li')

    li.setAttribute('class', "lista-cidades")

    li.setAttribute('onclick', `buscarDadosTempo(${lat}, ${lon}, '${cid}')`)
    if(estad){
        li.innerHTML = `
        <p>${cid}, ${estad}</p>
    `
    }else{
        li.innerHTML = `
        <p>${cid}</p>
    `
    }
    

    ul.appendChild(li)

    fundo.style.display = "flex"
}


// Dados tempo
function buscarDadosTempo(lat, lon, cid){
    let API = "b56b8b0245bb40c8dcd1ca9721f9213f"
    ul.innerHTML = ""
    fundo.style.display = "none"

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`)
        .then(bruto => bruto.json())
        .then(result => {
            
            tempo.innerText = `${result.main.temp.toFixed(0)}° Graus`
            sensacao.innerText = `${result.main.feels_like.toFixed(0)}° Graus`
            tempMax.innerText = `${result.main.temp_max.toFixed(0)}° Graus`
            tempMin.innerText = `${result.main.temp_min.toFixed(0)}° Graus`
            descricao.innerText = `${result.weather[0].main}`

            cidade.innerText = cid
        })
}


