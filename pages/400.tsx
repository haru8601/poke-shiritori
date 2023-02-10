import Error from "next/error";

export default function badRequest() {
  return <Error statusCode={400} />;
}
