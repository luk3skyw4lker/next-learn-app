/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Date from '../components/Date';
import Layout, { siteTitle } from '../components/Layout';
import { getSortedPosts } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<p>
					Hello my name is Lucas. I am 19 yo, fullstack Javascript developer and
					aiming to become a Go developer as well. Learning new techs and
					concepts everyday.
				</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href='https://nextjs.org/learn'>Next.js tutorial</a>
					.)
				</p>
			</section>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPosts();

	return {
		props: {
			allPostsData
		}
	};
};
