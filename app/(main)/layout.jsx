import Footer from "@/components/footer";
import React from "react";

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="container mx-auto my-20">
                {children}
            </div>
            <Footer />
        </>
    )
};

export default MainLayout;