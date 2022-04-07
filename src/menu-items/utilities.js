// assets
import {
    IconTypography, IconPalette,
    IconShadow, IconWindmill, IconUser, IconBuildingSkyscraper, IconChartInfographic, IconReceipt
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
    IconReceipt
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Quản lý',
    type: 'group',
    children: [
        {
            id: 'hotel-manager',
            title: 'Quản Lý Khách Sạn',
            type: 'collapse',
            url: '/utils/util-typography',
            icon: icons.IconBuildingSkyscraper,
            children: [
                {
                    id: 'chinhanh',
                    title: 'Quản lý chi nhánh',
                    type: 'item',
                    url: '/admin/brand-manager',
                    breadcrumbs: false
                },
                {
                    id: 'loaiphong',
                    title: 'Quản lý loại phòng',
                    type: 'item',
                    url: '/admin/category-manager',
                    breadcrumbs: false
                },
                {
                    id: 'phong',
                    title: 'Quản lý phòng',
                    type: 'item',
                    url: '/admin/hotel-management/room',
                    breadcrumbs: false
                },
                {
                    id: 'dichVu',
                    title: 'Quản lý dịch vụ',
                    type: 'item',
                    url: '/admin/hotel-management/service',
                    breadcrumbs: false
                }
            ]
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
                    title: 'Quản lý nhân viên',
                    type: 'item',
                    url: '/admin/admin-manager',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Quản lý khách hàng',
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
            icon: icons.IconUser,
            children: [
                {
                    id: 'customer',
                    title: 'Đặt phòng',
                    type: 'item',
                    url: '/admin/booking',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Danh sách đơn đặt',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'hoadon',
            title: 'Quản lý hóa đơn',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconReceipt,
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
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
