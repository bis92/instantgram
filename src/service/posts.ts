import { FullPost, SimplePost } from '@/model/post';
import { client, urlFor, assetsURL } from './sanity';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
`
export async function getFollowingPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}`
  ).then(mapPosts)
}

const mapPost = (post: FullPost) => {
  return post
}

export async function getPost(id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id":_id,
      "createdAt":_createdAt
    }`
  )
  .then(post => ({ ...post, image: urlFor(post.image)}))
  // .then(mapPost);
}
export async function getPostUsername(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
      "image": photo,
      "id":_id
    }`
  ).then(post => ({ ...post, image: urlFor(post.image)}))
}
export async function getPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
  )
  .then(mapPosts)
}
export async function getLikedPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && "${username}" in likes[]->username]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
  )
  .then(mapPosts)
}
export async function getSavedPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
  )
  .then(mapPosts)
}
function mapPosts(posts: SimplePost[]){
  return posts.map((post: SimplePost) => ({ 
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image)
  }))
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({likes: []})
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference'
      }
    ])
    .commit({ autoGenerateArrayKeys: true });
}
export async function dislikePost(postId: string, userId: string) {
  return client.patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit()
}
export async function addComment(postId: string, userId: string, comment: string) {
  const newComment = {
    _type: 'comment',
    author: {
      _type: 'reference',
      _ref: userId
    },
    comment
  };
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      }
    ])
    .commit({ autoGenerateArrayKeys: true });
}
export async function createPost(userId: string, text: string, file: Blob) {
  // return fetch(assetsURL, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': file.type,
  //     authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`
  //   },
  //   body: file
  // }).then((res) => res.json())
  // .then(result => {
  //   return client.create({
  //     _type: 'post',
  //     author: { _ref: userId },
  //     photo: { asset: { _ref: result.document._id }},
  //     comments: [{
  //       comment: text,
  //       author: { _ref: userId, _type: 'reference'}
  //     }],
  //     likes: []
  //   },
  //   { autoGenerateArrayKeys: true })
  // })
  return client.assets //
    .upload('image', file)
    .then(result => {
      return client.create({
        _type: 'post',
        author: { _ref: userId },
        photo: { asset: { _ref: result._id }},
        comments: [{
          comment: text,
          author: { _ref: userId, _type: 'reference'}
        }],
        likes: []
      },
    { autoGenerateArrayKeys: true })
  })
}