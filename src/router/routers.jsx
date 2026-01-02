import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import SignIn from "../features/Auth/SignIn/SignIn";
import SignUp from "../features/Auth/SignUp/SignUp";
import DashBoard from "../features/DashBoard/DashBoard";
import ReceiveAgencyPage from "../features/ReceiveAgency/ReceiveAgencyPage";
import SearchAgencyPage from "../features/SearchAgency/SearchAgencyPage";
import ExportInvoicePage from "../features/ExportInvoice/ExportInvoicePage";
import CreateExportInvoicePage from "../features/ExportInvoice/CreateExportInvoicePage";
import InvoicePage from "../features/Invoice/InvoicePage";
import CreateInvoicePage from "../features/Invoice/CreateInvoicePage";
import ReportListPage from "../features/Report/ReportPage";
import EditRulesPage from "../features/EditRules/EditRulesPage";
import Layout from "../layout/Layout";


const routers = [
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    },

    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <DashBoard />
                    },
                    {
                        path: 'dashboard',
                        element: <DashBoard />
                    },
                    {
                        path: 'receive-agency',
                        element: <ReceiveAgencyPage />
                    },
                    {
                        path: 'search-agency',
                        element: <SearchAgencyPage />
                    },
                    {
                        path: 'list-export',
                        element: <ExportInvoicePage />
                    },
                    {
                        path: 'list-export/create-export',
                        element: <CreateExportInvoicePage />
                    },
                    {
                        path: 'list-invoice',
                        element: <InvoicePage />
                    },
                    {
                        path: 'list-invoice/create-invoice',
                        element: <CreateInvoicePage />
                    },
                    {
                        path: 'reports',
                        element: <ReportListPage />
                    },
                    {
                        path: 'edit-rules',
                        element: <EditRulesPage />
                    },
                ]
            }
        ]
    },


];

export default routers;