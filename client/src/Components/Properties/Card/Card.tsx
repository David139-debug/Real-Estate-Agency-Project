import { useLocation } from "react-router";
import styles from "./card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../Redux/userSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../Redux/store";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router";
import api from "../../../api";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const Card = () => {

    const location = useLocation();
    const property = location.state;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);

    const [imgIndex, setImgIndex] = useState<number>(0);
    const [animation, setAnimation] = useState<boolean>(false);
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 500);

        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setAnimation(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const handleDelete = async () => {
        try {
            await api.delete(`http://localhost:10000/deleteProperty`, {
                data: {
                    id: property._id
                }
            });
            navigate("/properties");
        } catch (err) {
            console.error(err);
        }
    };

    const handleNext = () => {
        const images = property.img;
        if (imgIndex < images.length - 1) {
            setImgIndex(prev => (prev + 1));
        }
    };

    const handlePrev = () => {
        if (imgIndex > 0) {
            setImgIndex(prev => (prev - 1));
        }
    };

    return(
        <section className={styles.wrapper}>
            <div className={`${styles.imgDiv} ${animation ? styles.animateImages : ""}`}>
                <div className={styles.left}>
                    <div onClick={handlePrev}><FontAwesomeIcon style={{ transform: "translate(10%)" }} className={`${styles.scrollIcons} ${styles.leftIcon}`} icon={faAngleLeft} /></div>
                    <img className={styles.img} src={`http://localhost:10000/${property.img[imgIndex]}`} />
                    <div onClick={handleNext}><FontAwesomeIcon style={{ transform: "translate(-110%)" }} className={`${styles.scrollIcons} ${styles.rightIcon}`} icon={faAngleRight} /></div>
                </div>
                <div className={styles.right}>
                    {property.img.map((image: string, index: number) => (
                        <img key={index} className={styles.miniImg} src={`http://localhost:10000/${image}`} />
                    ))}
                </div>
            </div>
            <article className={`${styles.about} ${animation ? styles.animateText : ""}`}>
                <div className={styles.name}>
                    <div>{property.name}</div>
                    <div style={{ color: "#dc5404", fontWeight: "bold", margin: "1em 0" }}>{property.offer === "Rent" ? <p style={{ fontSize: "1.3rem", color: "black" }}>Price per Night</p> : ""}{Number(property.price).toLocaleString("de-DE")} $</div>
                </div>
                <div className={styles.details}>
                    <div className={styles.propDiv}>
                        <div className={styles.title}>Category</div>
                        <div className={styles.value}>{property.type}</div>
                    </div>
                    {(property.type !== "Land" && property.type !== "Commercial") && (
                        <>
                            <div className={styles.propDiv}>
                        <div className={styles.title}>Bathrooms</div>
                        <div className={styles.value}>{property.bathroom}</div>
                    </div>
                    <div className={styles.propDiv}>
                        <div className={styles.title}>Bedrooms</div>
                        <div className={styles.value}>{property.bedroom}</div>
                    </div>
                        </>
                    )}
                    <div className={styles.propDiv}>
                        <div className={styles.title}>Area</div>
                        <div className={styles.value}>{property.area} m2</div>
                    </div>
                </div>
                <div className={styles.propertyDesc}>
                    <h1 className={styles.descTitle}>Description</h1>
                    <p>{property.text}</p>
                </div>
                {(property.type !== "Land" && property.type !== "Commercial") && (
                    <div className={styles.features}>
                    <h1 className={styles.descTitle}>Features</h1>
                    <div className={styles.featDiv}>
                        <div className={styles.title}>Year of Construction</div>
                        <div className={styles.value}>{property.year}</div>
                    </div>
                    <div className={styles.featDiv}>
                        <div className={styles.title}>Parking space</div>
                        <div className={styles.value}>{property.parking}</div>
                    </div>
                    {(property.type !== "Land" && property.type !== "Commercial") && (
                        <div className={styles.featDiv}>
                        <div className={styles.title}>Pool</div>
                        <div className={styles.value}>{property.pool === true ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</div>
                    </div>
                    )}
                    <div className={styles.featDiv}>
                        <div className={styles.title}>Balcony</div>
                        <div className={styles.value}>{property.balcony === true ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</div>
                    </div>
                    <div className={styles.featDiv}>
                        <div className={styles.title}>Heating</div>
                        <div className={styles.value}>{property.heating}</div>
                    </div>
                </div>
                )}
                <div className={styles.agent}>
                    <div className={styles.card}>
                        <p>Agent<br /> {property?.agent}</p>
                        <button onClick={() => navigate("/contact")} className={styles.contactBtn}>Contact Agent</button>
                    </div>
                </div>
                {(user?.role === "agent" || user?.role === "owner") ? <button onClick={handleDelete} className={styles.deleteBtn}>Delete Property</button> : ""}
            </article>
        </section>
    );
};

export default Card