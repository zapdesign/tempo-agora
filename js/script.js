const tempMax = document.getElementById('temp-max')
const tempMin = document.getElementById('temp-min')
const sensacao = document.getElementById('sensacao')
const tempo = document.getElementById('temp-princ')

const foto = document.getElementById('foto-clima')



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
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API}`)
        .then(bruto => bruto.json())
        .then(result => {
            if(result.length === 0){
                atualizarVazio(cityName)
            }else{
                result.map(itens => {
                    atualizarPesquisa(itens.name, itens.state, itens.lat, itens.lon)
                        })
            }
        })
} 

function atualizarVazio(escrito){
    const li = document.createElement('li')

    li.setAttribute('Id', 'nao-existe')

    li.innerHTML = `
        <p>A cidade ${escrito} não foi encontrada</p>
    `
    ul.appendChild(li)

    fundo.style.display = "flex"
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
        .then(bruto => {
            if(!bruto.ok){
                throw new Error(`Erro na solicitação à API. Código de status: ${bruto.status}`)
            }
            return bruto.json()
        })      
        .then(result => {
            
            tempo.innerText = `${result.main.temp.toFixed(0)}° Graus`
            sensacao.innerText = `${result.main.feels_like.toFixed(0)}° Graus`
            tempMax.innerText = `${result.main.temp_max.toFixed(0)}° Graus`
            tempMin.innerText = `${result.main.temp_min.toFixed(0)}° Graus`
            foto.setAttribute('src', `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`)

            cidade.innerText = cid
        })
        .catch(err => console.error('algo deu errado: ' + err.message))
}


