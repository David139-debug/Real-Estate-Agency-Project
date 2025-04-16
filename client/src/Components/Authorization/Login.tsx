import styles from "./authorization.module.css"
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../Redux/authSlice";
import { RootState } from "../../Redux/store";
import { AxiosError } from "axios";
import api from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Error {
    email?: string;
    password?: string
}

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.auth);
    const [error, setError] = useState<Error>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as "email" | "password";
        if (name in formData) {
            dispatch(updateField({ name: name, value: e.target.value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("http://localhost:5000/login", formData);
            if (response.data) {
                navigate("/");
            }
            setError({});
        } catch (err) {
            const axError = err as AxiosError;
            if (axError.response?.data) {
                setError(prev => ({ ...prev, password: "Invalid email or password." }));
            }
        }
    };

    return(
        <section className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm}>
                    <div>
                        <label>Email</label>
                        <input onChange={handleChange} value={formData.email} name="email" type="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input onChange={handleChange} value={formData.password} name="password" type="password" />
                        {error && <span className={styles.error}>{error.password}</span>}
                    </div>
                    <button className={styles.loginBtn} type="submit" onClick={handleSubmit}>Login</button>
                    <p className={styles.signUp}>Don't have account <a href="/register">Sign up</a> </p>
                </form>
            </div>
        </section>
    );
};

export default Login