import { auth } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";

async function UserInformation({ posts }: { posts: IPostDocument[] }) {
  const { userId, sessionClaims } = auth();

  const firstName = sessionClaims?.firstName as string;
  const lastName = sessionClaims?.lastName as string;
  const imageUrl = sessionClaims?.imageUrl as string;

  const userPosts = posts.filter((post) => post.user.userId === userId);

  //  The flatMap() method creates a new array by calling a function for each element in the array and then flattening the result into a new array. It is identical to a map() followed by a flat() of depth 1, but flatMap() is often quite useful, as merging both into one method is slightly more efficient. The result of this flatMap() is a new array that contains all comments made by the current user across all posts. It's "flat" because it's a single-level array, not an array of arrays.
  const userComments = posts.flatMap(
    (post) =>
      post?.comments?.filter((comment) => comment.user.userId === userId) || []
  );

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar className="h-16 w-16 mb-5">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p className="font-semibold">
          {firstName} {lastName}
        </p>

        <p className="text-xs">
          @{firstName}
          {lastName}-{userId?.slice(-4)}
        </p>
      </div>

      <hr className="w-full border-gray-200 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        <p className="text-blue-400">{userPosts.length}</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        <p className="text-blue-400">{userComments.length}</p>
      </div>
    </div>
  );
}

export default UserInformation;
