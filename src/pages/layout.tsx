// components/Layout.tsx
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative overflow-hidden" >
            <video autoPlay muted loop className="fixed inset-0 w-full h-full object-cover z-0" >
                <source src="/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <main className="relative z-10" > {children} </main>
        </div>
    );
};

export default Layout;
