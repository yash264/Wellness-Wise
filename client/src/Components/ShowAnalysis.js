
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
    const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    return (
        <>
            {currentItems && 
                currentItems.map((entry) => (
                    <div key={entry._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <p><strong>Date:</strong> {formatDate(entry.date)}</p>

                        <p><strong>Activity Analysis:</strong> {entry.activity_analysis}</p>

                        {entry.mood_analysis.length > 0 && (
                            <div>
                                <strong>Mood Analysis:</strong>
                                <ul>
                                    {entry.mood_analysis.map((mood, index) => (
                                        <li key={index}>{mood}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {entry.sleep_analysis.length > 0 && (
                            <div>
                                <strong>Sleep Analysis:</strong>
                                <ul>
                                    {entry.sleep_analysis.map((sleep, index) => (
                                        <li key={index}>{sleep}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {entry.meal_recommendation.length > 0 ? (
                            <div>
                                <strong>Meal Recommendations:</strong>
                                <ul>
                                    {entry.meal_recommendation.map((meal, index) => (
                                        <li key={index}>{meal.meal} ({meal.calories} calories, {meal.protein}g protein)</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No meal recommendations available.</p>
                        )}

                        <p><strong>Last Updated:</strong> {formatDate(entry.updatedAt)}</p>
                    </div>
                ))}
        </>
    );
}


function ShowAnalysis({data}) {
    const itemsPerPage=3;
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className='container w-100' >
                <h2 className='text-center mt-2 text-dark fw-bold'>Activity Log</h2>
                <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination" // Main container styling
                previousClassName="pagination-prev" // Custom class for previous button
                nextClassName="pagination-next" // Custom class for next button
                activeClassName="active" // Class for active page
            />
            </div>
        </>
    )
}


export default ShowAnalysis;
