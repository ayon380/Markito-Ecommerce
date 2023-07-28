import React, { useState } from "react";
import StarRating from "./StarRating";

const AddReviewForm = ({ onAddReview, rating, onRatingChange }) => {
  const [reviewContent, setReviewContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the review content is not empty and the rating is greater than 0
    if (reviewContent.trim() !== "" && rating > 0) {
      // Construct the new review object
      const newReview = {
        content: reviewContent,
        stars: rating,
        // Add any other properties you need for a review, e.g., user information, etc.
      };

      // Call the onAddReview function passed from the parent component
      onAddReview(newReview);

      // Clear the form fields after adding the review
      setReviewContent("");
      onRatingChange(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="reviewContent" className="block text-gray-700 font-bold">
          Your Review
        </label>
        <textarea
          id="reviewContent"
          className="form-textarea mt-1 block w-full border rounded-lg bg-gray-100"
          rows="4"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="Write your review here..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Rating</label>
        <StarRating rating={rating} onRatingChange={onRatingChange} />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
