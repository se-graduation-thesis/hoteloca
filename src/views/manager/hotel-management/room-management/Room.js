import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/room.action";
import * as actionCategory from 'actions/category.action';
import EditIcon from '@mui/icons-material/Edit';
import AddRoomForm from './room-components/addRoomForm';
import EditRoomForm from './room-components/editRoomForm';

const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'ten', label: 'Tên Phòng', minWidth: 100 },
    { id: 'loaiPhong', label: 'Loại Phòng', minWidth: 100 },
    { id: 'soNguoi', label: 'Số Người', minWidth: 100 },
    { id: 'soGiuong', label: 'Số Giường', minWidth: 100 },
    { id: 'donGia', label: 'Đơn Giá', minWidth: 100 },
    { id: 'trangThai', label: 'Trạng Thái', minWidth: 100 },
    { id: 'dienTich', label: 'Diện Tích', minWidth: 100 },
    { id: 'hinhAnh', label: 'Ảnh', minWidth: 100 },
    { id: 'moTa', label: 'Mô Tả', minWidth: 100 },
];

export default function Room() {
    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [loaiPhong, setLoaiPhong] = React.useState(0);
    const [stateRoom, setStateRoom] = React.useState("full");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rooms = useSelector((state) => state.room.rooms);
    const roombyname = useSelector((state) => state.room.room_by_name);
    const [addForm, setAddForm] = React.useState(false);
    const [editForm, setEditForm] = React.useState(false);
    const [editRoom, setEditRoom] = React.useState(null);
    const [isView, setIsView] = React.useState(false);
    const [searchContent, setSearchContent] = React.useState("");

    const categories = useSelector(state => state.category.listCategory);

    const handleIsView = (value) => setIsView(value);

    const handleEditRoom = (item) => setEditRoom(item);

    const isShowAddForm = (value) => setAddForm(value);
    const isShowEditForm = (value) => setEditForm(value);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [listRoom, setListRoom] = React.useState([])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = []

    React.useEffect(() => {
        dispatch(actionCategory.fetchAllCategory());
    }, [])

    React.useEffect(() => {
        dispatch(actions.fetchAllRoomByCategory(loaiPhong))
    }, [loaiPhong])


    React.useEffect(() => {
        if (rooms) {
            rooms.forEach((e, i) => {

                const loaiPhong = e.loaiPhongid;
                e.stt = i + 1;
                e.loaiPhong = loaiPhong.ten;
                e.soNguoi = loaiPhong.soNguoi;
                e.soGiuong = loaiPhong.soGiuong;
                e.donGia = loaiPhong.donGia;
                e.trangThai === 1 ?
                    e.trangThai = "Hoạt động" :
                    e.trangThai = "Ngừng hoạt động";
                try {
                    let dienTich = JSON.parse(loaiPhong.dienTich)
                    e.dienTich = dienTich.chieudai + " x " + dienTich.chieurong
                } catch {
                    console.log("err")
                }
            })
            setListRoom(rooms)
        }
    }, [rooms])

    const handleChangeRoomType = (event) => {
        setLoaiPhong(event.target.value);
    };

    const handleChangeStateRoom = (event) => {
        setStateRoom(event.target.value);
    };

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', pl: 5, pr: 5 }}>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 20 }}>
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN PHÒNG</h3>
                    </Grid>

                    <Grid item xs={2}>
                        <Button variant="contained" color="secondary"
                            onClick={() => isShowAddForm(true)}
                        >Thêm phòng</Button>
                    </Grid>
                    <Grid item xs={4} style={{ padding: 10, textAlign: "right" }}>
                        <TextField
                            fullWidth
                            label="Nhập tên Phòng cần tìm"
                            size="small"
                            value={searchContent}
                            onChange={(e) => setSearchContent(e.target.value)}
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position="start">
                        //             <IconButton>
                        //                 <SearchIcon />
                        //             </IconButton>
                        //         </InputAdornment>
                        //     )
                        // }}
                        />
                    </Grid>

                    <Grid item xs={2} />

                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={loaiPhong}
                                label="Loại Phòng"
                                onChange={handleChangeRoomType}
                            >
                                <MenuItem value={0}>Tất cả</MenuItem>
                                {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={stateRoom}
                                label="Trạng Thái"
                                onChange={handleChangeStateRoom}
                            >
                                <MenuItem value="full">Tất cả</MenuItem>
                                <MenuItem value="Hoạt động">Hoạt Động</MenuItem>
                                <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                <TableContainer sx={{ height: '70%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                    key={"action"}
                                    minwidth={250}
                                >
                                    {"Hành động"}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listRoom
                                .filter(item => item.ten.toLowerCase().includes(searchContent.toLowerCase()))
                                .filter(item => stateRoom === "full" ? item : item.trangThai === stateRoom)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'hinhAnh' ?
                                                            <img src={value} style={{ width: 70 }} /> :
                                                            column.id === "trangThai" ?
                                                                <Chip label={value} color={value === "Hoạt động" ? "primary" : "warning"} /> :
                                                                column.id === "donGia" ?
                                                                    new Intl.NumberFormat('en-Vn').format(value) :
                                                                    value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key={"action"}>
                                                <IconButton aria-label="show" color="success" onClick={() => { handleEditRoom(row); isShowEditForm(true); handleIsView(true) }}>
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton aria-label="edit" color="primary" onClick={() => { handleEditRoom(row); isShowEditForm(true); }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage='Số hàng'
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={listRoom.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
                <AddRoomForm open={addForm}
                    isShowAddForm={isShowAddForm}
                />

                <EditRoomForm
                    open={editForm}
                    isShowEditForm={isShowEditForm}
                    item={editRoom}  //item
                    isView={isView} //type = view
                    handleIsView={handleIsView} // changetype
                />
            </div>
        </div>
    )
}