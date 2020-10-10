import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';

interface Post {
  title: string;
  date: Date;
}

export const getPostData = async (id: string | string[]) => {
	const postsDirectory = path.join(process.cwd(), 'posts');
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data as Post
	};
};

export const getAllPostIds = () => {
	const postsDirectory = path.join(process.cwd(), 'posts');
	const fileNames = fs.readdirSync(postsDirectory);

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return fileNames.map((fileName) => ({
		params: {
			id: fileName.replace(/\.md$/, '')
		}
	}));
};

export const getSortedPosts = () => {
	const postsDirectory = path.join(process.cwd(), 'posts');
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents).data as Post;

		// Combine the data with the id
		return {
			id,
			...matterResult
		};
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		}

		return -1;
	});
};
