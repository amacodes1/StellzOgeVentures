import {
  UserIcon,
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "lucide-react";

interface Props {
  step: number;
}

const CheckoutProgress: React.FC<Props> = ({ step }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {[
          { icon: <UserIcon className="h-4 w-4" />, label: "Customer Info" },
          { icon: <TruckIcon className="h-4 w-4" />, label: "Shipping" },
          { icon: <CreditCardIcon className="h-4 w-4" />, label: "Payment" },
          {
            icon: <ShieldCheckIcon className="h-4 w-4" />,
            label: "Confirmation",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`flex-1 text-center ${
              step >= i + 1 ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full mb-2 ${
                step >= i + 1
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s.icon}
            </div>
            <span className="text-sm">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 h-1 bg-emerald-700 transition-all duration-500"
          style={{ width: `${(step - 1) * 33.33}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
