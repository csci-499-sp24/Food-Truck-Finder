import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
require('dotenv').config();

export default function FoodTruckPage() {
    const router = useRouter();
    const { id } = router.query;
    const [foodTruck, setFoodTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodtrucks/${id}/info`);
                if (!response.ok) {
                    throw new Error('Failed to fetch food truck');
                }
                const data = await response.json();
                console.log("Fetched data:", data); 
                setFoodTruck(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching food truck:", error);
                setError(error);
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!foodTruck) {
        return <div>No food truck found.</div>;
    }

    return (
        <div>
            <h1>{foodTruck.foodTruck.name}</h1>
            {/* Display other details about the food truck */}
        </div>
    );
}



