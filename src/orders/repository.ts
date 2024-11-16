import { eq, sql } from "drizzle-orm";
import {
  categories,
  db,
  discounts,
  guests,
  orderItems,
  orders,
  products,
  users,
  usersAddresses,
} from "../db";

type Order = {
  userId: string | null;
  addressId: string | null;
  guestId: string | null;
  totalAmount: string;
  status: "PROCESANDO" | "COMPLETADO" | "ENTEGADO" | "RECIBIDO";
};

export class OrdersRepository {
  static async createOrder(order: Order) {
    return await db
      .insert(orders)
      .values({ ...order })
      .returning();
  }

  static async getOrders() {
    // Paso 1: Obtener los datos básicos del pedido
    const ordersResult = await db
      .select({
        orderId: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
        userName: sql`
        CASE 
          WHEN ${orders.userId} IS NOT NULL THEN ${users.firstname} || ' ' || ${users.lastname}
          WHEN ${orders.guestId} IS NOT NULL THEN ${guests.firstname} || ' ' || ${guests.lastname}
          ELSE 'Desconocido'
        END AS order_by
      `,
      })
      .from(orders)
      .leftJoin(users, sql`${orders.userId} = ${users.id}`)
      .leftJoin(guests, sql`${orders.guestId} = ${guests.id}`)
      .orderBy(orders.createdAt);

    // Paso 2: Obtener los productos de cada pedido
    const orderItemsResult = await db
      .select({
        orderId: orderItems.orderId,
        productId: products.id,
        productName: products.name,
        productPrice: products.price,
        discountPercentage: discounts.percentage,
        quantity: orderItems.quantity,
      })
      .from(orderItems)
      .leftJoin(products, sql`${orderItems.productId} = ${products.id}`)
      .leftJoin(discounts, sql`${products.discountId} = ${discounts.id}`);

    // Paso 3: Agrupar productos por pedido
    const ordersMap = new Map();

    ordersResult.forEach((order) => {
      ordersMap.set(order.orderId, {
        id: order.orderId,
        status: order.status,
        total: order.totalAmount,
        createdAt: order.createdAt,
        user: order.userName,
        products: [],
      });
    });

    // Asociamos los productos a cada pedido en el Map
    orderItemsResult.forEach((item) => {
      const order = ordersMap.get(item.orderId);
      if (order) {
        order.products.push({
          id: item.productId,
          name: item.productName,
          price: item.productPrice,
          discount: item.discountPercentage,
          quantity: item.quantity,
        });
      }
    });

    // Convertimos el Map en un array de resultados
    const orderss = Array.from(ordersMap.values());
    return orderss;
  }

  static async getOrdersByUserId(userId: string) {
    const result = await db
      .select({
        orderId: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        productCount: sql`COUNT(${orderItems.id}) AS product_count`,
        createdAt: orders.createdAt,
        userName: sql`
        CASE 
          WHEN ${orders.userId} IS NOT NULL THEN ${users.firstname} || ' ' || ${users.lastname}
          WHEN ${orders.guestId} IS NOT NULL THEN ${guests.firstname} || ' ' || ${guests.lastname}
          ELSE 'Desconocido'
        END AS order_by
      `,
      })
      .from(orders)
      .leftJoin(orderItems, sql`${orders.id} = ${orderItems.orderId}`)
      .leftJoin(users, sql`${orders.userId} = ${users.id}`)
      .leftJoin(guests, sql`${orders.guestId} = ${guests.id}`)
      .where(eq(users.id, userId)) // Aquí se filtra por el userId
      .groupBy(
        orders.id,
        users.firstname,
        users.lastname,
        guests.firstname,
        guests.lastname,
      )
      .orderBy(orders.createdAt);

    return result.map((order) => ({
      id: order.orderId,
      status: order.status,
      total: order.totalAmount,
      productCount: order.productCount,
      createdAt: order.createdAt,
      user: order.userName,
    }));
  }

  static async getOrderDetails(orderId: string) {
    const orderDetails = await db
      .select({
        orderId: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,

        // Detalles del usuario
        userFirstName: users.firstname,
        userLastName: users.lastname,
        userEmail: users.email,
        userPhone: users.phone,

        // Detalles del invitado
        guestFirstName: guests.firstname,
        guestLastName: guests.lastname,
        guestEmail: guests.email,
        guestPhone: guests.phone,
        guestAddress: guests.address,

        // Dirección del usuario
        addressLine1: !usersAddresses.addressLine1
          ? guests.address
          : usersAddresses.addressLine1,
        addressLine2: usersAddresses.addressLine2,
        city: usersAddresses.city,
        country: usersAddresses.country,

        // Productos de la orden
        productId: products.id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        productPrice: products.price,
        discountPercentage: discounts.percentage,
        quantity: orderItems.quantity,

        // Categoría del producto
        categoryName: categories.name,
      })
      .from(orders)
      .leftJoin(users, sql`${orders.userId} = ${users.id}`)
      .leftJoin(guests, sql`${orders.guestId} = ${guests.id}`)
      .leftJoin(usersAddresses, sql`${orders.addressId} = ${usersAddresses.id}`)
      .leftJoin(orderItems, sql`${orders.id} = ${orderItems.orderId}`)
      .leftJoin(products, sql`${orderItems.productId} = ${products.id}`)
      .leftJoin(discounts, sql`${products.discountId} = ${discounts.id}`)
      .leftJoin(categories, sql`${products.categoryId} = ${categories.id}`)
      .where(sql`${orders.id} = ${orderId}`);

    const orderData = {
      orderId: orderDetails[0]?.orderId,
      status: orderDetails[0]?.status,
      totalAmount: orderDetails[0]?.totalAmount,
      createdAt: orderDetails[0]?.createdAt,
      user: orderDetails[0].userFirstName
        ? {
            firstName: orderDetails[0]?.userFirstName,
            lastName: orderDetails[0]?.userLastName,
            email: orderDetails[0]?.userEmail,
            phone: orderDetails[0]?.userPhone,
          }
        : null,
      guest: orderDetails[0].guestFirstName
        ? {
            firstName: orderDetails[0]?.guestFirstName,
            lastName: orderDetails[0]?.guestLastName,
            email: orderDetails[0]?.guestEmail,
            phone: orderDetails[0]?.guestPhone,
          }
        : null,
      address: {
        line1: orderDetails[0]?.addressLine1 || orderDetails[0]?.guestAddress,
        line2: orderDetails[0]?.addressLine2,
        city: orderDetails[0]?.city,
        country: orderDetails[0]?.country,
      },
      products: orderDetails.map((item) => ({
        id: item.productId,
        name: item.productName,
        image: item.productImage,
        description: item.productDescription,
        price: item.productPrice,
        discount: item.discountPercentage ?? 0,
        quantity: item.quantity,
        categoryName: item.categoryName,
      })),
    };

    return orderData;
  }
}
