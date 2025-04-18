import { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";
import { setHide, setPrevScrollY } from "../../Redux/navbarSlice";
import { fetchUser } from "../../Redux/userSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api";
import { setSearchData } from "../../Redux/searchSlice";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const Navbar = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { hide, prevScrollY } = useSelector((state: RootState) => state.navbar);
    const user = useSelector((state: RootState) => state.user.user);
    const status = useSelector((state: RootState) => state.user.status);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll < prevScrollY) {
                dispatch(setHide(false));
            } else {
                dispatch(setHide(true));
            }
            dispatch(setPrevScrollY(currentScroll));
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY, dispatch]);

    const handleLogout = async () => {
        await api.post(`${BACKEND_URI}/logout`);
        window.location.reload();
    };

    const handleProps = (e: MouseEvent<HTMLLIElement>, offerType: "Sale" | "Rent", propertyType: string) => {
        e.preventDefault();

        const data = {
            sale: offerType === "Sale",
            rent: offerType === "Rent",
            house: propertyType === "House",
            aparment: propertyType === "Apartment",
            land: propertyType === "Land",
            commercial: propertyType === "Commercial",
        };

        dispatch(setSearchData(data));
        navigate("/properties");
    };

    const handleAgent = (name: string) => {
        const yourProp = {
            agent: name
        };

        dispatch(setSearchData(yourProp));
        navigate("/properties");
    };

    return(
        <section>
            <nav className={`${styles.navbar} ${hide ? styles.setHide : ""}`}>
                <div className={styles.left}>
                    <div className={styles.sale}>
                        <a href="#">Sale</a>
                        <ul className={styles.dropdownMenu}>
                            <div>
                                <li onClick={(e) => handleProps(e, "Sale", "House")}>House</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Sale", "Apartment")}>Apartment</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Sale", "Land")}>Land</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Sale", "Commercial")}>Commercial</li>
                            </div>
                        </ul>
                    </div>
                    <div className={styles.rent}>
                        <a href="#">Rent</a>
                        <ul className={styles.dropdownMenu}>
                            <div>
                                <li onClick={(e) => handleProps(e, "Rent", "House")}>House</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Rent", "Apartment")}>Apartment</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Rent", "Land")}>Land</li>
                            </div>
                            <div>
                                <li onClick={(e) => handleProps(e, "Rent", "Commercial")}>Commercial</li>
                            </div>
                        </ul>
                    </div>
                    <a href="/properties">Properties</a>
                    <a href="/">Home</a>
                </div>

                <div className={styles.right}>
                    {status === "succeeded" && (
                        <div className={styles.profileDiv}>
                            <a href="#" className={styles.profile}>{user?.name}<FontAwesomeIcon icon={faUser} /></a>
                            <ul className={styles.profileDropdownMenu}>
                                {user?.role === "user" && (
                                <>
                                <div>
                                <li onClick={() => navigate("/profile")}>Edit Profile</li>
                                </div>
                                <div onClick={handleLogout}>
                                    <li>Logout</li>
                                </div>
                                </>
                                )}
                                {user?.role === "agent" && (
                                <>
                                <div>
                                    <li onClick={() => navigate("/profile")}>Edit Profile</li>
                                </div>
                                <div>
                                    <li onClick={() => handleAgent(user.name)}>My Properties</li>
                                </div>
                                <div>
                                    <li onClick={() => navigate("/addMenu")}>Add Property</li>
                                </div>
                                <div onClick={handleLogout}>
                                    <li>Logout</li>
                                </div>
                                </>
                                )}
                                {user?.role === "owner" && (
                                <>
                                <div>
                                    <li onClick={() => navigate("/profile")}>Edit Profile</li>
                                </div>
                                <div onClick={handleLogout}>
                                    <li>Logout</li>
                                </div>
                                <div>
                                    <li onClick={() => navigate("/properties")}>My Properties</li>
                                </div>
                                <div>
                                    <li>Add Property</li>
                                </div>
                                <div>
                                    <li onClick={() => navigate("/agentList")}>Agent list</li>
                                </div>
                                </>
                                )}
                            </ul>
                        </div>
                    )}
                    {status !== "succeeded" && (
                        <>
                            <a href="/login">Login</a>
                            <button onClick={() => navigate("/register")}>Register</button>
                        </>
                    )}
                </div>
            </nav>
        </section>
    );
};

export default Navbar