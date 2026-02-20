import FullTrolleySvg from "@/assets/svg/full-trolley.svg";
import DeliveryTruckSvg from "@/assets/svg/delivery-truck.svg";
import BigBoxSvg from "@/assets/svg/big-box.svg";
import CashRegisterSvg from "@/assets/svg/cash-register.svg";

export type Slide = {
  key: string;
  title: string;
  subtitle: string;
  Illustration: React.ComponentType<{ width?: number; height?: number }>;
};

export const ONBOARDING_SLIDES: Slide[] = [
  {
    key: "1",
    title: "Welcome to Grocercya",
    subtitle:
      "Get your grocery needs at your service within a minute, fast, efficient, and convenient.",
    Illustration: FullTrolleySvg,
  },
  {
    key: "2",
    title: "Get any packages delivered",
    subtitle:
      "Get all your items conveniently, ensuring everything you need arrive without any hassle.",
    Illustration: DeliveryTruckSvg,
  },
  {
    key: "3",
    title: "Protected package delivery.",
    subtitle:
      "Your groceries are carefully packaged to ensure they arrive safely and in perfect condition.",
    Illustration: BigBoxSvg,
  },
  {
    key: "4",
    title: "Best price guaranteed",
    subtitle:
      "Allowing you to stock up on your favorite items while staying within your budget.",
    Illustration: CashRegisterSvg,
  },
];
