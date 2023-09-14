import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [rating, setRating] = useState<number>(2); // State for rating

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here

    if (inputValue && rating) {
      const options = {
        id: id,
        data: {
          comment: inputValue,
          rating: rating,
        },
      };
      console.log(options);
    } else {
      console.log('Please add a review');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const renderStarButtons = () => {
    const maxStars = 5; // You can change this to the desired number of stars.
    const starButtons = [];

    for (let i = 1; i <= maxStars; i++) {
      starButtons.push(
        <button
          key={i}
          className={`text-2xl ${
            i <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleRatingChange(i)}
        >
          ★
        </button>
      );
    }

    return starButtons;
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleFormSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        {renderStarButtons()}
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10"></div>
    </div>
  );
}
