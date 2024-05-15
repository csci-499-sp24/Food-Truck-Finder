import Rating from 'react-rating-stars-component';
import Link from "next/link";
import "../styles/truckDetail.css";



function TruckDetail({ selectedTruck }){
    return (
        <div className="truck-detail">
            <div className='truncate w-full'>
                <p className="text-2xl font-semibold pt-2 truncate h-10">{selectedTruck.name}</p>
                <p className='h-6 truncate'>{selectedTruck.address}</p>
                <div className="rating h-5">
                    <Rating value={selectedTruck.ratings/selectedTruck.review_count}
                    count={5}
                    size={20}
                    activeColor="gold"
                    inactiveColor="#FFF"
                    edit={false}>
                    </Rating>  
                    <div className="review-count"> ({selectedTruck.review_count}) </div>
                </div>
                <div className="cuisines-container h-11 pt-3 pb-5">
                    <div className="cuisines flex flex-row">
                    <p className={selectedTruck.vegan ? "vegan" : ""}>{selectedTruck.vegan ? "Vegan": null}</p>
                    <p className={selectedTruck.halal ? "halal" : ""}>{selectedTruck.halal ? "Halal": null}</p>
                    <p className={selectedTruck.mexican ? "mexican" : ""}>{selectedTruck.mexican ? "Mexican": null}</p>
                    </div>
                </div>
            </div>
        </div>    
    )
}


export default TruckDetail;

