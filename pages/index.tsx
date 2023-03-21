import { useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { createUrqlClient } from "utils/createUrqlClient";
import { POSTS_QUERY } from "graphql/queries/posts";
import Layout from "components/Layout";

const Index = () => {
  const [{ data, fetching }] = useQuery({
    query: POSTS_QUERY,
    variables: {
      limit: 5
    }
  });

  return (
    <Layout>
      <Link
        href={"/create-post"}
        style={{ color: "#08b", textDecoration: "underline" }}
      >
        create post
      </Link>
      <br />
      {!data && fetching ? (
        <p>
          <i>Loading...</i>
        </p>
      ) : data ? (
        data.posts.map((p: any) => (
          <div key={p.id}>
            {p.title} - <span>{p.text}</span>
          </div>
        ))
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  neverSuspend: true
})(Index);
