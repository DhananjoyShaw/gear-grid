import { getAdmin } from "@/actions/admin";
import Sidebar from "./admin/_components/sidebar";
import NotFound from "../not-found";
import Header from "@/components/header";

const AdminLayout = async ({ children }) => {
    const admin = await getAdmin();

    // If user not found in our db or not an admin, redirect to 404
    if (!admin.authorized) {
        return NotFound();
    }

    return (
        <div className="h-full">
            <Header isAdminPage={true} />
            <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout;


// git commit -m "feat: implementing admin dashboard API and dashboard page"

