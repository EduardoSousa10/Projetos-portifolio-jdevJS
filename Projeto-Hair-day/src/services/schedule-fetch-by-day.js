// criamos esse arquivo para buscar e listar os agendamentos do dia

import dayjs from "dayjs"
import {apiConfig} from "./api-config"

export async function scheduleFetchByDay({date}){
    try {
        // fazendo a requisição
        const response = await fetch(`${apiConfig.baseURL}/schedules`)
        //converte para JSON
        const data = await response.json()
        // filtra os agendamentos pelos dias selecionados
        const daylySchedules =  data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))
        // retorna as datas filtradas
        return daylySchedules
    } catch (error) {
        console.log(error)
        alert("Não foi possivel buscar os agendamentos do dia selecionado")
    }
}