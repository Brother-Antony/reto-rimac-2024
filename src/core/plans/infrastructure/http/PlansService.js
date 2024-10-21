import httpClientRepository from "../../../../config/http"

export default class PlansService {
    async getPlans(user) {
        const response = await httpClientRepository.get("/api/plans.json", user)
        return response.data
    }
}
