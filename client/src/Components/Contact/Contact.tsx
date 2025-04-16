import styles from "./contact.module.css"
import { fetchUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Contact = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.user.status);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    console.log(user)

    useEffect(() => {
        if (status === "succeeded" || status === "loading") {
            if (!user) {
                navigate("/login", { state: { from: "/contact" } });
            }
            
        }
    }, [status, user])

    return(
        <section className={styles.wrapper}>
            <form className={styles.form}>
                <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Contact Form</h1>
                <div>
                    <label>Your Name</label>
                    <input type="text" required/>
                </div>
                <div>
                    <label>Your Email</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Property type</label>
                    <select>
                        <option value="" hidden>Select Type</option>
                        <option value="">House</option>
                        <option value="">Apartment</option>
                        <option value="">Land</option>
                        <option value="">Commercial</option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Message</label>
                    <textarea name="" required></textarea>
                </div>
                <button type="submit" className={styles.sendBtn}>Send Message</button>
            </form>
        </section>
    );
};

export default Contact