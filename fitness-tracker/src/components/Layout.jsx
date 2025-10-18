import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto mt-40 p-6">
        {children}
      </main>
      
     
      <Footer />
  

    </div>
  );
}

export default Layout;
