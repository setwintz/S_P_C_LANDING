'use client';

import React from 'react';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Award,
    BarChart2,
    Briefcase,
    Building2,
    Check,
    CheckCircle,
    ChevronDown,
    Circle,
    Cpu,
    FileCheck,
    Github,
    Hexagon,
    Layers,
    Linkedin,
    Mail,
    MapPin,
    Minus,
    Quote,
    Shield,
    Star,
    TrendingUp,
    Triangle,
    Twitter,
    Wrench,
} from 'lucide-react';

import { Outlet } from 'react-router-dom';

export default function Section2() {
    return (
        <>
            <div className="min-h-screen  flex flex-col items-center justify-center bg-slate-100 px-4 pt-4 pb-4 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 sm:p-6 lg:p-8 pt-0">
                <main className="w-[100%] max-w-7xl overflow-hidden rounded-2xl bg-white shadow-md ">
                    {/* Navigation */}
                    <Outlet />
                </main>
            </div>
        </>
    );
}