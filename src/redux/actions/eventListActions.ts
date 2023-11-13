import {EventInt} from "../../models/EventListModel";
import {Action} from "redux";



export const ADD_EVENT = 'ADD_EVENT'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
export const CARD_READ = 'CARD_READ'
export interface AddEventAction extends Action{
    type: typeof ADD_EVENT
    event: EventInt
}
export interface SetSearchText extends Action {
    type: typeof SET_SEARCH_TEXT
    searchText: string
}
export interface CardReadAction extends Action {
    type: typeof CARD_READ
    eventId: number

}


export type EventActions = AddEventAction | SetSearchText | CardReadAction
export const addEvent = (event:EventInt):AddEventAction => ({
    type: ADD_EVENT,
     event
})

export const setSearchText = (searchText:string):SetSearchText => ({
    type: SET_SEARCH_TEXT,
    searchText
})

export const cardRead = (eventId:number):CardReadAction => ({
    type: CARD_READ,
    eventId
})
