import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Football Analytics Engine", description: "Football match analysis and accumulator generator" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
