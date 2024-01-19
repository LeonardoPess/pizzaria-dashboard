import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export type States = "pending" | "concluded" | "canceled";

export interface Customer {
  complement: string;
  deliveryMethod: string;
  deliveryPrice: string;
  district: string;
  name: string;
  number: string;
  observation: string;
  paymentMethod: string;
  phone: string;
  street: string;
}

export interface Product {
  description: string;
  id: number;
  img: string;
  name: string;
  price: string;
  quantity: number;
  tags: string;
}

export interface OrderType {
  id: number;
  date: string;
  orderNumber: number;
  customer: string;
  products: string;
  cartItemsTotalPrice: string;
  state: States;
}

interface OrderContextType {
  orders: OrderType[];
  fetchOrders: () => void;
  getOrderByState: (state: States) => OrderType[];
  updateOrderState: (state: States, id: number) => void;
}

interface OrderContextProviderProps {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderContextProvider({ children }: OrderContextProviderProps) {
  const [orders, setOrders] = useState<OrderType[]>([]);

  function getOrderByState(state: States) {
    return orders.filter((order) => order.state == state);
  }

  function fetchOrders() {
    axios
      .get("https://pizzaria-back.pessoa.tech/api-get-orders")
      .then(function ({ data }) {
        setOrders(data);
      });
  }

  function updateOrderState(state: States, id: number) {
    axios
      .post("https://pizzaria-back.pessoa.tech/api-edit-order-state", {
        state,
        id,
      })
      .then(() => fetchOrders())
      .then((error) => console.log(error, "error"));
  }

  useEffect(() => {
    fetchOrders();

    setInterval(() => {
      fetchOrders();
    }, 60 * 1000)
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        getOrderByState,
        updateOrderState,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
