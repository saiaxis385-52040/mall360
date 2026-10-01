export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  deliveryDate: string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber: string;
  invoiceUrl?: string;
}

export interface ReferralRecord {
  id: string;
  friendName: string;
  date: string;
  rewardCoins: number;
  cashBonus: number;
  status: 'Rewarded' | 'Joined · First Order Pending';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  avatar: string;
  membershipTier: 'Mall360 Plus Member' | 'Prime VIP' | 'Standard';
  superCoins: number;
  walletBalance: number;
  joinedDate: string;
  addresses: Address[];
  orders: Order[];
  savedPaymentMethods: {
    id: string;
    type: 'CARD' | 'UPI';
    title: string;
    details: string;
    isDefault: boolean;
  }[];
  referralCode: string;
  referralCount: number;
  referralEarnings: number;
  referralHistory: ReferralRecord[];
}
