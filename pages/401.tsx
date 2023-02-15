import Error from "next/error";

export default function unauthorized() {
  return <Error statusCode={401} title="unauthorized" />;
}
