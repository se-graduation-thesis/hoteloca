import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';




// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

//Manager
const AdminManager = Loadable(lazy(() => import('views/manager/account-manager/AdminManager')));
const RoomManagement = Loadable(lazy(() => import('views/manager/hotel-management/room-management/Room')));
const ServiceManagement = Loadable(lazy(() => import('views/manager/hotel-management/service-management/service')));

const ListRoomBooking = Loadable(lazy(() => import('views/manager/booking-management/booking/ListRoomBooking')));
const AddBooking = Loadable(lazy(() => import('views/manager/booking-management/booking/AddBooking')));
const BookingInfomation = Loadable(lazy(() => import('views/manager/booking-management/booking/BookingInfomation')));

const Calendar = Loadable(lazy(() => import('views/manager/booking-management/book-calendar/Calendar')));
const BookingCalendar = Loadable(lazy(() => import('views/manager/booking-management/book-calendar/BookCalendar')));
const TabBooking = Loadable(lazy(() => import('views/manager/booking-management/list-booking/TabBooking')));
const Payment = Loadable(lazy(() => import('views/manager/booking-management/payment/Payment')));
const PrintPdf = Loadable(lazy(() => import('views/manager/booking-management/payment/PrintPdf')));
const ReceiptManagerment = Loadable(lazy(() => import('views/manager/receipt-managerment/ReceiptManagerment')));



const BrandManager = Loadable(lazy(() => import('views/manager/hotel-manager/brand-manager/BrandManager')));
const CategoryManager = Loadable(lazy(() => import('views/manager/hotel-manager/category-manager/CategoryManager')));


// sample page routing
const CustomerManagement = Loadable(lazy(() => import('views/manager/account-manager/customer-management/Customer')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/admin/admin-manager',
            element: <AdminManager />
        },
        {
            path: '/admin/brand-manager',
            element: <BrandManager />
        },
        {
            path: '/admin/booking',
            element: <ListRoomBooking />
        },
        {
            path: '/admin/category-manager',
            element: <CategoryManager />
        },
        {
            path: '/admin/booking-calendar/:roomId',
            element: <Calendar />
        },
        {
            path: '/admin/booking-payment/:bill',
            element: <Payment />
        }
        , {
            path: '/admin/booking-calendar1',
            element: <BookingCalendar />
        },
        {
            path: '/admin/list-booking',
            element: <TabBooking />
        },
        {
            path: '/admin/add-booking',
            element: <AddBooking />
        },
        {
            path: '/admin/booking-infomation',
            element: <BookingInfomation />
        },
        {
            path: '/admin/export-pdf',
            element: <PrintPdf />
        },
        {
            path: '/admin/receipt-managerment',
            element: <ReceiptManagerment />
        },
        {
            path: '/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/admin/hotel-management/room',
            element: <RoomManagement />
        },
        {
            path: '/admin/hotel-management/service',
            element: <ServiceManagement />
        },
        {
            path: '/admin/customer-management',
            element: <CustomerManagement />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
