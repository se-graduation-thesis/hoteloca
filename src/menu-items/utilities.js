// assets
import {
    IconTypography, IconPalette,
    IconShadow, IconWindmill, IconUser, IconBuildingSkyscraper, IconChartInfographic, IconReceipt, IconBuildingWarehouse, IconBrandSlack
    , IconReceipt2
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
    IconReceipt2
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Quản lý khách sạn',
    type: 'group',
    children: [
        {
            id: 'hotel-manager',
            title: 'Quản Lý Loại Phòng',
            type: 'item',
            url: '/admin/category-manager',
            icon: icons.IconBuildingSkyscraper,
            breadcrumbs: false
        },
        {
            id: 'loaiphong',
            title: 'Quản lý phòng',
            type: 'item',
            url: '/admin/hotel-management/room',
            icon: icons.IconBuildingWarehouse,
            breadcrumbs: false
        },
        {
            id: 'dchvu',
            title: 'Quản lý dịch vụ',
            type: 'item',
            url: '/admin/hotel-management/service',
            icon: icons.IconBrandSlack,
            breadcrumbs: false
        },
        {
            id: 'account-manager',
            title: 'Quản Lý Tài Khoản',
            type: 'collapse',
            url: '/utils/util-typography',
            icon: icons.IconUser,
            children: [
                {
                    id: 'customer',
                    title: 'Quản lý tài khoản nhân viên',
                    type: 'item',
                    url: '/admin/admin-manager',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Quản lý tài khoản khách hàng',
                    type: 'item',
                    url: '/admin/customer-management',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'booking',
            title: 'Quản Lý Đặt Phòng',
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
                }
            ]
        },
        {
            id: 'hoadon',
            title: 'Quản lý hóa đơn',
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
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'tkkh',
                    title: 'Thống kê hóa đơn',
                    type: 'item',
                    url: '/icons/material-icons',
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
