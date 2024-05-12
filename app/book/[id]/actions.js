"use server";

import { revalidateTag } from "next/cache";

export default async function editForm(id) {
  revalidateTag(`book-${id}`);
}
