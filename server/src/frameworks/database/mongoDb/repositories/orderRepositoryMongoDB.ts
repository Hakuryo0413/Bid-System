import { OrderEntity } from "../../../../entities/OrderEntity";
import { orderInterface } from "../../../../types/orderInterface";
import { OrderModel } from "../models/orderModel";

export const orderRepositoryMongoDB = (model: OrderModel) => {
    const orderEntity = new OrderEntity(model);
    const createOrder = async (order: orderInterface) => {
        const newOrder = await orderEntity.createOrder(order);
        return newOrder;
    }
    const deleteOrder = async (orderId: string) => {
        await orderEntity.deleteOrder(orderId);
    }
    const getOrderByCode = async (code: string) => {
        const order = await orderEntity.getOrderByCode(code);
        return order;
    }
    const getOrderByConsolidationID = async (id: string) => {
        const orders = await orderEntity.getOrderByConsolidationID(id);
        return orders;
    }
    const getOrderByTransationID = async (id: string) => {
        const orders = await orderEntity.getOrderByTransactionID(id);
        return orders;
    }
    const getOrderByDeliveryPersonID = async (id: string) => {
        const orders = await orderEntity.getOrderByDeliveryPersonID(id);
        return orders;
    }
    const getAllOrders = async () => {
        const orders = await orderEntity.getAllOrders();
        return orders;
    }
    const filterOrder = async (create_at: Date, sended_at: Date, transactionID: string, consolidationID: string) => {
        const orders = await orderEntity.filterOrder(create_at, sended_at, transactionID, consolidationID);
        return orders;
    }
    const updateOrderStatus = async (id: string, order: Partial<orderInterface>) => {
        const updatedOrder: any = orderEntity.updateOrderStatus(id, order);
        return updatedOrder;
    }

    return {
        createOrder,
        deleteOrder,
        getOrderByCode,
        getOrderByTransationID,
        getOrderByConsolidationID,
        getOrderByDeliveryPersonID,
        getAllOrders,
        filterOrder,
        updateOrderStatus
    }
}

export type orderRepositoryMongoDB = typeof orderRepositoryMongoDB;