import axios from "axios";
import { useEffect, useState } from "react";
import routes from "../routes.js";


const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
};

const PrivatePage = () => {
    const [content, setContent] = useState('');
    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
            setContent(data);
        };
        fetchContent();
    }, []);

    return content && <p>{content}</p>;
};

export default PrivatePage;