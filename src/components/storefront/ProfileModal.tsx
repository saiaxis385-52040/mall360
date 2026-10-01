import React, { useState } from 'react';
import {
  X,
  Package,
  MapPin,
  User,
  Coins,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Download,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { UserProfile, Address, Order } from '../../types/user';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ReferAndEarnSection } from './ReferAndEarnSection';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onTrackOrder?: (order: Order) => void;
  onRepeatOrder?: (order: Order) => void;
  initialTab?: 'orders' | 'addresses' | 'profile' | 'wallet' | 'refer' | 'payments' | 'settings';
}

type TabType = 'orders' | 'addresses' | 'profile' | 'wallet' | 'refer' | 'payments' | 'settings';

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onTrackOrder,
  onRepeatOrder,
  initialTab = 'orders',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
  });

  // Address state
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

  // Selected order for detailed view
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Success flash toast inside modal
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const showFlash = (msg: string) => {
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(null), 3500);
  };

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      ...profileForm,
    });
    setEditingProfile(false);
    showFlash('Profile information updated successfully!');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.pincode) return;

    if (editingAddressId) {
      const updatedList = user.addresses.map((a) =>
        a.id === editingAddressId
          ? { ...addressForm, id: a.id }
          : addressForm.isDefault
          ? { ...a, isDefault: false }
          : a
      );
      onUpdateUser({ ...user, addresses: updatedList });
      showFlash('Address updated successfully!');
    } else {
      const newAddress: Address = {
        ...addressForm,
        id: `addr-${Date.now()}`,
      };
      const updatedList = addressForm.isDefault
        ? [...user.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
        : [...user.addresses, newAddress];
      onUpdateUser({ ...user, addresses: updatedList });
      showFlash('New address added to your address book!');
    }

    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = user.addresses.filter((a) => a.id !== id);
    onUpdateUser({ ...user, addresses: updated });
    showFlash('Address removed.');
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    onUpdateUser({ ...user, addresses: updated });
    showFlash('Default delivery address updated.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-[12px] border border-[#EEEEEF] shadow-veirdo-lg overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:h-[680px]">
        {/* Left Navigation Sidebar (Amazon & Flipkart My Account style) */}
        <div className="w-full md:w-64 bg-[#FAFAFA] border-b md:border-b-0 md:border-r border-[#EEEEEF] p-4 flex flex-col justify-between shrink-0">
          <div>
            {/* User Profile Mini Header */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-[8px] border border-[#EEEEEF] shadow-sm mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#008450]"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008450] block truncate">
                  {user.membershipTier}
                </span>
                <h3 className="font-display font-bold text-sm text-[#131814] truncate">
                  {user.name}
                </h3>
                <span className="text-[11px] text-[#51575C] truncate block">{user.email}</span>
              </div>
            </div>

            {/* Quick Rewards Badge (Flipkart SuperCoins / Amazon Wallet balance) */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px]">
                <div className="flex items-center gap-1 text-[#92400E] text-[10px] font-bold uppercase">
                  <Coins className="w-3 h-3 text-[#D97706]" />
                  <span>Coins</span>
                </div>
                <div className="text-sm font-display font-black text-[#78350F] mt-0.5">
                  {user.superCoins}
                </div>
                <div className="text-[9px] text-[#92400E] font-medium">Value: ${(user.superCoins * 0.02).toFixed(2)}</div>
              </div>

              <div className="p-2.5 bg-[#F1F8FF] border border-[#BFDBFE] rounded-[6px]">
                <div className="flex items-center gap-1 text-[#1E3A8A] text-[10px] font-bold uppercase">
                  <CreditCard className="w-3 h-3 text-[#2563EB]" />
                  <span>Wallet</span>
                </div>
                <div className="text-sm font-display font-black text-[#1E3A8A] mt-0.5">
                  ${user.walletBalance.toFixed(2)}
                </div>
                <div className="text-[9px] text-[#2563EB] font-medium">Mall360 Pay</div>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="space-y-1">
              {[
                { id: 'orders', label: 'My Orders', icon: Package, badge: user.orders.length },
                { id: 'refer', label: 'Refer & Earn', icon: Users, badge: 'Get $10' },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: user.addresses.length },
                { id: 'profile', label: 'Profile Details', icon: User },
                { id: 'wallet', label: 'Coins & Wallet', icon: Coins },
                { id: 'payments', label: 'Payment Modes', icon: CreditCard },
                { id: 'settings', label: 'Preferences', icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setSelectedOrder(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#008450] text-white shadow-veirdo-sm'
                        : 'text-[#334155] hover:bg-[#EEEEEF] hover:text-[#131814]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#EEEEEF] text-[#51575C]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Membership Footer Info */}
          <div className="pt-3 border-t border-[#EEEEEF] text-[11px] text-[#51575C] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008450]" />
              {user.membershipTier}
            </span>
            <span className="text-[10px] font-mono opacity-75">{user.id.slice(-6)}</span>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
          {/* Top Title Bar with Close Button */}
          <div className="p-4 sm:px-6 py-3.5 border-b border-[#EEEEEF] flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 id="profile-modal-title" className="font-display font-bold text-base text-[#131814]">
                {activeTab === 'orders' && (selectedOrder ? `Order #${selectedOrder.orderNumber}` : 'Your Orders & Purchases')}
                {activeTab === 'refer' && 'Refer & Earn ($10 Cash + 250 SuperCoins)'}
                {activeTab === 'addresses' && 'Manage Delivery Addresses'}
                {activeTab === 'profile' && 'Personal Information'}
                {activeTab === 'wallet' && 'SuperCoins & Mall360 Pay Wallet'}
                {activeTab === 'payments' && 'Saved Cards & UPI Handles'}
                {activeTab === 'settings' && 'Account Settings & Notifications'}
              </h2>
              <p className="text-[11px] text-[#51575C]">
                {activeTab === 'orders' && 'Track packages, download invoices, or initiate exchanges'}
                {activeTab === 'refer' && 'Invite friends with your secret code. No cards, direct rewards.'}
                {activeTab === 'addresses' && 'Add and manage your shipping destinations for 1-click checkout'}
                {activeTab === 'profile' && 'Manage your name, verified phone number and preferences'}
                {activeTab === 'wallet' && 'Redeem reward coins or pay using stored store credits'}
                {activeTab === 'payments' && 'Secure tokenized payment credentials'}
                {activeTab === 'settings' && 'Control communications and security preferences'}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Account Modal"
              className="p-1.5 rounded-full hover:bg-[#EEEEEF] text-[#74797D] hover:text-[#131814] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Flash Toast */}
          {flashMessage && (
            <div className="bg-[#B0FADD]/40 border-b border-[#00DA85] px-4 py-2 text-xs font-semibold text-[#00653D] flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-[#008450]" />
              <span>{flashMessage}</span>
            </div>
          )}

          {/* Scrollable Tab Content Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {/* TAB 1: ORDERS (Amazon / Flipkart Order History & Live Tracking) */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {selectedOrder ? (
                  /* Single Order Detail & Live Shipment Tracker View */
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="text-xs font-bold text-[#008450] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      ← Back to All Orders
                    </button>

                    {/* Order Status Tracker */}
                    <div className="p-4 bg-[#F5F5F4] rounded-[8px] border border-[#EEEEEF]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block">
                            Order Status
                          </span>
                          <h4 className="font-display font-extrabold text-sm sm:text-base text-[#131814]">
                            {selectedOrder.status} · {selectedOrder.deliveryDate}
                          </h4>
                          <span className="text-xs text-[#51575C]">
                            Tracking ID: <span className="font-mono font-semibold text-[#131814]">{selectedOrder.trackingNumber}</span>
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            selectedOrder.status === 'Delivered'
                              ? 'bg-[#B0FADD] text-[#00653D]'
                              : selectedOrder.status === 'Out for Delivery'
                              ? 'bg-[#BFDBFE] text-[#1E3A8A]'
                              : 'bg-[#FEF08A] text-[#854D0E]'
                          }`}
                        >
                          {selectedOrder.status}
                        </span>
                      </div>

                      {/* Visual 4-Step Tracker Progress Bar */}
                      <div className="relative pt-2 pb-1">
                        <div className="flex items-center justify-between relative z-10 text-[11px] font-bold">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-[#008450] text-white flex items-center justify-center text-xs">
                              ✓
                            </div>
                            <span className="text-[#008450] mt-1">Confirmed</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-[#008450] text-white flex items-center justify-center text-xs">
                              ✓
                            </div>
                            <span className="text-[#008450] mt-1">Shipped</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                selectedOrder.status === 'Out for Delivery' || selectedOrder.status === 'Delivered'
                                  ? 'bg-[#008450] text-white'
                                  : 'bg-[#C9CBCC] text-white'
                              }`}
                            >
                              {selectedOrder.status === 'Out for Delivery' ? '●' : '✓'}
                            </div>
                            <span className="text-[#131814] mt-1">Out for Delivery</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                selectedOrder.status === 'Delivered'
                                  ? 'bg-[#008450] text-white'
                                  : 'bg-[#C9CBCC] text-white'
                              }`}
                            >
                              {selectedOrder.status === 'Delivered' ? '✓' : '4'}
                            </div>
                            <span className={selectedOrder.status === 'Delivered' ? 'text-[#008450] mt-1' : 'text-[#74797D] mt-1'}>
                              Delivered
                            </span>
                          </div>
                        </div>

                        {/* Connecting track line */}
                        <div className="absolute top-5 left-3 right-3 h-0.5 bg-[#C9CBCC] -z-0">
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

                    {/* Items List in this Order */}
                    <div className="space-y-3">
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#334155]">
                        Items Ordered ({selectedOrder.items.length})
                      </h4>

                      {selectedOrder.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3.5 p-3 rounded-[8px] border border-[#EEEEEF] bg-white hover:border-[#C9CBCC] transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-[6px] border border-[#EEEEEF] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display font-bold text-xs sm:text-sm text-[#131814] truncate">
                              {item.title}
                            </h5>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#51575C]">
                              <span>Size: <strong>{item.size}</strong></span>
                              <span>·</span>
                              <span>Qty: <strong>{item.quantity}</strong></span>
                            </div>
                            <div className="text-xs font-bold text-[#131814] mt-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              onRepeatOrder?.(selectedOrder);
                              showFlash('Item re-added to your Bag!');
                            }}
                          >
                            Buy It Again
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Payment Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                        <span className="font-bold text-[#334155] uppercase tracking-wider text-[10px] block mb-1">
                          Delivery Address
                        </span>
                        <strong className="text-[#131814]">{selectedOrder.shippingAddress.name}</strong>
                        <p className="text-[#51575C] mt-0.5">
                          {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{' '}
                          {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                        </p>
                        <p className="text-[#51575C]">Phone: {selectedOrder.shippingAddress.phone}</p>
                      </div>

                      <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                        <span className="font-bold text-[#334155] uppercase tracking-wider text-[10px] block mb-1">
                          Payment & Invoice
                        </span>
                        <p className="text-[#131814] font-medium">Method: {selectedOrder.paymentMethod}</p>
                        <p className="text-[#131814] font-bold mt-0.5">
                          Total Paid: ${selectedOrder.totalAmount.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => showFlash('Tax Invoice downloaded to your device!')}
                          className="mt-2 text-[#008450] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download Tax Invoice (PDF)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Orders List View */
                  <div className="space-y-3">
                    {user.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-[8px] border border-[#EEEEEF] bg-white hover:border-[#008450]/40 hover:shadow-veirdo-sm transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EEEEEF]">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#51575C] block">
                              Order Placed: {ord.date}
                            </span>
                            <span className="font-display font-bold text-xs sm:text-sm text-[#131814]">
                              Order #{ord.orderNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-display font-extrabold text-xs sm:text-sm text-[#131814]">
                              ${ord.totalAmount.toFixed(2)}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                ord.status === 'Delivered'
                                  ? 'bg-[#B0FADD] text-[#00653D]'
                                  : ord.status === 'Out for Delivery'
                                  ? 'bg-[#BFDBFE] text-[#1E3A8A]'
                                  : 'bg-[#FEF08A] text-[#854D0E]'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        {/* Items in this order */}
                        <div className="py-3 flex flex-wrap items-center gap-3">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img
                                src={it.image}
                                alt={it.title}
                                className="w-12 h-12 object-cover rounded-[4px] border border-[#EEEEEF]"
                              />
                              <div className="text-xs">
                                <p className="font-bold text-[#131814] line-clamp-1 max-w-[180px]">
                                  {it.title}
                                </p>
                                <p className="text-[11px] text-[#51575C]">
                                  Size {it.size} · Qty {it.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#EEEEEF]">
                          <span className="text-[11px] text-[#00653D] font-medium flex items-center gap-1">
                            <Truck className="w-3.5 h-3.5" />
                            {ord.deliveryDate}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(ord)}
                              className="text-xs font-bold text-[#008450] hover:underline px-2 py-1 cursor-pointer"
                            >
                              View Details & Track →
                            </button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                onRepeatOrder?.(ord);
                                showFlash('Added previous order items to your Bag!');
                              }}
                            >
                              Buy Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES (Amazon / Flipkart Address Book) */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#51575C]">
                    Saved Delivery Locations ({user.addresses.length})
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
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Add New Address
                    </Button>
                  )}
                </div>

                {/* Add / Edit Address Form Modal */}
                {isAddingAddress && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="p-4 bg-[#F5F5F4] rounded-[8px] border border-[#EEEEEF] space-y-3 animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#131814]">
                        {editingAddressId ? 'Edit Address' : 'Add New Shipping Address'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="text-xs text-[#51575C] hover:text-[#131814]"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-[#334155] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#334155] mb-1">
                          10-Digit Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Street Address / Flat / Building *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 452 Broome St, Apt 4B, SoHo"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-[#334155] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#334155] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#334155] mb-1">
                          Pincode / Zip *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        {(['HOME', 'WORK', 'OTHER'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setAddressForm({ ...addressForm, type: t })}
                            className={`px-3 py-1 rounded-[4px] text-xs font-semibold border cursor-pointer ${
                              addressForm.type === t
                                ? 'bg-[#131814] text-white border-[#131814]'
                                : 'bg-white text-[#334155] border-[#C9CBCC]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      <label className="flex items-center gap-1.5 text-xs text-[#334155] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, isDefault: e.target.checked })
                          }
                          className="rounded text-[#008450]"
                        />
                        <span>Make Default Delivery Address</span>
                      </label>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" type="submit">
                        Save Address
                      </Button>
                    </div>
                  </form>
                )}

                {/* Addresses List Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-[8px] border transition-all ${
                        addr.isDefault
                          ? 'border-[#008450] bg-[#F1F8FF]/60 shadow-veirdo-sm'
                          : 'border-[#EEEEEF] bg-white hover:border-[#C9CBCC]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#131814]">{addr.name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EEEEEF] text-[#51575C]">
                            {addr.type}
                          </span>
                        </div>
                        {addr.isDefault && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#008450] bg-[#B0FADD] px-2 py-0.5 rounded-[4px]">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#51575C] leading-relaxed">
                        {addr.street}
                      </p>
                      <p className="text-xs text-[#51575C]">
                        {addr.city}, {addr.state} - <strong className="text-[#131814]">{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-[#51575C] mt-1">Phone: {addr.phone}</p>

                      <div className="mt-3 pt-2.5 border-t border-[#EEEEEF] flex items-center justify-between text-xs">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-[#008450] font-bold hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        )}
                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setAddressForm({
                                name: addr.name,
                                phone: addr.phone,
                                street: addr.street,
                                city: addr.city,
                                state: addr.state,
                                pincode: addr.pincode,
                                type: addr.type,
                                isDefault: addr.isDefault,
                              });
                              setEditingAddressId(addr.id);
                              setIsAddingAddress(true);
                            }}
                            className="text-[#51575C] hover:text-[#131814] p-1 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {user.addresses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-[#EF4444] hover:text-[#B91C1C] p-1 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROFILE INFORMATION (Amazon / Flipkart Personal Details) */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="p-4 bg-[#FAFAFA] rounded-[8px] border border-[#EEEEEF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#008450]"
                    />
                    <div>
                      <h4 className="font-display font-bold text-base text-[#131814]">{user.name}</h4>
                      <p className="text-xs text-[#51575C]">{user.membershipTier} · {user.joinedDate}</p>
                    </div>
                  </div>

                  {!editingProfile && (
                    <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)}>
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {editingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-[#334155] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">Gender</label>
                        <select
                          value={profileForm.gender}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              gender: e.target.value as any,
                            })
                          }
                          className="w-full bg-white border border-[#C9CBCC] rounded-[6px] px-3 py-2 text-xs focus:border-[#008450] focus:outline-none cursor-pointer"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block mb-1">
                        Primary Email
                      </span>
                      <strong className="text-[#131814]">{user.email}</strong>
                      <span className="text-[10px] text-[#008450] font-bold block mt-1">✓ Verified</span>
                    </div>

                    <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block mb-1">
                        Contact Phone
                      </span>
                      <strong className="text-[#131814]">{user.phone}</strong>
                      <span className="text-[10px] text-[#008450] font-bold block mt-1">✓ Verified for OTP</span>
                    </div>

                    <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block mb-1">
                        Gender
                      </span>
                      <strong className="text-[#131814] capitalize">{user.gender}</strong>
                    </div>

                    <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#EEEEEF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#51575C] block mb-1">
                        Security
                      </span>
                      <strong className="text-[#131814]">2-Step Verification Active</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SUPERCOINS & WALLET (Flipkart SuperCoins / Amazon Pay balance) */}
            {activeTab === 'wallet' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-5 rounded-[8px] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-[#D97706]" />
                        SuperCoins Balance
                      </span>
                      <span className="text-[10px] font-bold bg-[#F59E0B] text-white px-2 py-0.5 rounded-full">
                        Flipkart Style
                      </span>
                    </div>
                    <div className="font-display font-black text-3xl text-[#78350F]">
                      {user.superCoins}
                    </div>
                    <p className="text-xs text-[#92400E] mt-1">
                      Worth <strong>${(user.superCoins * 0.02).toFixed(2)}</strong> discount on any checkout!
                    </p>
                  </div>

                  <div className="p-5 rounded-[8px] bg-gradient-to-br from-[#F1F8FF] to-[#DBEAFE] border border-[#BFDBFE]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#2563EB]" />
                        Mall360 Pay Wallet
                      </span>
                      <span className="text-[10px] font-bold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                        1-Click Pay
                      </span>
                    </div>
                    <div className="font-display font-black text-3xl text-[#1E3A8A]">
                      ${user.walletBalance.toFixed(2)}
                    </div>
                    <p className="text-xs text-[#1E3A8A] mt-1">
                      Zero cancellation fee & instant refund wallet
                    </p>
                  </div>
                </div>

                {/* Coin History */}
                <div className="p-4 rounded-[8px] border border-[#EEEEEF] bg-white space-y-2.5">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#131814]">
                    Recent Rewards & Coin Activity
                  </h4>
                  <div className="divide-y divide-[#EEEEEF] text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <div>
                        <strong className="text-[#131814] block">Order #M360-ORD-98412 Purchase</strong>
                        <span className="text-[11px] text-[#51575C]">Sep 29, 2026 · Heavyweight Drop</span>
                      </div>
                      <span className="text-[#008450] font-bold">+40 SuperCoins</span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div>
                        <strong className="text-[#131814] block">Welcome VIP Streetwear Onboarding</strong>
                        <span className="text-[11px] text-[#51575C]">Sep 01, 2026 · Plus Tier</span>
                      </div>
                      <span className="text-[#008450] font-bold">+800 SuperCoins</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REFER & EARN (UNBOXED - No Card as requested) */}
            {activeTab === 'refer' && (
              <div className="pt-2">
                <ReferAndEarnSection
                  user={user}
                  onCopySuccess={(msg) => showFlash(msg)}
                  variant="inline"
                />
              </div>
            )}

            {/* TAB 5: SAVED PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <span className="text-xs text-[#51575C]">
                  Stored Payment Methods for Instant Checkout
                </span>

                <div className="space-y-3">
                  {user.savedPaymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-3.5 rounded-[8px] border border-[#EEEEEF] bg-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[6px] bg-[#FAFAFA] border border-[#EEEEEF] flex items-center justify-center text-[#131814]">
                          <CreditCard className="w-5 h-5 text-[#008450]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-display font-bold text-xs text-[#131814]">{pm.title}</h5>
                            {pm.isDefault && (
                              <span className="text-[9px] font-bold bg-[#008450] text-white px-1.5 py-0.2 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#51575C] font-mono">{pm.details}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showFlash('Payment method removed.')}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#FAFAFA] rounded-[8px] border border-[#EEEEEF] space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#131814]">
                    Notifications & Communications
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-2 rounded bg-white border border-[#EEEEEF] cursor-pointer">
                      <span>WhatsApp Order Status & Live Tracking Updates</span>
                      <input type="checkbox" defaultChecked className="rounded text-[#008450]" />
                    </label>
                    <label className="flex items-center justify-between p-2 rounded bg-white border border-[#EEEEEF] cursor-pointer">
                      <span>SMS Dispatch & Delivery Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded text-[#008450]" />
                    </label>
                    <label className="flex items-center justify-between p-2 rounded bg-white border border-[#EEEEEF] cursor-pointer">
                      <span>Secret Streetwear Drop & Archive Vault Emails</span>
                      <input type="checkbox" defaultChecked className="rounded text-[#008450]" />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:px-6 py-3 border-t border-[#EEEEEF] bg-[#FAFAFA] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#51575C]">
              Signed in as <strong className="text-[#131814]">{user.email}</strong>
            </span>
            <Button variant="outline" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
