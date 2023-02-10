import Error from "next/error";

export default function methodNotAllowed() {
  return <Error statusCode={405} />;
}
