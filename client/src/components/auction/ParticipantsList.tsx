import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box, Button, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import React, { useState } from "react";
import { ParticipantInterface } from '../../types/RoomInterface';
import { formatMoney } from './utils/format';


interface ParticipantsListProps {
    participants: ParticipantInterface [],
}

interface Data {
    name: string;
    email: string;
    phone: string;
    highest_price: number;
    status: string;
}

function createData(participant: ParticipantInterface): Data {
    const name = participant.name;
    const email = participant.email;
    const phone = participant.phone
    const highest_price = participant.highest_price
    const status = participant.status

    return {name, email, phone, highest_price, status}
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: 'Họ và tên',
    },
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'phone',
        label: 'Điện thoại',
    },
    {
        id: 'highest_price',
        label: 'Mức giá',
    },
    {
        id: 'status',
        label: 'Trạng thái',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: 'bold',
                            width: headCell.id === "highest_price" ||  headCell.id === "phone" ? '12.5%' : '25%'
                        }}
                    >
                        {headCell.id === "highest_price" && (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>)
                        }

                        {headCell.id !== "highest_price" && (
                            <div>
                                {headCell.label}
                            </div>)
                        }

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('highest_price');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState<Data[]>([]);



    React.useEffect(() => {
        setRows(
            participants.map((participants) =>
                createData(participants)));
    }, [participants]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 1600 }} id="box">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 700 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        sx={{ cursor: 'pointer' }}
                                    >

                                        <TableCell align="center" sx={{ width: "25%" }}>{row.name}</TableCell>
                                        <TableCell align="center" sx={{ width: "25%" }}>{row.email}</TableCell>
                                        <TableCell align="center" sx={{ width: "12.5%" }}>{row.phone}</TableCell>
                                        <TableCell align="center" sx={{ width: "12.5%" }} >{formatMoney(row.highest_price ?? 0)}</TableCell>
                                        <TableCell align="center" sx={{ width: "25%" }}>{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div className="float-left">
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        </Box>
    );
}

export default ParticipantsList;