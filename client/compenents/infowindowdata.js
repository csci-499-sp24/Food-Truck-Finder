import Rating from 'react-rating-stars-component';

const InfoWindowData = ({selectedTruck, truckImages}) => {
    return (
        <>
        <div className='flex'>
            <div >
                      <p className="text-2xl text-blue-600 text-clip w-16">
                          {selectedTruck.name}
                      </p>
                      <p className='text-l'>{selectedTruck.address}</p>
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
                      <div className="cuisines-container">
                      <div className="cuisines">

                        <p className={selectedTruck.vegan ? "vegan" : ""}>{selectedTruck.vegan ? "Vegan": null}</p>
                        <p className={selectedTruck.halal ? "halal" : ""}>{selectedTruck.halal ? "Halal": null}</p>
                        <p className={selectedTruck.mexican ? "mexican" : ""}>{selectedTruck.mexican ? "Mexican": null}</p>
                        </div>

                      </div>
                    </div>
                    <div className="image-container">
                        {truckImages.length > 0 ? (
                        <img src={truckImages[0].imageUrl} alt="Food Truck" className="food-truck-image"/>
                        ) : (
                        <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" alt="Default" className="food-truck-image"/>
                        )}
                      </div>

                </div>
        </>
    )
}



export default InfoWindowData;