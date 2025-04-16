import styles from "./properties.module.css";
import Sidebar from "./Sidebar/Sidebar";
import { faLocationDot, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchUser } from "../../Redux/userSlice";
import { useNavigate } from "react-router";
import { fetchHouses } from "../../Redux/houseSlice";

interface Property {
    name: string;
    location: string;
    region: string;
    price: number;
    area: number;
    bathroom: number;
    bedroom: number;
    type: string;
    offer: "Sale" | "Rent";
    img: string;
}

const Properties = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const properties = useSelector((state: RootState) => state.house.houses);
    const searchData = useSelector((state: RootState) => state.search);
    const agentName = useSelector((state: RootState) => state.search.searchData.agent);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [overlay, setOverlay] = useState<boolean>(false);
    const [animation, setAnimation] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchHouses());
        setTimeout(() => {
            setAnimation(true);
        }, 500)
    }, []);

    const handleCard = (property: Property) => {
        navigate("/card", { state: property });
    };

    const handleSidebar = () => {
        setSidebarOpen(true);
        setOverlay(true);
    };

    useEffect(() => {
        const handleClosingSidebar = (e: MouseEvent) => {
            if (!sidebarRef.current?.contains(e.target as Node)) {
                setSidebarOpen(false);
                setOverlay(false);
            } else {
                sidebarRef.current?.classList.add("openSidebar");
            }
        };
        document.addEventListener("mousedown", handleClosingSidebar);
        return () => {
            document.removeEventListener("mousedown", handleClosingSidebar);
        };
    }, []);

    const isFilterEmpty = Object.values(searchData.searchData).every(value => !value);

    const filteredProperties = isFilterEmpty ?
        properties : properties.filter((prop) => {
            const data = searchData.searchData;
    
        const typeFilterSelected = data.house || data.aparment || data.land || data.commercial;

        const matchesType = !typeFilterSelected ||( 
            (data.house && prop.type === "House") ||
            (data.aparment && prop.type === "Apartment") ||
            (data.land && prop.type === "Land") ||
            (data.commercial && prop.type === "Commercial")
        );

        const minPrice = data.minPrice ? parseInt(data.minPrice) : 0;
        const maxPrice = data.maxPrice ? parseInt(data.maxPrice) : Infinity;
        const matchesPrice = prop.price >= minPrice && prop.price <= maxPrice;

        const minSize = data.size ? parseInt(data.size) : 0;
        const matchesSize = prop.area >= minSize;

        const matchesLocation = data.location
            ? prop.location.toLowerCase().includes(data.location.toLowerCase())
            : true;
        
        const matchesOffer =
            (data.sale && prop.offer === "Sale") ||
            (data.rent && prop.offer === "Rent") ||
            (!data.sale && !data.rent);

        const matchesRegion = data.region ? prop.region === data.region : true;
        
        return matchesType && matchesPrice && matchesSize && matchesLocation && matchesOffer && matchesRegion;
    });

    return(
        <section className={styles.wrapper}>
                <div style={{ display: overlay ? "block" : "none" }} className={styles.overlay}></div>
                <div ref={sidebarRef} className={`${styles.sidebar} ${animation ? styles.animateSidebar : ""} ${sidebarOpen ? styles.openSidebar : ""}`}>
                    <Sidebar />
                </div>
                <FontAwesomeIcon onClick={handleSidebar} className={styles.sidebarIcon} icon={faBars} />
                <h1 className={`${styles.topic} ${animation ? styles.animateTopic : ""}`}>Real Estates</h1>
                <div className={styles.center}>
                    {(user.user?.role === "agent" || user.user?.role === "owner") && (
                        <div className={styles.addCard} onClick={() => navigate("/addMenu")}>
                            <FontAwesomeIcon icon={faPlus} fontSize={"4rem"} />
                            <h3>Add Property</h3>
                        </div>
                    )}
                    {filteredProperties.map((prop, index) => (
                        <div key={index} onClick={() => handleCard(prop)} className={`${styles.card} ${animation ? styles.animateCards : ""} ${agentName === prop.agent ? styles.myProperty : ""}`}>
                        <img src={`http://localhost:5000/${prop.img[0]}`} alt={prop.name} /> 
                        <div className={styles.text}>
                            <h1 className={styles.name}>{prop.name}</h1>
                            <h2 className={styles.location}><FontAwesomeIcon icon={faLocationDot} /> {prop.location}</h2>
                            <h1 style={{ padding: "1em", color: "#dc5404" }}>{prop.offer === "Rent" ? <p style={{ fontSize: "1.1rem", color: "black", marginBottom: "5px" }}>Price per Day</p> : ""}{Number(prop.price).toLocaleString("de-DE")} $</h1>
                            <div className={`${styles.rooms} ${prop.type === "Commercial" || prop.type === "Land" ? styles.centered : ""}`}>
                                {(prop.type !== "Commercial" && prop.type !== "Land") && (
                                    <>
                                        <h1>{prop.bedroom}<br /><span className={styles.room}>Bedrooms</span></h1>
                                        <h1>{prop.bathroom}<br /><span className={styles.room}>Bathrooms</span></h1>
                                    </>
                                )}
                                <h1>{prop.area}<br /><span className={styles.room}>m2</span></h1>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
        </section>
    );
};

export default Properties