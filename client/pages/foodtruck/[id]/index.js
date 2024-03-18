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
    }else if (error) {
        return <div>Error: {error.message}</div>;
    }else if (!foodTruck) {
        return <div>No food truck found.</div>;
    }else{
        return (
            <div>
                <h1>FoodTruck</h1>
                <h1>{JSON.stringify(foodTruck.foodTruck)}</h1>
                <h1>Reviews</h1>
                <h1>{JSON.stringify(foodTruck.reviews)}</h1>
                <h1>Menu</h1>
                <h1>{JSON.stringify(foodTruck.menu)}</h1>
                {/* Display other details about the food truck */}
            </div>
        );
    }
}



