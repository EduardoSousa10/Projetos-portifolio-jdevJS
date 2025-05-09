// arquivo criado para renderizar 

import dayjs from "dayjs";

//seleciona as sessões = manhã, tarde e noite
const periodMorning = document.getElementById("period-morning")
const periodAfeternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow ({daylySchedules}){
    try {
        // limpa as listas
        periodMorning.innerHTML = ""
        periodAfeternoon.innerHTML = ""
        periodNight.innerHTML = ""
        
        // renderiza os agendamentos por período
        daylySchedules.forEach((schedule) =>{
            const item = document.createElement("li")
            const time = document.createElement("strong")
            const name = document.createElement("span")

            // adiciona o id do agendamento
            item.setAttribute("data-id", schedule.id)

            time.textContent = dayjs(schedule.when).format("HH:mm")
            name.textContent = schedule.name

            // cria o ícone de cancelamento de agendamento
            const cancelIcon = document.createElement("img")
            cancelIcon.classList.add("cancel-icon")
            cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
            cancelIcon.setAttribute("alt", "Cancelar agendamento")

            // adiciona o tempo, nome e ícone no item
            item.append(time, name, cancelIcon)

            // obtem somente a hora 
            const hour = dayjs(schedule.when).hour()

            // renderiza o agendamento na sessão de forma condicional(manhã, tarde ou noite)
            if(hour <= 12){
                periodMorning.appendChild(item)
            } else if(hour > 12 && hour <= 18){
                periodAfeternoon.appendChild(item)
            } else{
                periodNight.appendChild(item)
            }

        })

    } catch (error) {
        console.log(error)
        alert("Não foi possivel concluir o agendamento")
    }
}