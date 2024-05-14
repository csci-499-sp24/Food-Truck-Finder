import Rating from 'react-rating-stars-component';
import Link from "next/link";
import "../styles/truckDetail.css";



function TruckDetail({ selectedTruck }){
    console.log(selectedTruck);
    return (
        <div className="truck-detail">
            <h5>{selectedTruck.name}</h5>
            <h6>{selectedTruck.address}</h6>
            <div className="rating">
            <Rating value={selectedTruck.ratings/selectedTruck.review_count}
                count={5}
                size={24}
                activeColor="gold"
                inactiveColor="#FFF"
                edit={false}>
            </Rating>
            <div className="review-count"> ({selectedTruck.review_count}) </div>
            </div>
            <br />
            <div className="cuisines">
            <p className={selectedTruck.vegan ? "vegan" : ""}>{selectedTruck.vegan ? "Vegan": null}</p>
            <p className={selectedTruck.halal ? "halal" : ""}>{selectedTruck.halal ? "Halal": null}</p>
            <p className={selectedTruck.mexican ? "mexican" : ""}>{selectedTruck.mexican ? "Mexican": null}</p>
            </div>
            <Link legacyBehavior href={`/foodtruck/${selectedTruck.id}`}>
            <a className="truck-card-link">Go to Food Truck Page</a>
            </Link>
        </div>    
    )
}


export default TruckDetail;

