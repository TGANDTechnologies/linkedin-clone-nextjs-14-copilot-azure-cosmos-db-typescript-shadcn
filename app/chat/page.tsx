import React from 'react';
import Widget from "@/components/Widget";
import UserInformation from '@/components/UserInformation';
import { SignedIn } from '@clerk/nextjs';
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import AiChatbot from '@/components/AIChatbot';


export default async function ChatPage() {
    await connectDB();
    const posts = await Post.getAllPosts();

    return (
        <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation posts={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
         <AiChatbot />
        </SignedIn>
       
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
    );
};

