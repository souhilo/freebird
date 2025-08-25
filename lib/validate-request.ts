import { ObjectSchema } from "joi";
import { NextResponse } from "next/server";

export function validateRequest(body: any, schema: ObjectSchema) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(body, options);

  if (error) {
    return NextResponse.json(
      {
        message: "Validation error",
        errors: error?.details?.map((x) => x.message).join(", "),
      },
      { status: 400 }
    );
  }

  return value;
}

export function validateCandRequest(body: any, schema: ObjectSchema) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(body, options);

  if (error) {
    return NextResponse.json(
      {
        message: "Validation error",
        errors: error?.details?.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>),
      },
      { status: 400 }
    );
  }

  return value;
}
