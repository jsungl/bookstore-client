"use server";

import { revalidateTag } from "next/cache";

export default async function addForm(id) {
  revalidateTag(`book-${id}`);
}
