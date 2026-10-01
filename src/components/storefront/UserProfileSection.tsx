import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  Coins,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Download,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Gift,
  Bell,
  Check,
  Copy,
  Users,
  Clock,
} from 'lucide-react';
import { UserProfile, Order, Address } from '../../types/user';
import { Button } from '../ui/Button';
import { ReferAndEarnSection } from './ReferAndEarnSection';

interface UserProfileSectionProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onBackToStorefront: () => void;
  onRepeatOrder?: (order: Order) => void;
  onShowToast: (msg: string) => void;
}

type SectionTab = 'orders' | 'vip' | 'addresses' | 'wallet' | 'refer' | 'payments' | 'settings';

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onUpdateUser,
  onBackToStorefront,
  onRepeatOrder,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<SectionTab>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
  });

  // Address add/edit state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    name: user.name,
    phone: user.phone,
    street: '',
    city: '',
    state: '',
    pincode: '',
    type: 'HOME',
    isDefault: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      ...profileForm,
    });
    setIsEditingProfile(false);
    onShowToast('Profile details updated successfully!');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.pincode) return;

    if (editingAddressId) {
      const updated = user.addresses.map((a) =>
        a.id === editingAddressId
          ? { ...addressForm, id: a.id }
          : addressForm.isDefault
          ? { ...a, isDefault: false }
          : a
      );
      onUpdateUser({ ...user, addresses: updated });
      onShowToast('Address updated.');
    } else {
      const newAddress: Address = {
        ...addressForm,
        id: `addr-${Date.now()}`,
      };
      const updated = addressForm.isDefault
        ? [...user.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
        : [...user.addresses, newAddress];
      onUpdateUser({ ...user, addresses: updated });
      onShowToast('New address added to Address Book.');
    }

    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = user.addresses.filter((a) => a.id !== id);
    onUpdateUser({ ...user, addresses: updated });
    onShowToast('Address removed.');
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    onUpdateUser({ ...user, addresses: updated });
    onShowToast('Default delivery address updated.');
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-[85vh] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Back to Drops */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToStorefront}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#131814] hover:text-[#008450] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Drops</span>
          </button>

          <span className="text-xs text-[#51575C] font-mono">
            Account ID: <strong className="text-[#131814]">{user.id}</strong>
          </span>
        </div>

        {/* Amazon & Flipkart Master Profile Hub Bar */}
        <div className="bg-white rounded-[10px] border border-[#EEEEEF] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#008450] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display font-black text-xl sm:text-2xl text-[#131814]">
                  {user.name}
                </h1>
                <span className="bg-[#B0FADD] text-[#00653D] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-[4px] tracking-wider">
                  {user.membershipTier}
                </span>
              </div>
              <p className="text-xs text-[#51575C]">
                {user.email} · {user.phone}
              </p>
              <span className="text-[11px] text-[#74797D] font-mono mt-0.5 block">
                {user.joinedDate}
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar (Flipkart SuperCoins & Amazon Pay Wallet) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#EEEEEF]">
            <div
              onClick={() => setActiveTab('wallet')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E]">
                <Coins className="w-4 h-4 text-[#D97706]" />
                <span>SuperCoins</span>
              </div>
              <div className="font-display font-black text-2xl text-[#78350F]">
                {user.superCoins}
              </div>
              <span className="text-[10px] text-[#92400E]">Worth ${(user.superCoins * 0.02).toFixed(2)}</span>
            </div>

            <div className="h-10 w-px bg-[#EEEEEF] hidden sm:block" />

            <div
              onClick={() => setActiveTab('wallet')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                <CreditCard className="w-4 h-4 text-[#2563EB]" />
                <span>Mall360 Pay</span>
              </div>
              <div className="font-display font-black text-2xl text-[#1E3A8A]">
                ${user.walletBalance.toFixed(2)}
              </div>
              <span className="text-[10px] text-[#2563EB]">1-Click Checkout</span>
            </div>

            <div className="h-10 w-px bg-[#EEEEEF] hidden sm:block" />

            <div
              onClick={() => setActiveTab('orders')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#131814]">
                <Package className="w-4 h-4 text-[#008450]" />
                <span>Total Orders</span>
              </div>
              <div className="font-display font-black text-2xl text-[#131814]">
                {user.orders.length}
              </div>
              <span className="text-[10px] text-[#008450]">Active Purchases</span>
            </div>
          </div>
        </div>

        {/* Amazon & Flipkart Category Navigation Strip */}
        <div className="border-b border-[#C9CBCC] flex items-center gap-2 overflow-x-auto pb-px">
          {[
            { id: 'orders', label: 'My Orders', icon: Package, badge: user.orders.length },
            { id: 'vip', label: 'Plus VIP Benefits', icon: Sparkles },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: user.addresses.length },
            { id: 'wallet', label: 'SuperCoins & Wallet', icon: Coins },
            { id: 'refer', label: 'Refer & Earn ($10)', icon: Users },
            { id: 'payments', label: 'Payment Modes', icon: CreditCard },
            { id: 'settings', label: 'Personal Information', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as SectionTab);
                  setSelectedOrder(null);
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#008450] text-[#008450] bg-white rounded-t-[6px]'
                    : 'border-transparent text-[#51575C] hover:text-[#131814] hover:border-[#C9CBCC]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#008450] text-white' : 'bg-[#EEEEEF] text-[#51575C]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MY ORDERS & TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {selectedOrder ? (
              /* Single Order View with Detailed Tracker */
              <div className="bg-white rounded-[10px] border border-[#EEEEEF] p-6 space-y-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="text-xs font-bold text-[#008450] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  ← Back to All Orders
                </button>

                <div className="p-5 bg-[#F5F5F4] rounded-[8px] border border-[#EEEEEF]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#51575C] block">
                        Live Tracking ID: {selectedOrder.trackingNumber}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-[#131814]">
                        {selectedOrder.status} · {selectedOrder.deliveryDate}
                      </h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedOrder.status === 'Delivered'
                          ? 'bg-[#B0FADD] text-[#00653D]'
                          : 'bg-[#BFDBFE] text-[#1E3A8A]'
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* 4-Step Tracker Progress */}
                  <div className="relative pt-2 pb-1">
                    <div className="flex items-center justify-between relative z-10 text-xs font-bold">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-[#008450] text-white flex items-center justify-center">
                          ✓
                        </div>
                        <span className="text-[#008450] mt-1.5">Confirmed</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-[#008450] text-white flex items-center justify-center">
                          ✓
                        </div>
                        <span className="text-[#008450] mt-1.5">Shipped</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            selectedOrder.status === 'Out for Delivery' || selectedOrder.status === 'Delivered'
                              ? 'bg-[#008450] text-white'
                              : 'bg-[#C9CBCC] text-white'
                          }`}
                        >
                          {selectedOrder.status === 'Out for Delivery' ? '●' : '✓'}
                        </div>
                        <span className="text-[#131814] mt-1.5">Out for Delivery</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            selectedOrder.status === 'Delivered'
                              ? 'bg-[#008450] text-white'
                              : 'bg-[#C9CBCC] text-white'
                          }`}
                        >
                          {selectedOrder.status === 'Delivered' ? '✓' : '4'}
                        </div>
                        <span
                          className={
                            selectedOrder.status === 'Delivered' ? 'text-[#008450] mt-1.5' : 'text-[#74797D] mt-1.5'
                          }
                        >
                          Delivered
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-5 left-4 right-4 h-0.5 bg-[#C9CBCC] -z-0">
                      <div
                        className="h-full bg-[#008450] transition-all duration-300"
                        style={{
                          width:
                            selectedOrder.status === 'Delivered'
                              ? '100%'
                              : selectedOrder.status === 'Out for Delivery'
                              ? '75%'
                              : '40%',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#131814]">
                    Items in Order ({selectedOrder.items.length})
                  </h4>
                  {selectedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[8px] border border-[#EEEEEF] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-16 h-16 object-cover rounded-[6px] border border-[#EEEEEF]"
                        />
                        <div>
                          <h5 className="font-display font-bold text-sm text-[#131814]">
                            {it.title}
                          </h5>
                          <p className="text-xs text-[#51575C] mt-0.5">
                            Size: <strong>{it.size}</strong> · Quantity: <strong>{it.quantity}</strong>
                          </p>
                          <span className="font-bold text-xs text-[#131814] block mt-1">
                            ${(it.price * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onRepeatOrder?.(selectedOrder);
                          onShowToast('Items added back to your Bag!');
                        }}
                      >
                        Buy It Again
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EEEEEF] flex items-center justify-between text-xs text-[#51575C]">
                  <span>Total Paid: <strong className="text-[#131814]">${selectedOrder.totalAmount.toFixed(2)}</strong> via {selectedOrder.paymentMethod}</span>
                  <button
                    type="button"
                    onClick={() => onShowToast('Tax invoice PDF downloaded.')}
                    className="text-[#008450] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Tax Invoice</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-5 rounded-[10px] border border-[#EEEEEF] hover:border-[#008450]/40 transition-all shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EEEEEF]">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block">
                          Ordered on {ord.date} · Order #{ord.orderNumber}
                        </span>
                        <span className="text-xs text-[#00653D] font-bold flex items-center gap-1.5 mt-0.5">
                          <Truck className="w-3.5 h-3.5" />
                          {ord.deliveryDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-display font-black text-sm sm:text-base text-[#131814]">
                          ${ord.totalAmount.toFixed(2)}
                        </span>
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                            ord.status === 'Delivered'
                              ? 'bg-[#B0FADD] text-[#00653D]'
                              : 'bg-[#BFDBFE] text-[#1E3A8A]'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            src={it.image}
                            alt={it.title}
                            className="w-14 h-14 object-cover rounded-[6px] border border-[#EEEEEF]"
                          />
                          <div className="text-xs">
                            <strong className="text-[#131814] block line-clamp-1">{it.title}</strong>
                            <span className="text-[#51575C]">Size {it.size} · Qty {it.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#EEEEEF] flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="text-[#008450] font-bold hover:underline cursor-pointer"
                      >
                        Track Package & View Order Details →
                      </button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onRepeatOrder?.(ord);
                          onShowToast('Order re-added to your Bag!');
                        }}
                      >
                        Buy Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLIPKART PLUS / PRIME VIP ZONE */}
        {activeTab === 'vip' && (
          <div className="space-y-6">
            <div className="p-8 rounded-[12px] bg-gradient-to-r from-[#00653D] to-[#008450] text-white space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#54F5B6]">
                <Sparkles className="w-4 h-4" />
                <span>Mall360 Plus VIP Lounge · Amazon Prime & Flipkart Plus Model</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase">
                Welcome to Tier 1 Streetwear Privilege
              </h2>
              <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
                As a verified Plus Member, you get 1-hour early access to every limited drop, free
                doorstep exchanges, and 4x SuperCoins on 240+ GSM heavyweight editions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-[8px] border border-[#EEEEEF] space-y-2">
                <Truck className="w-6 h-6 text-[#008450]" />
                <h4 className="font-display font-bold text-sm text-[#131814]">Free Express Delivery</h4>
                <p className="text-xs text-[#51575C]">
                  Zero delivery fees with no minimum spend threshold on all streetwear cuts.
                </p>
              </div>

              <div className="p-5 bg-white rounded-[8px] border border-[#EEEEEF] space-y-2">
                <Clock className="w-6 h-6 text-[#008450]" />
                <h4 className="font-display font-bold text-sm text-[#131814]">1-Hour Early Access</h4>
                <p className="text-xs text-[#51575C]">
                  Shop limited 1-of-500 drop editions before public release.
                </p>
              </div>

              <div className="p-5 bg-white rounded-[8px] border border-[#EEEEEF] space-y-2">
                <Coins className="w-6 h-6 text-[#D97706]" />
                <h4 className="font-display font-bold text-sm text-[#131814]">4x SuperCoin Multiplier</h4>
                <p className="text-xs text-[#51575C]">
                  Earn 4 coins per $1 spent, redeemable on subsequent drop checkouts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#51575C]">
                Manage shipping destinations ({user.addresses.length} saved)
              </span>
              {!isAddingAddress && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setEditingAddressId(null);
                    setAddressForm({
                      name: user.name,
                      phone: user.phone,
                      street: '',
                      city: '',
                      state: '',
                      pincode: '',
                      type: 'HOME',
                      isDefault: false,
                    });
                    setIsAddingAddress(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Address
                </Button>
              )}
            </div>

            {isAddingAddress && (
              <form
                onSubmit={handleSaveAddress}
                className="p-5 bg-white rounded-[10px] border border-[#EEEEEF] space-y-4 shadow-sm"
              >
                <h4 className="font-display font-bold text-sm text-[#131814]">
                  {editingAddressId ? 'Edit Address' : 'Add New Shipping Destination'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#334155] mb-1">10-Digit Mobile</label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1 text-xs">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No., Building, Street Name"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    required
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Save Address
                  </Button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-5 rounded-[10px] border transition-all ${
                    addr.isDefault
                      ? 'border-[#008450] bg-white shadow-sm'
                      : 'border-[#EEEEEF] bg-white hover:border-[#C9CBCC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#131814]">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-extrabold text-[#00653D] bg-[#B0FADD] px-2 py-0.5 rounded">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#51575C]">{addr.street}</p>
                  <p className="text-xs text-[#51575C]">
                    {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                  </p>
                  <p className="text-xs text-[#51575C] mt-1">Phone: {addr.phone}</p>

                  <div className="pt-3 mt-3 border-t border-[#EEEEEF] flex items-center justify-between text-xs">
                    {!addr.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[#008450] font-bold hover:underline cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-[#EF4444] hover:underline ml-auto cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SUPERCOINS & MALL360 PAY WALLET */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[12px] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#92400E] uppercase flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#D97706]" />
                    Flipkart SuperCoins Balance
                  </span>
                  <span className="text-[10px] bg-[#D97706] text-white px-2 py-0.5 rounded-full font-bold">
                    Active
                  </span>
                </div>
                <div className="font-display font-black text-4xl text-[#78350F]">
                  {user.superCoins}
                </div>
                <p className="text-xs text-[#92400E]">
                  Redeemable at checkout for <strong>${(user.superCoins * 0.02).toFixed(2)}</strong> instant savings.
                </p>
              </div>

              <div className="p-6 rounded-[12px] bg-gradient-to-br from-[#F1F8FF] to-[#DBEAFE] border border-[#BFDBFE] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E3A8A] uppercase flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#2563EB]" />
                    Mall360 Pay Wallet
                  </span>
                  <span className="text-[10px] bg-[#2563EB] text-white px-2 py-0.5 rounded-full font-bold">
                    Amazon Pay Style
                  </span>
                </div>
                <div className="font-display font-black text-4xl text-[#1E3A8A]">
                  ${user.walletBalance.toFixed(2)}
                </div>
                <p className="text-xs text-[#1E3A8A]">
                  Instant refunds and 1-click checkout with stored balance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REFER & EARN (UNBOXED - Strictly NO CARD as requested) */}
        {activeTab === 'refer' && (
          <div className="pt-2">
            {/* Directly embeds the unboxed, fluid Refer & Earn component */}
            <ReferAndEarnSection
              user={user}
              onCopySuccess={(msg) => onShowToast(msg)}
              variant="inline"
            />
          </div>
        )}

        {/* TAB 6: SAVED PAYMENT MODES */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <span className="text-xs text-[#51575C]">
              Saved Cards & UPI IDs for fast checkout
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.savedPaymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className="p-5 rounded-[10px] border border-[#EEEEEF] bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#008450]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs text-[#131814]">{pm.title}</strong>
                        {pm.isDefault && (
                          <span className="text-[9px] font-bold bg-[#008450] text-white px-1.5 py-0.2 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#51575C] font-mono">{pm.details}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onShowToast('Payment mode removed.')}
                    className="text-xs text-[#EF4444] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS & PERSONAL DETAILS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-[10px] border border-[#EEEEEF] p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#131814]">
                  Personal Information
                </h3>
                <p className="text-xs text-[#51575C]">Manage your verified profile credentials</p>
              </div>

              {!isEditingProfile && (
                <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  Edit Details
                </Button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAFAFA] rounded-[8px] border border-[#EEEEEF]">
                  <span className="text-[10px] font-bold uppercase text-[#51575C] block mb-1">Email</span>
                  <strong className="text-[#131814]">{user.email}</strong>
                  <span className="text-[10px] text-[#008450] font-bold block mt-1">✓ Verified</span>
                </div>

                <div className="p-4 bg-[#FAFAFA] rounded-[8px] border border-[#EEEEEF]">
                  <span className="text-[10px] font-bold uppercase text-[#51575C] block mb-1">Phone</span>
                  <strong className="text-[#131814]">{user.phone}</strong>
                  <span className="text-[10px] text-[#008450] font-bold block mt-1">✓ Verified</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
