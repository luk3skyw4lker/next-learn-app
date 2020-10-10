import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
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
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
		</Layout>
	);
}
