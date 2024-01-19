import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderType } from "@/contexts/OrderContext";
import { useOrder } from "@/hooks/useOrder";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
  const { getOrderByState } = useOrder();
  const dayOrders = getOrderByState("concluded").filter((order: OrderType) => {
    const dateToSearch = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY
    return order.date.includes(dateToSearch);
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos concluídos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {dayOrders.length}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">-4%</span> em
          relação a ontem
        </p> */}
      </CardContent>
    </Card>
  );
}
