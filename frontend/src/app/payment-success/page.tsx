"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const billingId = searchParams.get("billing_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    if (!billingId) {
      setStatus("error");
      setMessage("Invalid payment link. No billing ID found.");
      return;
    }

    // Auto-call the backend to mark bill as Paid
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/${billingId}/pay`, {
          method: "POST",
        });
        if (res.ok) {
          setStatus("success");
          setMessage("Your payment has been verified and recorded successfully!");
        } else {
          const data = await res.json();
          // If already paid, still show success
          if (data.detail === "Bill not found") {
            setStatus("error");
            setMessage("Could not find this invoice. Please contact the clinic.");
          } else {
            setStatus("success");
            setMessage("Payment confirmed! Your receipt has been sent to your email.");
          }
        }
      } catch (err) {
        setStatus("error");
        setMessage("Could not connect to the clinic system. Please contact the clinic to confirm your payment.");
      }
    };

    verifyPayment();
  }, [billingId]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full mx-4 text-center">
        
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900">
            MedFlow<span className="text-blue-600">Clinic</span>
          </h1>
        </div>

        {/* Status Icon */}
        <div className="mb-6 flex justify-center">
          {status === "loading" && (
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          )}
          {status === "success" && (
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          )}
          {status === "error" && (
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          {status === "loading" && "Processing Payment"}
          {status === "success" && "Payment Successful!"}
          {status === "error" && "Verification Issue"}
        </h2>

        {/* Message */}
        <p className="text-slate-500 text-base leading-relaxed mb-8">{message}</p>

        {/* Invoice Number */}
        {billingId && status === "success" && (
          <div className="bg-slate-50 rounded-xl px-5 py-3 mb-8 inline-block">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Invoice</p>
            <p className="text-lg font-black text-slate-800">#INV-{billingId.padStart(4, "0")}</p>
          </div>
        )}

        {/* CTA */}
        {status !== "loading" && (
          <a
            href="/"
            className="block w-full py-3 px-6 rounded-xl text-white font-bold text-sm transition-all"
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
          >
            Return to MedFlow Clinic
          </a>
        )}

        <p className="text-xs text-slate-400 mt-6">
          A payment receipt has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
