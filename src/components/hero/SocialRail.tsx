import { motion, useReducedMotion } from "framer-motion";
import { Heart, Mail, MessageCircle } from "lucide-react";
import { cx } from "../../lib/cx";

type RailButtonProps = {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  delay: number;
};

function RailButton({ icon, label, badge, delay }: RailButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="#contact"
      className={cx(
        "group relative flex h-[52px] w-[52px] items-center justify-center rounded-[14px]",
        "border border-line bg-paper/85 shadow-[0_6px_18px_rgba(23,35,45,.12)] backdrop-blur",
        "transition-[transform,box-shadow] duration-300 hover:translate-x-1",
        "hover:shadow-[0_10px_26px_rgba(23,35,45,.2)]",
      )}
      aria-label={label}
      initial={reduce ? false : { opacity: 0, x: -16 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-ink transition-colors duration-300 group-hover:text-burgundy">
        {icon}
      </span>
      {badge && (
        <span className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-burgundy px-1 font-mono text-[9px] font-semibold text-white shadow-sm">
          {badge}
        </span>
      )}
    </motion.a>
  );
}

export function SocialRail() {
  return (
    <div className="flex flex-col gap-3.5">
      <RailButton icon={<Mail size={20} strokeWidth={1.75} />} label="Email" badge="99+" delay={0.5} />
      <RailButton
        icon={<MessageCircle size={20} strokeWidth={1.75} />}
        label="Pesan"
        delay={0.58}
      />
      <RailButton icon={<Heart size={20} strokeWidth={1.75} />} label="Suka" badge="99+" delay={0.66} />
    </div>
  );
}
