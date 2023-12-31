"use client";

import Error from "next/error";
import { CONFIG } from "@/const/config";

export default function TooManyRequest() {
  return (
    <Error
      statusCode={429}
      title={`Too many requests. Try again after ${
        CONFIG.requestLimit.expired / 1000
      }
    seconds`}
    ></Error>
  );
}
