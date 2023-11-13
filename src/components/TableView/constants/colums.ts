
interface ColumnMeta {
    field: string;
    header: string;
}


export const columns: ColumnMeta[] = [
    {field: 'date', header: 'Дата'},
    {field: 'importance', header: 'Важность'},
    {field: 'equipment', header: 'Оборудование'},
    {field: 'message', header: 'Сообщение'},
    {field: 'responsible', header: 'Ответственный'}
];
