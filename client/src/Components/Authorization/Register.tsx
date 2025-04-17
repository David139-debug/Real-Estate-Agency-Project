import styles from "./authorization.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../../Redux/authSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchUser } from "../../Redux/userSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import api from "../../api";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

interface Errors {
    name?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    password?: string;
}

const Register = () => {

    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.user.user);
    const status = useSelector((state: RootState) => state.user.status);

    useEffect(() => {
            dispatch(fetchUser());
        }, [dispatch]);
    
        useEffect(() => {
            if (status === "loading" || status === "succeeded" ) {
                if (user) {
                    navigate("/");
                }
            }
        }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as "name" | "lastname" | "phone" | "email" | "password";

        if (name in formData) {
            dispatch(updateField({ name: name, value: e.target.value, minLength: e.target.minLength }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let newErrors: Errors = {};

        if (formData.name.length < 5) {
            newErrors.name = "You must enter at least 5 characters.";
        }
        if (formData.lastname.length < 5) {
            newErrors.lastname = "You must enter at least 5 characters.";
        }
        if (formData.phone.length < 8) {
            newErrors.phone = "You must enter at least 8 characters.";
        }
        if (formData.password.length < 6) {
            newErrors.password = "You must enter at least 6 characters.";
        }
        if (formData.email) {
            if (!emailRegex.test(formData.email)) {
                newErrors.email =  "Invalid email format.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            await api.post(BACKEND_URI, formData, { withCredentials: true });
            dispatch(fetchUser());
            navigate("/");
            window.location.reload();
            dispatch(resetForm());
        } catch (err) {
            const error = err as AxiosError;
            console.error(err);
            if (error.response?.data) {
                const data = error.response.data as { message: string };
                if (data) return setErrors(prev => ({ ...prev, email: data.message }));
            }
        }
    }

    return(
        <section className={styles.registerWrapper}>
            <div className={styles.registerContainer}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div>
                        <label>Name</label>
                        <input onChange={handleChange} value={formData.name} name="name" type="text" maxLength={30} required />
                        {errors && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div>
                        <label>Last name</label>
                        <input onChange={handleChange} value={formData.lastname} name="lastname" type="text" maxLength={50} required />
                        {errors && <span className={styles.error}>{errors.lastname}</span>}
                    </div>
                    <div>
                        <label>Phone</label>
                        <input onChange={handleChange} value={formData.phone} name="phone" type="text" maxLength={25} required />
                        {errors && <span className={styles.error}>{errors.phone}</span>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input onChange={handleChange} value={formData.email} name="email" type="email" required />
                        {errors && <span className={styles.error}>{errors.email}</span>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input onChange={handleChange} value={formData.password} name="password" type="password" required />
                        {errors && <span className={styles.error}>{errors.password}</span>}
                    </div>
                    <button className={styles.registerButton} type="submit">Register</button>
                </form>
            </div>
        </section>
    );
};

export default Register