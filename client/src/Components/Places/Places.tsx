import styles from "./places.module.css"
import kvarner from "./img/kvarner.jpg"
import istra from "./img/istra.jpg"
import dalmacija from "./img/dalmacija.jpg"
import zagorje from "./img/zagorje.jpg"
import { setSearchData } from "../../Redux/searchSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

const Places = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [animation, setAnimation] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 160) {
                setAnimation(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, reg: string) => {
        e.preventDefault();

        const propRegion = { region: reg };

        dispatch(setSearchData(propRegion));
        navigate("/properties");
    };

    return(
        <section className={styles.wrapper}>
            <article className={styles.gridDiv}>
                <div className={`${styles.card} ${animation ? styles.animateCard : ""}`} onClick={(e) => handleClick(e, "Kvarner")}>
                    <img src={kvarner} />
                    <h1 className={styles.name}>KVARNER</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={`${styles.card} ${styles.cardRight} ${animation ? styles.animateCard : ""}`} onClick={(e) => handleClick(e, "Istria")}>
                    <img src={istra} />
                    <h1 className={styles.name}>ISTRIA</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={`${styles.card} ${animation ? styles.animateCard : ""}`} onClick={(e) => handleClick(e, "Dalmatia")}>
                    <img src={dalmacija} />
                    <h1 className={styles.name}>DALMATIA</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={`${styles.card} ${styles.cardRight} ${animation ? styles.animateCard : ""}`} onClick={(e) => handleClick(e, "Zagorje")}>
                    <img src={zagorje} />
                    <h1 className={styles.name}>ZAGORJE</h1>
                    <div className={styles.line}></div>
                </div>
            </article>
        </section>
    );
};

export default Places