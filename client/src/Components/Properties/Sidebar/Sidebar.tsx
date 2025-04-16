import { useState } from "react";
import styles from "./sidebar.module.css"
import { useDispatch } from "react-redux";
import { setSearchData } from "../../../Redux/searchSlice";
import { AppDispatch } from "../../../Redux/store";

interface FormData {
    house?: boolean;
    aparment?: boolean;
    land?: boolean;
    commercial?: boolean;

    minPrice?: string;
    maxPrice?: string;
    size?: string;

    sale?: boolean;
    rent?: boolean;

    location?: string;
}

const Sidebar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [formData, setformData] = useState<FormData>({
        house: false,
        aparment: false,
        land: false,
        commercial: false,

        minPrice: "",
        maxPrice: "",
        size: "",

        sale: false,
        rent: false,

        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setformData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setSearchData(formData));
    };

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <h3>Property Type</h3>
                <div className={styles.propertyType}>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, house: e.target.checked }))} />House
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, aparment: e.target.checked }))} value="apartment" />Apartment
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, land: e.target.checked }))} value="land" />Land
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, commercial: e.target.checked }))} value="comercial" />Comercial
                    </label>
                </div>
            </div>
            <div className={styles.price}>
                <div>
                    <h3>Min Price</h3>
                    <input type="number" name="minPrice" value={formData.minPrice} onChange={handleChange} placeholder="Min Price $" />
                </div>
                <div>
                    <h3>Max Price</h3>
                    <input type="text" name="maxPrice" value={formData.maxPrice} onChange={handleChange} placeholder="Max Price $" />
                    </div>
            </div>
            <div className={styles.price}>
                <div>
                    <h3>Size</h3>
                    <input type="number" name="size" value={formData.size} onChange={handleChange} placeholder="m2" />
                </div>
            </div>
            <div>
                <h3>Offer Type</h3>
                <div className={styles.offer}>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, sale: e.target.checked }))} value="sale" />For Sale
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => setformData(prev => ({ ...prev, rent: e.target.checked }))} value="rent" />For Rent
                    </label>
                </div>
            </div>
            <div className={styles.location}>
                <h3>Location</h3>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <button type="submit" className={styles.button}>Search</button>
        </form>
    );
};

export default Sidebar