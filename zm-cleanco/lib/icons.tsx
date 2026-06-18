import {
  House, Sparkles, Truck, Building2, CalendarDays, HardHat,
  Repeat2, CalendarClock, Calendar, LucideProps,
  Wrench, Star, Users, ThumbsUp, CheckCircle,
  Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight,
  Menu, X, Share2, ChevronRight, ShieldCheck,
  Sun, Moon, PenLine, Zap,
} from "lucide-react";
import type { FC } from "react";

const MAP: Record<string, FC<LucideProps>> = {
  House, Sparkles, Truck, Building2, CalendarDays, HardHat,
  Repeat2, CalendarClock, Calendar, Wrench, Star, Users,
  ThumbsUp, CheckCircle, Mail, Phone, MapPin, Clock,
  MessageCircle, ArrowRight, Menu, X, Share2, ChevronRight,
  ShieldCheck, Sun, Moon, PenLine, Zap,
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  className = "",
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Comp = MAP[name];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={strokeWidth} className={className} />;
}
