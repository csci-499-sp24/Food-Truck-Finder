import Rating from 'react-rating-stars-component';

const InfoWindowData = ({selectedTruck, truckImages}) => {
    return (
          <div className='flex w-full flex-row-reverse'>
            <div className={`pt-3 ${truckImages.length > 0 ? "" : "hidden"}`}>
                          {truckImages.length > 0 && (
                          <img src={truckImages[0].imageUrl} alt="Food Truck" className="food-truck-image"/>
                  )}
            </div>
            <div className='truncate w-full'>
                  <p className="text-2xl font-semibold pt-2 truncate h-8">
                            {selectedTruck.name}
                        </p>
                        <p className='h-3 truncate'>{selectedTruck.address}</p>
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
                        <div className="cuisines-container h-11 pt-3">
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



export default InfoWindowData;