/* eslint-disable react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
	return (
		<Layout home={false}>
			{postData && (
				<>
					<Head>
						<title>{postData?.title}</title>
					</Head>

					<article>
						<h1 className={utilStyles.headingXl}>{postData.title}</h1>
						<div className={utilStyles.lightText}>
							<Date dateString={postData?.date} />
						</div>
						<div dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
					</article>
				</>
			)}
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData
		}
	};
};
