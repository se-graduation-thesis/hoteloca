// assets
import {
    IconTypography, IconPalette,
    IconShadow, IconWindmill, IconUser, IconBuildingSkyscraper, IconChartInfographic, IconReceipt, IconBuildingWarehouse, IconBrandSlack
    , IconReceipt2, IconUsers, IconUserCheck
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconUser,
    IconBuildingSkyscraper,
    IconChartInfographic,
    IconReceipt,
    IconBuildingWarehouse,
    IconBrandSlack,
    IconReceipt2,
    IconUsers,
    IconUserCheck
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Quản lý khách sạn',
    type: 'group',
    children: [
        {
            id: 'hotel-manager',
            title: 'Loại Phòng',
            type: 'item',
            url: '/admin/category-manager',
            icon: icons.IconBuildingSkyscraper,
            breadcrumbs: false
        },
        {
            id: 'loaiphong',
            title: 'Phòng',
            type: 'collapse',
            icon: icons.IconBuildingWarehouse,
            // breadcrumbs: false,
            children: [
                {
                    id: 'danhsachphong',
                    title: 'Danh Sách Phòng',
                    type: 'item',
                    url: '/admin/hotel-management/room',
                    breadcrumbs: false
                },
                {
                    id: 'datphong',
                    title: 'Sơ đồ phòng',
                    type: 'item',
                    url: '/admin/booking',
                    breadcrumbs: false
                },
            ]
        },
        {
            id: 'dchvu',
            title: 'Dịch Vụ',
            type: 'item',
            url: '/admin/hotel-management/service',
            icon: icons.IconBrandSlack,
            breadcrumbs: false
        },
        {
            id: 'account-manager',
            title: 'Tài Khoản',
            type: 'item',
            url: '/admin/account-manager',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'nv',
            title: 'Nhân Viên',
            type: 'item',
            url: '/admin/admin-manager',
            breadcrumbs: false,
            icon: icons.IconUserCheck,
        },
        {
            id: 'kh',
            title: 'Khách Hàng',
            type: 'collapse',

            icon: icons.IconUsers,
            children: [
                {
                    id: 'listCustomerRent',
                    title: 'Danh sách khách hàng',
                    type: 'item',
                    url: '/admin/customer-management',
                    breadcrumbs: false
                },
                {
                    id: 'thue',
                    title: 'Danh sách khách hàng đang thuê phòng',
                    type: 'item',
                    url: '/admin/list-customer-rent',
                    breadcrumbs: false
                },
                {
                    id: 'tkhd',
                    title: 'Thống kê khách hàng',
                    type: 'item',
                    url: '/admin/customer-statistics',
                    breadcrumbs: false
                },
            ]
        },
        {
            id: 'booking',
            title: 'Phiếu thuê',
            type: 'collapse',
            icon: icons.IconReceipt,
            children: [
                {
                    id: 'add',
                    title: 'Đặt phòng',
                    type: 'item',
                    url: '/admin/add-booking',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Danh sách phiếu thuê',
                    type: 'item',
                    url: '/admin/list-booking',
                    breadcrumbs: false
                },
            ]
        },
        {
            id: 'hoadon',
            title: 'Hóa Đơn',
            type: 'collapse',
            icon: icons.IconReceipt2,
            breadcrumbs: false,
            children: [
                {
                    id: 'ds',
                    title: 'Danh sách hóa đơn',
                    type: 'item',
                    url: '/admin/receipt-managerment',
                    breadcrumbs: false
                },
                {
                    id: 'tkkh',
                    title: 'Thống kê hóa đơn',
                    type: 'item',
                    url: '/admin/bill-statistics',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
