export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string[]; // array of paragraphs rendered in order
}

export const blogPosts: BlogPost[] = [
  // Add your blog posts here. Example:
  // {
  //   slug: "my-first-post",
  //   title: "My First Post",
  //   date: "2026-03-02",
  //   excerpt: "A short description shown on the blog listing.",
  //   tags: ["ml", "thoughts"],
  //   readingTime: "3 min read",
  //   content: [
  //     "First paragraph of your post...",
  //     "Second paragraph...",
  //   ],
  // },
];
