import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'; // Ensure you've created this CSS Module

export default function Home() {
  // State for managing selected food truck data
  const [selectedFoodTruck, setSelectedFoodTruck] = useState({
    name: "Asian Fusion",
    rating: "4.5/5",
    description: "Halal/Vegan",
    menu: [
      { item: "Chicken Lo Mein", price: "$5" },
      // ...other menu items
    ],
    reviews: [
      { name: "Jane Doe", rating: "5/5", comment: "Delicious food!" },
      // ...other reviews
    ],
  });

  // Assume you have a function to fetch food trucks data
  useEffect(() => {
    // Replace this with actual data fetching logic
    // and update the selectedFoodTruck state accordingly
  }, []);

  return (
    <div>
      <Head>
        <title>{selectedFoodTruck.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    
      <main className={styles.main}>
        <section className={styles.foodTruckProfile}>
          <div className={styles.favorite}>
            <span>⭐ Add to Favorite</span>
          </div>
          <h1 className={styles.title}>{selectedFoodTruck.name}</h1>
          <div className={styles.rating}>{selectedFoodTruck.rating}</div>
          <p className={styles.description}>{selectedFoodTruck.description}</p>

          <div className={styles.details}>
            <h2>Menu</h2>
            {/* Apply the foodTruckList class here */}
            <ul className={styles.foodTruckList}>
              {selectedFoodTruck.menu.map((item, index) => (
                <li key={index}>{item.item} - {item.price}</li>
              ))}
            </ul>
            <h2>Customer Comments and Ratings</h2>
            {selectedFoodTruck.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <span>{review.name} - {review.rating}</span>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className={styles.map}>
          {/* Embed map component or image here */}
          <p>Map placeholder</p>
        </section>
      </main>
      
      <footer className={styles.footer}>
        <p>© 2024 Food Truck Finder - All rights reserved.</p>
      </footer>
    </div>
  );
}

