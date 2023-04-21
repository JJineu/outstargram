import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANATY_PROJECT_ID,
  dataset: process.env.SANATY_DATASET,
  apiVersion: "2023-04-21",
  useCdn: false, // set to `true` to fetch from edge cache
  token: process.env.SANITY_SECRET_TOKEN,
});

// export type Post = {
//   author: string;
//   photo: string;
//   like: number;
//   comments: Comment[];
// };
// export type Comment = {
//   author: string;
//   commnet: string;
// };

// export default async function getUserPosts(): Promise<Post[]> {
//   const posts = await client.fetch('*[_type == "post"]');
//   return posts;
// }
// export async function createPost(post: Post) {
//   const result = client.create(post);
//   return result;
// }

// export async function updateDocumentTitle(_id, title) {
//   const result = client.patch(_id).set({ title });
//   return result;
// }
