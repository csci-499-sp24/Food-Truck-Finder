function Validation(values) {

    const info = {
        email: values.email,
        password : values.password
    }
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
                method: 'POST',
                body: JSON.stringify(info)
            });
            const data = await response.json();
            console.log(data.status);
        } catch (error) {
            console.error("Error fetching food trucks:", error);
        }
    };
    fetchData();
}

export default Validation;
