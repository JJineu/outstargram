import { client } from './sanity';

// export async function getLoomByUsername(username: string) {
//   return client
//     .fetch(
//       `*[_type == "user" && username == "${username}"]
//       | order(_createdAt desc)
//       {
//         ...,
//         "id":_id,
//         "following": count(following),
//         "followers": count(followers),
//         "posts": count(*[_type == "post" && author->username == "${username}"])
//       }`
//     )
//     .then((user: ProfileUser) => ({
//       ...user,
//       following: user.following ?? 0,
//       followers: user.followers ?? 0,
//       posts: user.posts ?? 0,
//     }));
// }
