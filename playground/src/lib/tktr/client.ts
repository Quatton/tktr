import { createTKTRClient } from "@tktr/client";
import { items, store } from "./tktr";

export const tc = createTKTRClient({
  items,
  store,
})