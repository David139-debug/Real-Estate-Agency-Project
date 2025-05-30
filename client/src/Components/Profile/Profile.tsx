import { useEffect, useState } from "react";
import styles from "./profile.module.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/userSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import api from "../../api";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.user.user);

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
    });

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setFormData(prev => ({ 
                ...prev,
                name: data?.name,
                lastname: data.lastname,
                email: data.email,
            }));
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isEmailChanged = formData.email !== data?.email;

        console.log(isEmailChanged)

        try {
            await api.put(`${BACKEND_URI}/editProfile/${data?._id}`, { formData });
            navigate("/");
        } catch (err: any) {
            const message = err.response?.data?.message;
            
            if (message === "Email is already in use." && isEmailChanged) {
                alert(err.response.data.message)
            }
        }
    };

    return(
        <section className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleEdit}>
                <h1 className={styles.topic}>Edit Your Profile</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name"  onChange={handleChange} value={formData.name} />
                        <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
                        <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" onChange={handleChange}  value={formData.email} />
                        <FontAwesomeIcon className={`${styles.icon} ${styles.passIcon}`} icon={faEnvelope} />
                    </div>
                </div>
                <button type="submit" className={styles.editBtn}>Edit</button>
            </form>
        </section>
    );
};

export default Profile