import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderType } from "@/contexts/OrderContext";
import { useOrder } from "@/hooks/useOrder";
import { formatMoney } from "@/utils/formatMoney";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
  const { getOrderByState } = useOrder();
  const monthOrdersConcluded = getOrderByState("concluded").filter(
    (order: OrderType) => {
      const dateToSearch = new Date().toLocaleDateString("en-GB").slice(2); // MM/YYYY
      return order.date.includes(dateToSearch);
    },
  );

  const monthRevenueOrders = monthOrdersConcluded.reduce(
    (accumulator, order) => accumulator + Number(order.cartItemsTotalPrice),
    0,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          R$ {formatMoney(monthRevenueOrders)}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em
          relação ao mês passado
        </p> */}
      </CardContent>
    </Card>
  );
}
