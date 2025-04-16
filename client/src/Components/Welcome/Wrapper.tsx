import styles from "./wrapper.module.css";
import FilterMenu from "./FilterMenu/FilterMenu";
import { useEffect, useState } from "react";

const Wrapper = () => {

    const [animation, setAnimation] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 1000)
    }, [])

    return(
        <section className={styles.wrapper}>
            <h1 className={`${styles.title} ${animation ? styles.animateText : ""}`}>Discover <span style={{ color: "#dc5304" }}>Prime Real Estate</span> Opportunities.</h1>
            <p className={`${styles.text} ${animation ? styles.animateText : ""}`}>Discover our exclusive offers tailored just for you!</p>
            <FilterMenu />
        </section>
    );
};

export default Wrapper