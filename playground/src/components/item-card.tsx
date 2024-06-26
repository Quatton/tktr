import { tc } from "@/lib/tktr/client";
import { formatAmountForDisplay, formatAmountForStripe } from "@/utils/stripe-helpers";

export function ItemCard() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold">Item Card</h2>
      <p className="text-lg">This is an item card.</p>

      <p>
        {
          formatAmountForDisplay(1000, "usd")
        }
      </p>
      <p>
        {
          formatAmountForStripe(1000, "usd")
        }
      </p>

      <form className="flex justify-between mt-4" method="get" action={tc.getPurchaseUrl("item-1")}>
        <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-800/80">
          Purchase
        </button>
      </form>
    </div>
  )
}