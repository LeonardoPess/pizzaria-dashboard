import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer, Product, States } from "@/contexts/OrderContext";
import { formatMoney } from "@/utils/formatMoney";

interface OrderDetailsProps {
  date: string;
  orderNumber: number;
  customer: Customer;
  products: Product[];
  cartItemsTotalPrice: string;
  state: States;
}

export function OrderDetails({
  date,
  orderNumber,
  customer,
  products,
  cartItemsTotalPrice,
  state,
}: OrderDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderNumber}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  {state == "pending" && (
                    <>
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <span className="font-medium text-muted-foreground">
                        Pendente
                      </span>
                    </>
                  )}

                  {state == "concluded" && (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="font-medium text-muted-foreground">
                        Concluído
                      </span>
                    </>
                  )}

                  {state == "canceled" && (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="font-medium text-muted-foreground">
                        Cancelado
                      </span>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {customer.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {customer.phone}
              </TableCell>
            </TableRow>

            {/* <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                leonardopessoa799@gmail.com
              </TableCell>
            </TableRow> */}

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado em
              </TableCell>
              <TableCell className="flex justify-end">{date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableHead className="text-right">{product.quantity}</TableHead>
                <TableHead className="text-right">
                  R$ {formatMoney(Number(product.price))}
                </TableHead>
                <TableHead className="text-right">
                  R$ {formatMoney(Number(product.price) * product.quantity)}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableHead className="text-right font-medium">
                R$ {formatMoney(Number(cartItemsTotalPrice))}
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
