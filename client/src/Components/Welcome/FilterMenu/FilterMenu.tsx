import styles from "./filterMenu.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSearchData } from "../../../Redux/searchSlice";
import { useState, useEffect } from "react";

interface FormData {
    offer: string;
    minPrice: string;
    maxPrice: string;
    type: string;
    location: string;
    area: string;
}

const FilterMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        offer: "",
        minPrice: "",
        maxPrice: "",
        type: "",
        location: "",
        area: "",
    });

    const [animation, setAnimation] = useState<boolean>(false);
    
    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 2500)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const convertedData = {
            sale: formData.offer === "Sale",
            rent: formData.offer === "Rent",
            house: formData.type === "House",
            aparment: formData.type === "Apartment",
            land: formData.type === "Land",
            commercial: formData.type === "Commercial",
            minPrice: formData.minPrice,
            maxPrice: formData.maxPrice,
            location: formData.location,
            size: formData.area
        };

        dispatch(setSearchData(convertedData));
        navigate("/properties");
    };

    return(
        <div className={`${styles.container} ${animation ? styles.animateContainer : ""}`}>
            <form className={styles.menu} onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                    <select name="offer" onChange={(e) => setFormData(prev => ({ ...prev, offer: e.target.value }))}>
                        <option value="">Offer Type</option>
                        <option value="Sale">For sale</option>
                        <option value="Rent">For rent</option>
                    </select>
                    <input onChange={handleChange} value={formData.minPrice} name="minPrice" type="number" placeholder="Price (from $)" />
                    <select onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))} name="property">
                    <option value="">Property Type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Land">Land</option>
                        <option value="Commercial">Comercial</option>
                    </select>
                    <input onChange={handleChange} value={formData.location} name="location" className={styles.location} type="text" placeholder="Location" />
                    <input onChange={handleChange} value={formData.maxPrice} name="maxPrice" type="number" placeholder="Price (to $)" />
                    <input onChange={handleChange} value={formData.area} name="area" type="number" placeholder="Area" />
                </div>
                <button type="submit">Search <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
            </form>
        </div>
    );
};

export default FilterMenu