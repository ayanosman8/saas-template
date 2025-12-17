"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Loader2,
  Check,
  Bell,
  Shield,
  CreditCard,
  User as UserIcon,
  Lock,
  Smartphone,
  Camera,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  Download,
  ExternalLink,
  AlertCircle,
  Zap,
  Github,
} from "lucide-react";
import { Dialog, DialogFooter } from "@/app/components/Dialog";

const tabs = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

// Demo billing data
const currentPlan = {
  name: "Pro",
  price: "$99",
  interval: "one-time",
  features: ["Everything in Starter", "Stripe Payments", "User Dashboard", "Priority Support"],
};

const invoices = [
  { id: "INV-001", date: "Dec 15, 2024", amount: "$99.00", status: "Paid" },
  { id: "INV-002", date: "Nov 15, 2024", amount: "$49.00", status: "Paid" },
];

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDemoDialog, setShowDemoDialog] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setFullName(user?.user_metadata?.full_name || "");
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-white/50 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.04] rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white/[0.08] text-white"
                : "text-white/50 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1a1a24] border border-white/[0.08] rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-white font-medium">{fullName || user?.email?.split("@")[0]}</h3>
                <p className="text-white/50 text-sm">{user?.email}</p>
                <button className="mt-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition">
                  Change avatar
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Email</label>
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3">
                  <Mail className="w-4 h-4 text-white/40" />
                  <span className="text-white/50">{user?.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Company</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/60 text-sm mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Connected Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Google</p>
                    <p className="text-white/40 text-sm">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm font-medium hover:bg-white/[0.08] transition">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#24292e] rounded-xl flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">GitHub</p>
                    <p className="text-white/40 text-sm">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm font-medium hover:bg-white/[0.08] transition">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{currentPlan.name} Plan</h3>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">Active</span>
                    </div>
                    <p className="text-white/50 text-sm">{currentPlan.price} {currentPlan.interval}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDemoDialog(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/15 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Manage
                </button>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {currentPlan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Payment Method</h3>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-9 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="text-white font-medium">•••• •••• •••• 4242</p>
                  <p className="text-white/40 text-sm">Expires 12/25</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm font-medium hover:bg-white/[0.08] transition">
                Update
              </button>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60 text-sm">API Requests</span>
                  <span className="text-white text-sm font-medium">8,542 / 10,000</span>
                </div>
                <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60 text-sm">Monthly Active Users</span>
                  <span className="text-white text-sm font-medium">1,234 / 5,000</span>
                </div>
                <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/[0.08]">
              <h3 className="text-lg font-medium text-white">Billing History</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 text-sm border-b border-white/[0.08]">
                  <th className="px-6 py-3 font-medium">Invoice</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-white/[0.05] last:border-0">
                    <td className="px-6 py-4 text-white font-medium">{invoice.id}</td>
                    <td className="px-6 py-4 text-white/60">{invoice.date}</td>
                    <td className="px-6 py-4 text-white">{invoice.amount}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">{invoice.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-5">Email Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl cursor-pointer hover:bg-white/[0.05] transition">
              <div>
                <p className="text-white font-medium">Product updates</p>
                <p className="text-white/40 text-sm">News about product and feature updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl cursor-pointer hover:bg-white/[0.05] transition">
              <div>
                <p className="text-white font-medium">Security alerts</p>
                <p className="text-white/40 text-sm">Important security notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl cursor-pointer hover:bg-white/[0.05] transition">
              <div>
                <p className="text-white font-medium">Marketing emails</p>
                <p className="text-white/40 text-sm">Tips, offers and promotions</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl cursor-pointer hover:bg-white/[0.05] transition">
              <div>
                <p className="text-white font-medium">Weekly digest</p>
                <p className="text-white/40 text-sm">Weekly summary of your activity</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" />
            </label>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Password</h3>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-white/40 text-sm">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm font-medium hover:bg-white/[0.08] transition">
                Change
              </button>
            </div>
          </div>

          <div className="bg-[#0f0f17]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-white font-medium">Authenticator app</p>
                  <p className="text-white/40 text-sm">Add an extra layer of security</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition">
                Enable
              </button>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-5">Danger Zone</h3>
            <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-white/40 text-sm">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium hover:bg-red-500/30 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white font-medium hover:bg-white/[0.08] transition">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Demo Dialog */}
      <Dialog
        open={showDemoDialog}
        onClose={() => setShowDemoDialog(false)}
        title="Demo Mode"
        description="This feature requires Stripe configuration."
      >
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-200 text-sm font-medium">Stripe not configured</p>
            <p className="text-amber-200/70 text-xs mt-1">
              Add your Stripe API keys to <code className="px-1.5 py-0.5 bg-amber-500/20 rounded text-amber-200">.env.local</code> to enable billing management.
            </p>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => setShowDemoDialog(false)}
            className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm font-medium hover:bg-white/[0.08] transition"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
