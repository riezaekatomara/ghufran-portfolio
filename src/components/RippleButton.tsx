"use client";

import { ButtonHTMLAttributes, useRef, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string; // opsional, default otomatis sesuai theme
}

export default function RippleButton({
  children,
  className,
  rippleColor,
  ...props
}: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = btnRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    // Warna ripple otomatis jika tidak ada prop rippleColor
    const bg = className?.includes("bg-primary")
      ? "rgba(255,255,255,0.5)" // ripple putih di tombol biru
      : "rgba(0,0,0,0.2)"; // ripple abu di tombol putih/outline

    circle.style.backgroundColor = rippleColor || bg;

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={twMerge(
        "relative overflow-hidden isolate transition duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
