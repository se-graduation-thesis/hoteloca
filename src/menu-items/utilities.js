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
            type: 'item',
            url: '/admin/hotel-management/room',
            icon: icons.IconBuildingWarehouse,
            breadcrumbs: false
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
            type: 'item',
            url: '/admin/customer-management',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'booking',
            title: 'Đặt Phòng',
            type: 'collapse',
            icon: icons.IconReceipt,
            children: [
                {
                    id: 'datphong',
                    title: 'Đặt phòng',
                    type: 'item',
                    url: '/admin/booking',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Danh sách đơn đặt',
                    type: 'item',
                    url: '/admin/list-booking',
                    breadcrumbs: false
                },
                {
                    id: 'listCustomerRent',
                    title: 'Danh sách khách hàng đang thuê phòng',
                    type: 'item',
                    url: '/admin/list-customer-rent',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'hoadon',
            title: 'Hóa Đơn',
            type: 'item',
            url: '/admin/receipt-managerment',
            icon: icons.IconReceipt2,
            breadcrumbs: false
        },
        {
            id: 'thongke',
            title: 'Thống kê',
            type: 'collapse',
            url: '/utils/util-typography',
            icon: icons.IconChartInfographic,
            children: [
                {
                    id: 'tkhd',
                    title: 'Thống kê khách hàng',
                    type: 'item',
                    url: '/admin/customer-statistics',
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
        },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;
