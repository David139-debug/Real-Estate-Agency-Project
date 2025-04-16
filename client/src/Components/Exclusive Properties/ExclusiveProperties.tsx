import styles from "./exclusiveProperties.module.css"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { prevHouse, nextHouse, setAnimation } from "../../Redux/exclusivePropertiesSlice";
import { fetchProperties } from "../../Redux/exclusivePropertiesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ExclusiveProperties = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { houses, index, animation } = useSelector((state: RootState) => state.exclusiveProperties);
    const navigate = useNavigate();
    const limitedHouses = houses.slice(0, 4);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    const handlePrev = () => {
        if (index > 0) {
            dispatch(setAnimation(styles.animation));
            setTimeout(() => {
                dispatch(prevHouse());
                dispatch(setAnimation(styles.active));
            }, 500);
        }
    };

    const handleNext = () => {
        if (index < houses.length - 1) {
            dispatch(setAnimation(styles.animation));
            setTimeout(() => {
                dispatch(nextHouse());
                dispatch(setAnimation(styles.active));
            }, 500);
        }
    };

    return(
        <section className={styles.wrapper}>
            <h1>Explore the Most Stunning Properties Available Right Now!</h1>
            <article className={styles.flexDiv}>
                <div onClick={handlePrev} className={styles.prev}>&#10094;</div>
                    {limitedHouses.length > 0 && (
                        <div key={index} className={`${styles.card} ${animation}`}>
                        <img src={`http://localhost:5000/${houses[index].img}`} />
                        <h1 className={styles.houseName}>{houses[index].name}</h1>
                        <div className={styles.info}>
                            <p>{houses[index].price}<br /> $</p>
                            <p>Area<br /> {houses[index].area}</p>
                        </div>
                        <button onClick={() => navigate("/card", { state: houses[index] })} className={styles.cardBtn}>Visit</button>
                    </div>
                    )}
                <div onClick={handleNext} className={styles.next}>&#10095;</div>
            </article>
        </section>
    );
};

export default ExclusiveProperties