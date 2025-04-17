import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./addMenu.module.css"
import { faImage } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { fetchUser } from "../../../Redux/userSlice";
import { useNavigate } from "react-router";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

interface Property {
    img: string;
    name: string;
    text: string;
    type: string;
    offer: string;
    heating: string;
    year: string,
    parking: string,
    location: string;
    region: string;
    price: string;
    area: string;
    bathrooms: string;
    bedrooms: string;
    pool: boolean;
    balcony: boolean;
    agent: string;
}

const AddMenu = () => {

    const dispatch = useDispatch<AppDispatch>();
    const name = useSelector((state: RootState) => state.user.user?.name);
    const role = useSelector((state: RootState) => state.user.user?.role);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Property>({
        img: "",
        name: "",
        text: "",
        type: "",
        offer: "",
        heating: "",
        year: "",
        parking: "",
        location: "",
        region: "",
        price: "",
        area: "",
        bathrooms: "",
        bedrooms: "",
        pool: false,
        balcony: false,
        agent: ""
    });
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    if (role !== "agent") {
        navigate("/");
        return null;
    }

    useEffect(() => {
        if (name) {
            setFormData(prev => ({ ...prev, agent: name }));
        }
    }, [name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const fileURLs = fileArray.map(file => URL.createObjectURL(file));
            setImageFiles(prev => [...prev, ...fileArray]);
            setSelectedImage(prev => [...prev, ...fileURLs]);
        }
    };

    const handleHouse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        imageFiles.forEach(file => {
            formDataToSend.append("img", file);
        });

        formDataToSend.append("name", formData.name);
        formDataToSend.append("text", formData.text);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("offer", formData.offer);
        formDataToSend.append("heating", formData.heating);
        formDataToSend.append("year", formData.year);
        formDataToSend.append("parking", formData.parking);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("region", formData.region);
        formDataToSend.append("price", String(formData.price));
        formDataToSend.append("area", String(formData.area));
        formDataToSend.append("bathrooms", String(formData.bathrooms));
        formDataToSend.append("bedrooms", String(formData.bedrooms));
        formDataToSend.append("balcony", String(formData.balcony));
        formDataToSend.append("pool", String(formData.pool));
        formDataToSend.append("agent", formData.agent);
        await api.post(BACKEND_URI, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        navigate("/properties");
    };

    return(
        <section className={styles.menu}>
            <form className={styles.form} onSubmit={handleHouse}>
                <h1 className={styles.topic}>Property Menu</h1>
                <label className={styles.uploadBox}>
                    {selectedImage?.length > 0 ? (
                        <div className={`${selectedImage?.length > 1 ? styles.imgsDiv : styles.oneImg}`}>
                            {selectedImage.map((img, index) => (
                                <img key={index} src={img} className={styles.selectedImg} />
                            ))}
                        </div>
                    ) : 
                    <FontAwesomeIcon icon={faImage} className={styles.browseImg} />}
                    <input className={styles.input} type="file" name="img" onChange={handleImageChange} accept="image/*" hidden />
                </label>
                <div className={`${styles.flexDiv} ${styles.name_location}`}>
                    <div>
                        <label>Property name</label>
                        <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Location</label>
                        <input className={styles.input} type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <select onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))} required>
                        <option value="" hidden>Select Region</option>
                        <option value="Kvarner">Kvarner</option>
                        <option value="Istria">Istria</option>
                        <option value="Dalmatia">Dalmatia</option>
                        <option value="Zagorje">Zagorje</option>
                    </select>
                </div>
                <div>
                    <label>About Property</label>
                    <textarea name="text" onChange={(e) => setFormData({ ...formData, text: e.target.value })} value={formData.text} className={styles.text} required></textarea>
                </div>
                <div className={styles.flexDiv}>
                <div>
                        <label>Property Type</label>
                        <select onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))} required>
                            <option value="" hidden>Select type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Land">Land</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                <div>
                    <label>Offer Type</label>
                    <select onChange={(e) => setFormData(prev => ({ ...prev, offer: e.target.value }))} required>
                        <option value="" hidden>Select type</option>
                        <option value="Sale">Sale</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>
                </div>
                <div className={styles.flexDiv}>
                <div>
                    <label>Price</label>
                    <input className={styles.input} type="number" name="price" value={formData.price} onChange={handleChange} placeholder="$" required />
                </div>
                <div>
                    <label>Area</label>
                    <input className={styles.input} type="number" name="area" value={formData.area} onChange={handleChange} placeholder="m2" required />
                </div>
                </div>
                {formData.type !== "Land" && formData.type !== "Commercial" && (
                    <div style={{ borderTop: "2px solid gray" }}>
                    <label style={{ marginTop: "1em", fontSize: "2rem", fontWeight: "bold" }}>Features</label>
                    <div className={styles.flexDiv}>
                    <div>
                        <label>Year of Construction</label>
                        <input className={styles.input} value={formData.year} onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value}))} type="number" />
                    </div>
                    <div>
                        <label>Parking Space</label>
                        <input className={styles.input} value={formData.parking} onChange={(e) => setFormData(prev => ({ ...prev, parking: e.target.value}))} type="number" />
                    </div>
                    </div>
                    <div>
                        <label>Heating Type</label>
                        <select onChange={(e) => setFormData(prev => ({ ...prev, heating: e.target.value }))} required>
                            <option value="" hidden>Select type</option>
                            <option value="Central Heating">Central Heating</option>
                            <option value="Underfloor Heating">Underfloor Heating</option>
                            <option value="Air conditioning">Air conditioning</option>
                        </select>
                    </div>
                    <div className={styles.flexDiv}>
                    <div style={{ textAlign: "center" }}>
                        <label>Pool</label>
                        <input className={styles.checkbox} onChange={(e) => setFormData(prev => ({ ...prev, pool: e.target.checked }))} type="checkbox" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <label>Balcony</label>
                        <input className={styles.checkbox} onChange={(e) => setFormData(prev => ({ ...prev, balcony: e.target.checked }))} type="checkbox" />
                    </div>
                    </div>
                </div>
                )}
                {formData.type !== "Land" && formData.type !== "Commercial" && (
                    <div>
                    <label>Rooms</label>
                    <div className={styles.flexDiv}>
                        <input className={styles.input} type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required placeholder="Bedrooms" />
                        <input className={styles.input} type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required placeholder="Bathrooms" style={{ marginBottom: ".5em" }} />
                    </div>
                </div>
                )}
                <button type="submit" className={styles.button}>Add</button>
            </form>
        </section>
    );
};

export default AddMenu