import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderType } from "@/contexts/OrderContext";
import { useOrder } from "@/hooks/useOrder";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmountCard() {
  const { getOrderByState } = useOrder();
  const ordersCanceled = getOrderByState("canceled").filter((order: OrderType) => {
    const dateToSearch = new Date().toLocaleDateString("en-GB").slice(2); // MM/YYYY
    return order.date.includes(dateToSearch);
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {ordersCanceled.length}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-2%</span> em
          relação ao mês passado
        </p> */}
      </CardContent>
    </Card>
  );
}
