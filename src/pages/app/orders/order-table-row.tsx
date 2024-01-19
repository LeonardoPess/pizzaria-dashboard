import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { formatMoney } from "@/utils/formatMoney";
import { Customer, Product, States } from "@/contexts/OrderContext";
import { useOrder } from "@/hooks/useOrder";
import { useState } from "react";

interface OrderTableRowProps {
  id: number;
  date: string;
  orderNumber: number;
  customer: Customer;
  products: Product[];
  cartItemsTotalPrice: string;
  state: States;
}

export function OrderTableRow({
  id,
  date,
  orderNumber,
  customer,
  products,
  cartItemsTotalPrice,
  state,
}: OrderTableRowProps) {
  const { updateOrderState } = useOrder();
  const [currentState, setCurrentState] = useState(state);

  function handleUpdateOrderState(newState: States) {
    if (currentState == newState) return;
    updateOrderState(newState, id);
    setCurrentState(newState);
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails
            date={date}
            orderNumber={orderNumber}
            customer={customer}
            products={products}
            cartItemsTotalPrice={cartItemsTotalPrice}
            state={currentState}
          />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {orderNumber}
      </TableCell>
      <TableCell className="text-muted-foreground">{date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {currentState == "pending" && (
            <>
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="font-medium text-muted-foreground">
                Pendente
              </span>
            </>
          )}

          {currentState == "concluded" && (
            <>
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium text-muted-foreground">
                Concluído
              </span>
            </>
          )}

          {currentState == "canceled" && (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="font-medium text-muted-foreground">
                Cancelado
              </span>
            </>
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium">{customer.name}</TableCell>
      <TableCell className="font-medium">
        R$ {formatMoney(Number(cartItemsTotalPrice))}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            handleUpdateOrderState("concluded");
          }}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Concluir
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            handleUpdateOrderState("canceled");
          }}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
