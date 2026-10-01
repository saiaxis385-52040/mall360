import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { CartItem } from './CartDrawer';
import { UserProfile, Order } from '../../types/user';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onOrderComplete: (newOrder?: Order) => void;
  user?: UserProfile;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onOrderComplete,
  user,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const defaultAddr = user?.addresses.find((a) => a.isDefault) || user?.addresses[0];

  // Form states pre-filled with user info
  const [formData, setFormData] = useState({
    name: user?.name || 'Arjun Kapoor',
    email: user?.email || 'arjun.kapoor@streetwear.io',
    phone: user?.phone || '+1 (555) 389-4921',
    address: defaultAddr?.street || '452 Broome Street, Apt 4B',
    city: defaultAddr?.city || 'New York',
    zip: defaultAddr?.pincode || '10013',
  });

  useEffect(() => {
    if (user) {
      const def = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: def?.street || '452 Broome Street, Apt 4B',
        city: def?.city || 'New York',
        zip: def?.pincode || '10013',
      });
    }
  }, [user]);

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const genNum = `M360-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(genNum);

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: genNum,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Confirmed',
        deliveryDate: 'Arriving in 2-3 Business Days (Express)',
        totalAmount: totalAmount,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit Card (Visa •••• 4242)',
        trackingNumber: `FDX-${Math.floor(10000000 + Math.random() * 90000000)}-NYC`,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          name: formData.name,
          phone: formData.phone,
          street: formData.address,
          city: formData.city,
          state: 'NY',
          pincode: formData.zip,
          type: 'HOME',
          isDefault: false,
        },
        items: items.map((it) => ({
          productId: it.product.id,
          title: it.product.title,
          image: it.product.image,
          size: it.size,
          quantity: it.quantity,
          price: it.product.price,
        })),
      };

      setIsProcessing(false);
      setStep('success');
      onOrderComplete(newOrder);
    }, 800);
  };

  const handleDone = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-xl rounded-[12px] shadow-2xl overflow-hidden border border-[#EEEEEF]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EEEEEF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg tracking-tight text-[#131814]">
              {step === 'form' ? 'Express Checkout' : 'Order Confirmed'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#EEEEEF] text-[#334155] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
            {/* Delivery address selection */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#334155] mb-3">
                1. Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Mobile Phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="mt-3">
                <Input
                  label="Street Address / Flat No."
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <Input
                  label="City"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="Zip / Postal Code"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2 border-t border-[#EEEEEF]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#334155] mb-3">
                2. Select Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-[6px] border cursor-pointer flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#008450] bg-[#F1F8FF] text-[#131814]'
                      : 'border-[#C9CBCC] bg-white text-[#334155] hover:border-[#131814]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-5 h-5 text-[#008450]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#008450]"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs">Cash on Delivery</div>
                    <div className="text-[10px] text-[#51575C]">Pay at doorstep</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-[6px] border cursor-pointer flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#008450] bg-[#F1F8FF] text-[#131814]'
                      : 'border-[#C9CBCC] bg-white text-[#334155] hover:border-[#131814]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-[#2563EB]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-[#008450]"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs">Online Card / UPI</div>
                    <div className="text-[10px] text-[#51575C]">Visa, MC, UPI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary preview */}
            <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF] flex items-center justify-between text-xs">
              <span className="text-[#51575C]">Payable Amount ({items.length} items):</span>
              <span className="font-bold text-base text-[#131814]">${totalAmount.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (${totalAmount.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-[#B0FADD] text-[#00653D] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-[#131814]">
                Thank You For Your Order!
              </h3>
              <p className="text-xs text-[#51575C] mt-1">
                Order confirmation and tracking details sent to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="p-4 bg-[#F5F5F4] rounded-[8px] border border-[#EEEEEF] text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#51575C]">Order Reference:</span>
                <span className="font-mono font-bold text-[#131814]">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#51575C]">Total Paid:</span>
                <span className="font-bold text-[#131814]">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#51575C]">Estimated Delivery:</span>
                <span className="font-bold text-[#008450]">2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#51575C]">Live Tracking:</span>
                <span className="text-[#008450] font-bold">Visible in Your Account</span>
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full" onClick={handleDone}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
