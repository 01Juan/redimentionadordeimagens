//Cria link de download
function criarLink(output){
    // var idNome = document.querySelector(".idNome").value

    //Pela internet
    // const botaoLink = document.createElement("button")
    // botaoLink.setAttribute("class", idSala + "2")
    const link = document.createElement("a")
    link.setAttribute("href", "./public/downloads/" + output)
    link.innerText = "Entrar pela internet em " + output
    document.getElementsByTagName("body")[0].getElementsByClassName("salas")[0].appendChild(link)
    // botaoLink.appendChild(link)
}

module.exports = criarLink