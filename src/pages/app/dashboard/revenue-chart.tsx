import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import colors from "tailwindcss/colors";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";

export function RevenueChart() {
  const { orders } = useOrder();
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    let data = [];
//pizzaria-dashboard.pessoa.tech/
https: for (var i = 4; i >= 0; i--) {
  var d = new Date();
  d.setDate(d.getDate() - i);
  const salesOnDay = orders.reduce((accumulator, order) => {
    return order.date.includes(d.toLocaleDateString("en-GB")) &&
      order.state == "concluded"
      ? accumulator + Number(order.cartItemsTotalPrice)
      : accumulator + 0;
  }, 0);

  data.push({
    date: d.toLocaleDateString("en-GB"),
    revenue: Number(salesOnDay.toFixed(2)),
  });
}

    setdata(data);
  }, [orders]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <Tooltip />
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              domain={[0, Math.max(data)]}
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet["500"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
