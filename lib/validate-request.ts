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
