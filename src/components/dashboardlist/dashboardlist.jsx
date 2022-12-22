import './dashboardlist.css'

import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
// import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import { Avatar, Grid, makeStyles, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { studentListThunk } from '../../redux/reducers/studentlistSlice'
// import { padding } from '@mui/system';

// const useStyles =makeStyles((theme)=>({
//   spacing:{

//   }
// }))
// const StyledTableCell = styled(TableCell)({
//   padding: 0,
// })

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 38,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#0047FF',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#E9E9EA' : '#E9E9EA',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#fff',
            border: '6px solid #0047FF',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 20,
        height: 20,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))

function createData(name, joinDate, courseTitle, completedDate, status) {
    return {
        name,
        joinDate,
        courseTitle,
        completedDate,
        status,
    }
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis =
        array && array.length > 0 && array.map((el, index) => [el, index])
    stabilizedThis &&
        stabilizedThis.length > 0 &&
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) {
                return order
            }
            return a[1] - b[1]
        })
    return (
        stabilizedThis &&
        stabilizedThis.length > 0 &&
        stabilizedThis.map((el) => el[0])
    )
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'joinDate',
        numeric: false,
        disablePadding: false,
        label: 'Joined Date',
    },
    {
        id: 'courseTitle',
        numeric: false,
        disablePadding: false,
        label: 'Course title',
    },
    {
        id: 'completedDate',
        numeric: false,
        disablePadding: false,
        label: 'Completed Date',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'proteins',
        numeric: false,
        disablePadding: false,
        label: 'Subscribe',
    },
]

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            p: '11px',
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                            IconComponent={UnfoldMoreIcon}
                        // hideSortIcon='false'
                        >
                            <Typography
                                fontFamily="ProximaNovaSoft-Regular"
                                fontWeight="light"
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity,
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                    fontFamily="ProximaNovaSoft-Regular"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    fontFamily="ProximaNovaSoft-Regular"
                    fontWeight="600"
                    fontSize="24px"
                >
                    Total Student
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Typography
                    sx={{
                        flex: '1 1 5%',
                        color: '#2831FF',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    fontFamily="ProximaNovaSoft-Regular"
                    fontSize="15px"
                >
                    <Link to="/dashBoard/studentList">View all</Link>
                </Typography>
            )}
        </Toolbar>
    )
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

export default function EnhancedTabledash() {
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('joinDate')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [requestData, setRequestData] = React.useState([])

    const data = useSelector((state) => state.studentList.data)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(studentListThunk())
    }, [])

    React.useEffect(() => {
        data &&
            data.data &&
            data.data &&
            setRequestData(data && data.data && data.data)
        console.log('data', data && data.data && data.data)
    }, [data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = requestData.map((n) => n.fullName)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <div className="container">
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={requestData.length}
                            />
                            <TableBody>
                                {stableSort(requestData, getComparator(order, orderBy)) &&
                                    stableSort(requestData, getComparator(order, orderBy))
                                        .length > 0 &&
                                    stableSort(requestData, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.fullName)
                                            const labelId = `enhanced-table-checkbox-${index}`
                                            return (
                                                <TableRow
                                                    hover
                                                    // onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                    sx={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <TableCell
                                                        padding="checkbox"
                                                        onClick={(event) =>
                                                            handleClick(event, row.fullName)
                                                        }
                                                    >
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        sx={{
                                                            width: '20%',
                                                            p: '5px',
                                                        }}
                                                    >
                                                        <Grid container>
                                                            <Grid item lg={2}>
                                                                <Avatar
                                                                    alt={row.fullName}
                                                                    src={row.profilePhoto}
                                                                    sx={{
                                                                        width: 30,
                                                                        height: 30,
                                                                        ml: '3px',
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item lg={10}>
                                                                <Typography
                                                                    fontFamily="ProximaNovaSoft-Regular"
                                                                    fontWeight="bold"
                                                                    sx={{
                                                                        ml: '2px',
                                                                        pt: '3px',
                                                                    }}
                                                                >
                                                                    {row.fullName}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            width: '13%',
                                                        }}
                                                    >
                                                        <Typography fontFamily="ProximaNovaSoft-Regular">
                                                            {row.joinDate}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            width: '35%',
                                                        }}
                                                    >
                                                        <Typography fontFamily="ProximaNovaSoft-Regular">
                                                            {row.courseName}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            width: '13%',
                                                        }}
                                                    >
                                                        <Typography fontFamily="ProximaNovaSoft-Regular">
                                                            {row.completedDate}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            width: '9%',
                                                        }}
                                                    >
                                                        <Typography fontFamily="ProximaNovaSoft-Regular">
                                                            <div className={row.courseCompletedStatus ? 'status-green' : 'status'}> <span className={row.courseCompletedStatus ? 'dot-green' : 'dot'}></span> {row.courseCompletedStatus ? "Completed" : "Ongoing"}</div>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            width: '8%',
                                                        }}
                                                    >
                                                        <Typography fontFamily="ProximaNovaSoft-Regular">
                                                            <IOSSwitch sx={{ m: 1 }} defaultChecked />
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
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
                        count={requestData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    )
}
