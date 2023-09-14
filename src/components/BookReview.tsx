import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  useGetReviewsQuery,
  usePostReviewsMutation,
} from '@/redux/features/review/reviewApi';

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [postCommentMutation] = usePostReviewsMutation();
  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentData = {
      message: inputValue,
    };

    try {
      const response = await postCommentMutation({ id, data: commentData });
      setInputValue('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.data?.map((review: any) => (
          <div key={review.id} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
