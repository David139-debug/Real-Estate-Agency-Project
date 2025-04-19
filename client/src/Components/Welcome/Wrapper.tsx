import styles from "./wrapper.module.css";
import FilterMenu from "./FilterMenu/FilterMenu";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Redux/searchSlice";
import { useNavigate } from "react-router";
import { fetchUser } from "../../Redux/userSlice";
import { AppDispatch } from "../../Redux/store";
import { RootState } from "../../Redux/store";

const Wrapper = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user)
    const status = useSelector((state: RootState) => state.user.status)
    const navigate = useNavigate();

    const [animation, setAnimation] = useState<boolean>(false);
    const [sidebar, setSidebar] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 1000)
    }, [])

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const handleClosing = (e: MouseEvent) => {
            if (sidebarRef.current) {
                if (!sidebarRef.current.contains(e.target as Node)) {
                    setSidebar(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClosing);
        return () => {
            document.removeEventListener("mousedown", handleClosing);
        }
    }, [])

    const handleProps = (e: React.MouseEvent<HTMLLIElement>, propertyType: "House" | "Apartment" | "Land" | "Commercial") => {
            e.preventDefault();
    
            const data = {
                house: propertyType === "House",
                aparment: propertyType === "Apartment",
                land: propertyType === "Land",
                commercial: propertyType === "Commercial",
            };
    
            dispatch(setSearchData(data));
            navigate("/properties");
    };

    return(
        <section className={styles.wrapper}>
            <div className={`${styles.overlay} ${sidebar ? styles.setOverlay : ""}`}></div>
            <FontAwesomeIcon onClick={() => setSidebar(true)} className={styles.navBtn} icon={faBars} />
            <nav ref={sidebarRef} className={`${styles.navbar} ${sidebar ? styles.openSidebar : ""}`}>
                <ul className={styles.navList}>
                    <div>
                        <li onClick={(e) => handleProps(e, "House")}>Houses</li>
                    </div>
                    <div>
                        <li onClick={(e) => handleProps(e, "Apartment")}>Apartments</li>
                    </div>
                    <div>
                        <li onClick={(e) => handleProps(e, "Land")}>Land</li>
                    </div>
                    <div>
                        <li onClick={(e) => handleProps(e, "Commercial")}>Commerical</li>
                    </div>
                    {status === "succeeded" && (
                        <div className={styles.profileDiv}>
                            <a href="/profile" className={styles.profile}>{user?.name}<FontAwesomeIcon icon={faUser} />{user?.name}</a>
                        </div>
                    )}
                    {status !== "succeeded" && (
                        <div>
                        <li>
                            <button className={styles.btn} onClick={() => navigate("/login")}>Login</button>
                            <button className={styles.btn} onClick={() => navigate("/register")}>Register</button>
                        </li>
                    </div>
                    )}
                </ul>
            </nav>
            <h1 className={`${styles.title} ${animation ? styles.animateText : ""}`}>Discover <span style={{ color: "#dc5304" }}>Prime Real Estate</span> Opportunities.</h1>
            <p className={`${styles.text} ${animation ? styles.animateText : ""}`}>Discover our exclusive offers tailored just for you!</p>
            <FilterMenu />
        </section>
    );
};

export default Wrapper