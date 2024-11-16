import { STATUS_CODES } from "./../../_statusCodes";
import express from "express";
import { logger } from "../../_log.";
import { insertOrderSchema } from "../types";
import { OrdersRepository } from "../repository";
import { UserAdressesRepository } from "../../userAddresses/repository";
import { OrderItemsRepository } from "../../orderItems/repository";
import { GuestRepository } from "../../guests/repository";

export async function createOrder(req: express.Request, res: express.Response) {
  try {
    // Validar el cuerpo de la solicitud
    const { data, error, success } = insertOrderSchema.safeParse(req.body);
    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ ok: false, error });
      return;
    }

    const user = req.headers["user"] as string | undefined;
    let order;
    let addressId = null;

    // Caso 1: Usuario autenticado
    if (user) {
      const userParsed = JSON.parse(user);
      const userId = userParsed.payload.id;

      // Obtener o crear la dirección del usuario
      const [address] = await UserAdressesRepository.getUserAddress(userId);

      if (!address) {
        const [newAddress] = await UserAdressesRepository.createUserAddress({
          userId,
          addressLine1: data.address,
          city: data.city,
          country: data.country,
        });
        addressId = newAddress.id;
      } else {
        addressId = address.id;
      }

      // Crear la orden para el usuario autenticado
      [order] = await OrdersRepository.createOrder({
        addressId,
        totalAmount: data.totalAmount.toString(),
        guestId: null,
        status: "RECIVED",
        userId,
      });
    } else {
      // Caso 2: Usuario invitado (guest)
      const [guest] = await GuestRepository.createGuest({
        address: data.address,
        city: data.city,
        country: data.country,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
      });

      // Crear la orden para el invitado
      [order] = await OrdersRepository.createOrder({
        addressId: null, // Los invitados no tienen direcciones guardadas
        totalAmount: data.totalAmount.toString(),
        guestId: guest.id,
        status: "RECIVED",
        userId: null,
      });
    }

    // Crear los elementos de la orden
    const items = data.items.map((item) => ({ ...item, orderId: order.id }));
    await OrderItemsRepository.createOrderItems(items);

    // Responder con éxito
    res.status(STATUS_CODES.OK).json({
      ok: true,
      message: "Order created",
      order,
      items,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
