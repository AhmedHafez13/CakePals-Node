import { Response } from 'express';
import { Types } from 'mongoose';
import { Nullable } from '../../types/generic.type';
import { AppRequest, DateRange } from '../../types/general.types';
import { ProductDocument } from '../product/product.model';
import { ProfileDocument } from '../profile/profile.model';
import { OrderDocument } from './order.model';
import { UserDocument } from '../user/user.model';
import { UserRole } from '../profile/profile.enums';
import {
  BakerProfileAttributes,
  CollectionTimeRange,
} from '../profile/profile.types';
import {
  NotFoundError,
  UnprocessableError,
  ForbiddenError,
  BadRequestError,
} from '../../error-handler/error.handlers';
import productProvider from '../product/product.provider';
import OrderProvider from './order.provider';
import OrderValidation from './order.validation';
import OrderService from './order.service';

class OrderController {
  placeOrder = async (req: AppRequest, res: Response) => {
    const data = this.validateOrderData(req.body);
    const product = await this.findProduct(data.product);

    const baker = product.baker as BakerProfileAttributes;
    const { user, memberProfile } = this.getUserAndProfile(req);

    this.checkIfProductBelongsToUser(baker, user);

    // Calculate the Ideal Prep Start Time and End Time
    const orderTimeRange = OrderService.calculateOrderTimeRange(
      product.prepTime,
      new Date(data.collectionTime)
    );

    this.checkPrepTimeRange(baker.collectionTimeRange, orderTimeRange);
    await this.checkOrderTimeOverlap(product.id, orderTimeRange);

    const order = await OrderProvider.createOrder({
      product: product.id,
      member: memberProfile.id,
      paymentMethod: data.paymentMethod,
      collectionTime: { ideal: data.collectionTime },
      prepTime: { ideal: orderTimeRange },
    });

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order });
  };

  editOrder = async (req: AppRequest, res: Response) => {
    const result = OrderValidation.validateOrderEdit({
      orderId: req.params.orderId,
      paymentMethod: req.body.paymentMethod,
      collectionTime: req.body.collectionTime,
    });

    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }

    const data = result.value;
    const order: Nullable<OrderDocument> = await OrderProvider.findOrderById(
      data.orderId
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updatedOrder = await OrderProvider.updateOrder(data.orderId, {
      paymentMethod: data.paymentMethod,
      collectionTime: data.collectionTime,
    });

    return res
      .status(200)
      .json({ error: 'Order updated successfully', order: updatedOrder });
  };

  /**
   * Validates the order data received from the request body.
   * @param body - The request body containing order data.
   * @returns The validated order data.
   * @throws {BadRequestError} If the input data is invalid.
   */
  private validateOrderData(body: any) {
    // Validate the Input Data
    const result = OrderValidation.validateOrderInput({
      product: body.product,
      paymentMethod: body.paymentMethod,
      collectionTime: body.collectionTime,
    });

    if (result.error) {
      throw new BadRequestError(result.error.details[0].message);
    }

    return result.value;
  }

  /**
   * Finds a product by its ID.
   * @param productId - The ID of the product to find.
   * @returns The found product.
   * @throws {NotFoundError} If the product is not found.
   */
  private async findProduct(productId: string) {
    // Check if the Product Exists
    const product: Nullable<ProductDocument> =
      await productProvider.findProductById(productId, true);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  /**
   * Retrieves the user and member profile from the request.
   * @param req - The incoming request object.
   * @returns An object containing the user and member profile.
   */
  private getUserAndProfile(req: AppRequest): {
    user: UserDocument;
    memberProfile: ProfileDocument;
  } {
    const user = req.userData as UserDocument;
    const profiles = req.profiles as ProfileDocument[];
    const memberProfile = profiles.find(
      (profile) => profile.role === UserRole.Member
    ) as ProfileDocument;
    return { user, memberProfile };
  }

  /**
   * Checks if the product belongs to the user trying to place the order.
   * @param baker - The baker profile associated with the product.
   * @param user - The user attempting to place the order.
   * @throws {ForbiddenError} If the user is attempting to order their own product.
   */
  private checkIfProductBelongsToUser(
    baker: BakerProfileAttributes,
    user: UserDocument
  ) {
    // Check if the User is Ordering Their Own Product
    if (baker.user.toString() === user.id.toString()) {
      throw new ForbiddenError('You cannot order your own product');
    }
  }

  /**
   * Checks if the preparation time range falls within the baker's collection hours.
   * @param collectionTimeRange - The baker's collection time range.
   * @param orderTimeRange - The preparation time range for the order.
   * @throws {UnprocessableError} If the chosen preparation time is outside the baker's working hours.
   */
  private checkPrepTimeRange(
    collectionTimeRange: CollectionTimeRange,
    orderTimeRange: DateRange
  ) {
    // Check if the Start and End are in the Baker's Collection Range
    const isInCollectionRange = OrderService.isPrepTimeInCollectionRange(
      collectionTimeRange,
      orderTimeRange
    );
    if (!isInCollectionRange) {
      throw new UnprocessableError(
        "The chosen preparation time is outside the baker's working hours"
      );
    }
  }

  /**
   * Checks if the order's preparation time overlaps with existing orders for the same product.
   * @param productId - The ID of the product being ordered.
   * @param orderTimeRange - The preparation time range for the order.
   * @throws {UnprocessableError} If the selected collection time overlaps with an existing order.
   */
  private async checkOrderTimeOverlap(
    productId: Types.ObjectId,
    ordealPrepTime: DateRange
  ) {
    // Check the Intersection of New Order Prep Time with Other Products
    const hasOrderTimeOverlap = await OrderProvider.hasOrderTimeOverlap(
      productId,
      ordealPrepTime
    );
    if (hasOrderTimeOverlap) {
      throw new UnprocessableError(
        'Selected collection time overlaps with an existing order'
      );
    }
  }
}

export default new OrderController();
