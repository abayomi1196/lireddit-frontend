import { useQuery } from "urql";
import { withUrqlClient } from "next-urql";

import { createUrqlClient } from "utils/createUrqlClient";
import { POSTS_QUERY } from "graphql/queries/posts";
import { NavBar } from "components/NavBar";

const Index = () => {
  const [{ data, fetching }] = useQuery({ query: POSTS_QUERY });

  return (
    <>
      <NavBar />
      <div>Hello world. Yanne!!</div>
      <br />
      {!data && fetching ? (
        <p>
          <i>Loading...</i>
        </p>
      ) : data ? (
        data.posts.map((p: any) => <div key={p.id}>{p.title}</div>)
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true
})(Index);
