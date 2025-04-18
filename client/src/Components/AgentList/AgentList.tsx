import { useEffect, useState } from "react";
import styles from "./agentList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/userSlice";
import api from "../../api";
import { AppDispatch } from "../../Redux/store";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

interface Agent {
    num: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
}

const AgentList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const role = useSelector((state: RootState) => state.user.user?.role);
    const status = useSelector((state: RootState) => state.user.status);

    const [agents, setAgents] = useState<Agent[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get(`${BACKEND_URI}/getUsers`);
            let filteredAgents = response.data.filter((user: any) => user.role === "agent")
            setAgents(filteredAgents);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (role === undefined) {
            navigate("/")
        }
        if (status === "loading" || status === "succeeded") {
            if (role !== "owner") {
                navigate("/");
            }
        }
    }, [navigate, role])

    return (
        <article className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{agent.name}</td>
                            <td>{agent.lastname}</td>
                            <td>{agent.email}</td>
                            <td>{agent.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
};

export default AgentList