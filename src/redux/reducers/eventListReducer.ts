import {EventInt} from "../../models/EventListModel";
import {EventActions} from "../actions/eventListActions";

export interface EventListState {
    events: EventInt[]
    searchText: string

}

const initialState = {
    events: [
        {
            id: 1,
            date: '2022-09-15',
            importance: 'Критическая',
            equipment: 'Вегас',
            message: 'Сервер vegas недоступен',
            responsible: 'Иванов В.А',
            isRead: true,
        },
        {
            id: 2,
            date: '2022-09-16',
            importance: 'Низкая',
            equipment: 'Коммутатор',
            message: 'Проблема с сетью',
            responsible: 'Капусин С.С',
            isRead: true,
        },{
            id: 3,
            date: '2022-09-17',
            importance: 'Низкая',
            equipment: 'Люк',
            message: 'Открытая крышка',
            responsible: 'Ветрова И.С',
            isRead: true,
        },{
            id: 4,
            date: '2022-10-18',
            importance: 'Высокая',
            equipment: 'Коммутатор',
            message: 'Низкий заряд батареи ',
            responsible: 'Лавочкин А.В',
            isRead: false,
        },{
            id: 5,
            date: '2022-10-19',
            importance: 'Критическая',
            equipment: 'Трансфортматор',
            message: 'Недостаточное количество масла',
            responsible: 'Ольшанская Е.Г',
            isRead: false,
        },{
            id: 6,
            date: '2022-10-20',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Обрыв силового кабеля',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 7,
            date: '2022-10-21',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Обрыв силового кабеля',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 8,
            date: '2022-10-22',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Сервер vegas недоступен',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 9,
            date: '2022-10-23',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Обрыв силового кабеля',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 10,
            date: '2022-10-24',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Обрыв силового кабеля',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 11,
            date: '2022-10-25',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Открытая крышка',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 12,
            date: '2022-10-26',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Обрыв силового кабеля',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 13,
            date: '2022-10-27',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Низкий заряд батареи ',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 14,
            date: '2022-10-28',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Проблема с сетью',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 15,
            date: '2022-10-29',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Сервер vegas недоступен',
            responsible: 'Ветрова И.С',
            isRead: false,
        },{
            id: 16,
            date: '2022-10-30',
            importance: 'Критическая',
            equipment: 'ЛВС',
            message: 'Проблема с сетью',
            responsible: 'Ветрова И.С',
            isRead: false,
        },
    ],
    searchText:''

}

const eventListReducer = (state:EventListState = initialState,action: EventActions):EventListState => {
    switch (action.type) {
        case "ADD_EVENT":
            return {
                ...state,
                events: [action.event,...state.events]
            }
        case "SET_SEARCH_TEXT":
            return {
                ...state,
                searchText: action.searchText,
            }
        case "CARD_READ":
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.eventId ? { ...event, isRead:true} : event
                )
            }
        default:
            return state
    }
}

export default eventListReducer