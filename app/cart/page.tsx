import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import CartContainer from "./components/CartContainer";

const CartPage = () => {
    return (
        <div>
            <Navbar />
            <div className="custom-container">
                <CartContainer />
            </div>

            <Footer />
        </div>
    );
}

export default CartPage;