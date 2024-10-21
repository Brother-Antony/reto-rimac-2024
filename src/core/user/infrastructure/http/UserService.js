import httpClientRepository from "../../../../config/http"
import { transformUserData } from "../../utils/transformUserData"

export default class UserService {
    async login(data) {
        const response = await httpClientRepository.get("/api/user.json", data)

        if (response && response.status === 200) {
            const transformedData = transformUserData(response)
            return transformedData
        } else {
            console.error("Inicio de sesión fallido")
            return null
        }
    }
}
