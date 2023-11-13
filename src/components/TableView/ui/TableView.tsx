import {FC, memo, SetStateAction, useEffect, useRef, useState} from 'react';
import { Column } from 'primereact/column';
import { DataTable, SortOrder } from 'primereact/datatable';
import './TableView.css';
import { EventInt } from '../../../models/EventListModel';
import { Paginator } from 'primereact/paginator';
import { PageLimits } from '../../../helpers/enums';
import { columns } from '../constants/colums';


interface TableViewProps {
    totalRecords: EventInt[];
    first: number;
    setFirst: (value: number) => void;
}

type SortOrderType = SortOrder | null | undefined;

export const TableView: FC<TableViewProps> = memo(({ totalRecords, first, setFirst }) => {
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrderType>(null);
    const [cardCount, setCardCount] = useState(PageLimits.TABLE_LIMIT);
    const [size, setSize] = useState({});

    const resizeHandler = () => {
        const clientWidth = window.innerWidth;
        setSize( clientWidth );
    };

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    useEffect( () => {
        if (size < 770) {
            setCardCount(10)
        } else {
            setCardCount(PageLimits.TABLE_LIMIT)
        }
    },[size])

    const onSort = (e: { sortField: SetStateAction<string | null>; sortOrder: SetStateAction<SortOrderType> }) => {
        if (e.sortField === 'message' || e.sortField === 'responsible') {
            setSortField(e.sortField);
            setSortOrder(e.sortOrder);
        }
    };


    return (
        <div className="table-view" >
            <DataTable
                value={totalRecords.slice(first, first + cardCount)}
                tableStyle={{ minWidth: '94rem' }}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={onSort}
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.field === 'message' || col.field === 'responsible'}
                    />
                ))}
            </DataTable>
            <Paginator
                className="paginator"
                first={first}
                rows={cardCount}
                totalRecords={totalRecords.length}
                onPageChange={(e) => setFirst(e.first)}
            />
        </div>
    );
});