 // criamos esse arquivo para enviar um novo agendamento para api
  
 import { apiConfig } from "./api-config"

 export async function scheduleNew({id, name, when}){
    try {
        // faz a requisição para enviar os dados do agendamento
        await fetch(`${apiConfig.baseURL}/schedules`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, name, when})
        } )
        alert("Agendamento realizado com sucesso!")
    } catch (error) {
        console.log(error)
        alert("Não foi possível agendar. Tente novamente mais tarde.")
    }
 }
 // fizemos a requisição, adicionando a rota (schedules), e passamos as caracteristicas (método POST), cabeçalho(tipo json), o corpo(definindo o objeto(json) que queremos enviar)
 // fizemos a desestruturação, passando o parâmetro como um objeto.