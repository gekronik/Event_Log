import {FC} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {setSearchText} from "../../../redux/actions/eventListActions";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reducers";
import './EventToolbar.css'
import {ViewModes} from "../../../helpers/enums";


interface Toolbar {
    setViewMode: (value:string) => void
    viewMode:string
}
export const EventToolbar:FC<Toolbar> = ({setViewMode,viewMode}) => {

    const dispatch = useDispatch()
    const searchText = useSelector((state:AppStateType) => state.eventList.searchText)
    return (
        <div className='event-toolbar'>
            <div className='event-toolbar__btn'>
                <Button
                    onClick={() => setViewMode(ViewModes.CARD_MODE)}
                    disabled={ viewMode === ViewModes.CARD_MODE }
                    label="Карточки"
                    severity="info"
                    raised
                />
                <Button
                    onClick={() => setViewMode(ViewModes.TABLE_MODE)}
                    disabled={ viewMode === ViewModes.TABLE_MODE}
                    label="Таблица"
                    severity="info"
                    raised/>
            </div>
            <div className="card flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText placeholder="Search"
                           value={searchText}
                           onChange={(e)=> dispatch(setSearchText(e.target.value))}
                />
            </span>
            </div>
        </div>
    );
};

