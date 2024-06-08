export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bookmarks: string[];
};

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[],
  followers: SimpleUser[];
}

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
}

export type ProfileUser = SearchUser & {
  posts: number;
}