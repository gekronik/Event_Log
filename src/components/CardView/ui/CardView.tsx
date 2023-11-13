import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageLimits } from '../../../helpers/enums';
import { cardRead } from '../../../redux/actions/eventListActions';
import { EventInt } from '../../../models/EventListModel';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { DataView } from 'primereact/dataview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './CardView.css';

interface CardViewProps {
    totalRecords: EventInt[];
    first: number;
    setFirst: (value: number) => void;
    event: EventInt[];
}

export const CardView: FC<CardViewProps> = ({ totalRecords, first, setFirst }) => {
    const [cardCount, setCardCount] = useState<number>(PageLimits.CARD_LIMIT);
    const [size, setSize] = useState<number>(0);
    const dispatch = useDispatch();
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

    const resizeHandler = () => {
        const clientWidth = window.innerWidth;
        setSize(clientWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (selectedCardId && e.key === ' ') {
                dispatch(cardRead(selectedCardId));
                setSelectedCardId(null);
            }
        },
        [dispatch, selectedCardId]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCardId, handleKeyPress]);

    useEffect(() => {
        switch (true) {
            case size < 400:
                setCardCount(1);
                break;
            case size < 751:
                setCardCount(2);
                break;
            case size < 1200:
                setCardCount(4);
                break;
            default:
                setCardCount(PageLimits.CARD_LIMIT);
        }
    }, [size]);

    const handleCardClick = (eventId: number) => {
        setSelectedCardId(eventId === selectedCardId ? null : eventId);
    };

    const getSeverity = (importance: string) => {
        switch (importance) {
            case 'Низкая':
                return 'success';
            case 'Высокая':
                return 'warning';
            case 'Критическая':
                return 'danger';
            default:
                return null;
        }
    };

    const itemTemplate = (event: EventInt) => (
        <div
            className={`card col-12 sm:col-6 xl:col-4 p-2`}
            onClick={() => handleCardClick(event.id)}
        >
            <div
                style={{ maxWidth: '500px' }}
                className={`card p-4 border-3 border-round ${event.isRead ? 'read' : 'unread'} ${
                    selectedCardId === event.id ? 'selected' : ''
                }`}
            >
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-wrench" />
                        <span className="font-semibold">
                            {event.equipment}
                        </span>
                    </div>
                    <Tag value={event.importance} severity={getSeverity(event.importance)} />
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <Avatar
                        label="V"
                        size="large"
                        style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                        shape="circle"
                    />
                    <div className="text-2xl font-semibold">
                        {event.responsible}
                    </div>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-base font-semibold">
                        {event.message}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="card">
                <DataView
                    value={totalRecords.slice(first, first + cardCount)}
                    itemTemplate={itemTemplate}
                    layout="grid"
                />
            </div>
            <Paginator
                className="paginator"
                first={first}
                rows={cardCount}
                totalRecords={totalRecords.length}
                onPageChange={(e) => setFirst(e.first)}
            />
        </>
    );
};
