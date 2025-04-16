import styles from "./contact.module.css"

const Contact = () => {

    const handleSubmit = () => {

    };

    return(
        <section className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Contact Form</h1>
                <div>
                    <label>Your Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Your Email</label>
                    <input type="email" />
                </div>
                <div>
                    <label>Property type</label>
                    <select>
                        <option value="" selected hidden>Select Type</option>
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
                    <textarea name=""></textarea>
                </div>
                <button type="submit" className={styles.sendBtn}>Send Message</button>
            </form>
        </section>
    );
};

export default Contact