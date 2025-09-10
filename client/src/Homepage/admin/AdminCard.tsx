import React from "react";
import type { LucideIcon } from "lucide-react";

interface AdminCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "success" | "warning";
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    success: "bg-success-50 text-success-600",
    warning: "bg-warning-50 text-warning-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
