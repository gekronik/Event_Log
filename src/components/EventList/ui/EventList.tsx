import {FC, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './EventList.css'
import 'primeicons/primeicons.css';
import {AppStateType} from "../../../redux/reducers";
import {addEvent} from "../../../redux/actions/eventListActions";
import {EventInt} from "../../../models/EventListModel";
import {TableView} from "../../TableView";
import {EventToolbar} from "../../EventToolbar";
import {CardView} from "../../CardView";
import {ViewModes} from "../../../helpers/enums";


export const EventList: FC = () => {
    const [viewMode, setViewMode] = useState<string>(
        localStorage.getItem('viewMode') || ViewModes.CARD_MODE
    );
    const events = useSelector((state: AppStateType) => state.eventList.events)
    const searchText = useSelector((state: AppStateType) => state.eventList.searchText)
    const dispatch = useDispatch()
    const [first, setFirst] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            const newEvent: EventInt = {
                id: events.length + 1,
                date: '2020-07-25',
                importance: 'Критическая',
                equipment: 'ЛВС',
                message: 'Низкий заряд батареи ',
                responsible: 'Ветрова И.С',
                isRead: false,
            }
            dispatch(addEvent(newEvent))
        }, 5000)

        return () => {
            clearInterval(timer)
        }
    }, [events, dispatch])

    const setFilteredEvents = events.filter((event) =>
        event.message.toLowerCase().includes(searchText.toLowerCase())
    )

    const setViewModeHandler = useCallback((value: string) => {
        setViewMode(value)
        localStorage.setItem('viewMode', value);
    }, [])

    const setFirstHandler = useCallback( (value: number) => {
        setFirst(value)
    }, [])

    return (
        <>
            <EventToolbar viewMode={viewMode} setViewMode={setViewModeHandler}/>
            {viewMode === ViewModes.CARD_MODE
                ? (
                    <CardView
                        event={events}
                        totalRecords={setFilteredEvents}
                        first={first}
                        setFirst={setFirstHandler}/>
                )
                : (
                    <TableView
                        totalRecords={setFilteredEvents}
                        first={first}
                        setFirst={setFirstHandler}/>
                )
            }
        </>
    );
};

