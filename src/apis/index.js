import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchBoardDetailsAPI = async (boardId) => {    
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)    
    return request.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {    
    const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)    
    return request.data
}

export const createNewColumnAPI = async (columnId) => {    
    const request = await axios.post(`${API_ROOT}/v1/columns`, columnId)    
    return request.data
}

export const createNewCardAPI = async (cardId) => {    
    const request = await axios.post(`${API_ROOT}/v1/cards`, cardId)    
    return request.data
}

