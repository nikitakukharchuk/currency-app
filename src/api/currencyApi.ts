import { CurrencyType } from "../types/CurrencyType"
import { instance } from "./Instance/instance"

export const currencyApi = {
    getCurrency(source: string) {
        return instance.get<CurrencyType>(`${source}`)
    },
    getCurrencyPoll(source: string) {
        return instance.get<CurrencyType>(`${source}/poll`)
    }
} 