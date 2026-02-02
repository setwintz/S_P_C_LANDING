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

export default function Section2() {
    return (
        <>
            <div className="min-h-screen  flex flex-col items-center justify-center bg-slate-100 px-4 pt-4 pb-4 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 sm:p-6 lg:p-8 pt-0">
                <main className="w-[100%] max-w-7xl overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-primary/50">
                    {/* Navigation */}


                    {/* Hero Section */}
                    <div className="grid items-center gap-12 px-6 py-12 lg:grid-cols-2 grid-cols-1 lg:gap-24 lg:px-16 lg:py-20">
                        {/* Left Content */}
                        <div className="">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/20 px-3 py-1 text-base font-medium text-primary">
                                <span className="relative flex h-2 w-2">
                                    {/* <span className="absolute inline-flex h-full w-[100%] animate-ping rounded-full bg-blue-400 opacity-75"></span> */}
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                </span>
                                Accepting new clients for Q4
                            </div>

                            <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight text-slate-900 lg:text-5xl">
                                Financial clarity for <span className="text-slate-400">modern ambitious teams.</span>
                            </h1>

                            <p className="mb-8 text-lg font-light leading-relaxed text-slate-500">
                                Move beyond spreadsheets. We provide real-time bookkeeping, tax strategy, and CFO services designed for high-growth startups and digital agencies.
                            </p>

                            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="rounded bg-blue-50 p-1 text-blue-600">
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                    </div>
                                    Audit-proof books
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="rounded bg-blue-50 p-1 text-blue-600">
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                    </div>
                                    Tax advisory
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="rounded bg-blue-50 p-1 text-blue-600">
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                    </div>
                                    Payroll management
                                </div>
                            </div>

                            <div className="flex items-center gap-6 border-t border-slate-100 pt-8">
                                <p className="text-base font-medium uppercase tracking-widest text-slate-400">Trusted by</p>
                                <div className="flex gap-6 opacity-40 grayscale transition-all duration-500 hover:grayscale-0">
                                    <span className="flex items-center gap-1 text-lg font-bold tracking-tighter">
                                        <Hexagon className="h-[18px] w-[18px]" />
                                        ACME
                                    </span>
                                    <span className="flex items-center gap-1 text-lg font-bold tracking-tighter">
                                        <Triangle className="h-[18px] w-[18px]" />
                                        VERTEX
                                    </span>
                                    <span className="flex items-center gap-1 text-lg font-bold tracking-tighter">
                                        <Circle className="h-[18px] w-[18px]" />
                                        SPHERE
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="relative">
                            <div className="pointer-events-none absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-primary/40 blur-3xl"></div>
                            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primaryDark/40 blur-3xl"></div>
                            {/* <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl"></div> */}

                            <div className="relative z-[9] rounded-xl border border-slate-100 bg-white p-6 shadow-lg sm:p-8">
                                <div className="mb-6">
                                    <h3 className="text-xl font-medium tracking-tight text-slate-900">Get a free consultation</h3>
                                    <p className="mt-1 text-sm text-slate-500">Our experts will analyze your current setup.</p>
                                </div>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-base font-medium text-slate-700">First name</label>
                                            <input
                                                type="text"
                                                placeholder="Jane"
                                                className='input-base' />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-base font-medium text-slate-700">Last name</label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                className='input-base' />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-base font-medium text-slate-700">Work Email</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="jane@company.com"
                                                className='input-base pl-10' />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-base font-medium text-slate-700">Monthly Revenue</label>
                                        <div className="relative">
                                            <select
                                                className='input-base'                                               >
                                                <option>Pre-revenue</option>
                                                <option>$1k - $10k</option>
                                                <option>$10k - $50k</option>
                                                <option>$50k+</option>
                                            </select>
                                            {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                                                <ChevronDown className="h-4 w-4" />
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="flex items-start pt-2">
                                        <div className="flex h-5 items-center">
                                            <input id="terms" type="checkbox" className="peer sr-only" />
                                            <div className="flex h-4 w-4 items-center justify-center rounded border border-slate-300 bg-slate-50 transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500">
                                                <Check className="h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <label htmlFor="terms" className="ml-2 cursor-pointer text-base font-medium leading-tight text-slate-500">
                                            I agree to the processing of my personal data.
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        className="twoD-style-button-three flex w-[100%] justify-center py-2 items-center gap-2"

                                    // className="flex w-[100%] items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    >
                                        Book Assessment
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <section className="border-y border-slate-100 bg-slate-50 px-6 py-16 lg:px-16">
                        <div className="mx-auto mb-12  text-center">
                            <h2 className="mb-3 text-2xl font-medium tracking-tight text-slate-900">Everything in one place</h2>
                            <p className="font-light text-slate-500">
                                We integrate with your existing stack to provide a unified view of your financial health.
                            </p>
                        </div>

                        <div className="mx-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-6 sm:p-8">
                                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                                        <div className="mb-1 text-base font-medium text-slate-400">Total Revenue</div>
                                        <div className="text-xl font-semibold tracking-tight text-slate-900">$124,500.00</div>
                                        <div className="mt-2 flex w-fit items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-base font-medium text-emerald-600">
                                            <TrendingUp className="h-3 w-3" />
                                            +12.5%
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                                        <div className="mb-1 text-base font-medium text-slate-400">Expenses</div>
                                        <div className="text-xl font-semibold tracking-tight text-slate-900">$42,100.00</div>
                                        <div className="mt-2 flex w-fit items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-base font-medium text-slate-500">
                                            <Minus className="h-3 w-3" />
                                            2.1%
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                                        <div className="mb-1 text-base font-medium text-slate-400">Net Profit</div>
                                        <div className="text-xl font-semibold tracking-tight text-slate-900">$82,400.00</div>
                                        <div className="mt-2 flex w-fit items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-base font-medium text-emerald-600">
                                            <TrendingUp className="h-3 w-3" />
                                            +18.2%
                                        </div>
                                    </div>
                                </div>

                                <div className="flex h-32 w-[100%] items-end justify-between gap-2 opacity-80">
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/10 h-[40%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/20 h-[60%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/30 h-[50%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/40 h-[70%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/50 h-[55%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500/60 h-[80%]"></div>
                                    <div className="w-[100%] rounded-t-sm bg-blue-500 h-[90%]"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Services Grid */}
                    <section className="border-b border-slate-100 px-6 py-16 lg:px-16">
                        <div className="mb-12">
                            <span className="mb-2 block text-base font-semibold uppercase tracking-wider text-blue-600">Our Expertise</span>
                            <h2 className="text-2xl font-medium tracking-tight text-slate-900">Comprehensive financial solutions</h2>
                            <p className="mt-2 max-w-xl font-light text-slate-500">
                                From daily compliance to strategic advisory, we cover the full spectrum of your financial needs.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Compliance & Core */}
                            <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:bg-slate-50 hover:shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-blue-100 text-blue-600 shadow-sm">
                                        <FileCheck className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-medium tracking-tight text-slate-900">Compliance &amp; Core</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Tax Preparation &amp; Planning</span>
                                            <span className="text-base text-slate-500">Including High Net Worth planning &amp; Multi-State filings.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Business Tax Preparation</span>
                                            <span className="text-base text-slate-500">LLC, S-Corp, C-Corp, and Partnership returns.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Bookkeeping &amp; Month-End Close</span>
                                            <span className="text-base text-slate-500">Accurate, timely financial statements every month.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Payroll &amp; Sales Tax</span>
                                            <span className="text-base text-slate-500">Full oversight of payroll processing and sales tax compliance.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Strategic Advisory */}
                            <div className="group rounded-xl border border-slate-100 bg-white p-8 transition-all hover:shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm">
                                        <BarChart2 className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-medium tracking-tight text-slate-900">Strategic Advisory</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Outsourced Fractional CFO</span>
                                            <span className="text-base text-slate-500">High-level strategy without the full-time executive cost.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Cash Flow Forecasting</span>
                                            <span className="text-base text-slate-500">Predict runway and manage capital efficiency.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Business Entity Formation</span>
                                            <span className="text-base text-slate-500">Expert guidance on LLC vs S-Corp selection and setup.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">IRS Representation</span>
                                            <span className="text-base text-slate-500">Tax resolution and audit defense services.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Industry Specialized */}
                            <div className="group rounded-xl border border-slate-100 bg-white p-8 transition-all hover:shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
                                        <Briefcase className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-medium tracking-tight text-slate-900">Industry Specialized</h3>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                                        <span className="mb-1 block text-base font-semibold text-slate-900">Real Estate</span>
                                        <span className="block text-sm leading-tight text-slate-500">Cost segregation, 1031 exchanges, and portfolio analysis.</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                                        <span className="mb-1 block text-base font-semibold text-slate-900">Medical &amp; Dental</span>
                                        <span className="block text-sm leading-tight text-slate-500">Practice benchmarking and revenue cycle management.</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                                        <span className="mb-1 block text-base font-semibold text-slate-900">Construction</span>
                                        <span className="block text-sm leading-tight text-slate-500">WIP schedules, job costing, and contractor compliance.</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                                        <span className="mb-1 block text-base font-semibold text-slate-900">Tech &amp; SaaS</span>
                                        <span className="block text-sm leading-tight text-slate-500">R&amp;D tax credits, burn rate analysis, and KPI tracking.</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 sm:col-span-2">
                                        <span className="mb-1 block text-base font-semibold text-slate-900">Non-Profit / Exempt</span>
                                        <span className="block text-sm leading-tight text-slate-500">Form 990 preparation and grant compliance monitoring.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Technology & Setup */}
                            <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:bg-slate-50 hover:shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 shadow-sm">
                                        <Cpu className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-medium tracking-tight text-slate-900">Technology &amp; Setup</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-slate-900">QuickBooks / Xero Cleanup</h4>
                                            <Wrench className="h-3.5 w-3.5 text-slate-400" />
                                        </div>
                                        <p className="text-base leading-relaxed text-slate-500">
                                            Professional setup and training to fix messy data. We optimize your chart of accounts for clarity and accuracy.
                                        </p>
                                    </div>
                                    <div className="h-px bg-slate-200"></div>
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-slate-900">Tech Stack Implementation</h4>
                                            <Layers className="h-3.5 w-3.5 text-slate-400" />
                                        </div>
                                        <p className="text-base leading-relaxed text-slate-500">
                                            We implement modern tools like Expensify, Bill.com, and Gusto to automate your back office workflow.
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <a href="#" className="inline-flex items-center text-base font-medium text-slate-900 transition-colors hover:text-blue-600">
                                            View supported integrations <ArrowRight className="ml-1 h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Local Presence */}
                    <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-16">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div>
                                <span className="mb-2 block text-base font-semibold uppercase tracking-wider text-blue-600">Local Presence</span>
                                <h2 className="mb-4 text-2xl font-medium tracking-tight text-slate-900">Serving the Greater Los Angeles Area</h2>
                                <p className="mb-6 text-sm font-light text-slate-500">
                                    While we operate digitally, we maintain dedicated offices to serve our local clients with in-person strategy sessions and audit representation.
                                </p>

                                <div className="mb-6 flex items-start gap-4">
                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2 text-slate-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-900">Pasadena Office</h4>
                                        <p className="mt-1 text-base text-slate-500">100 E Colorado Blvd, Pasadena, CA 91105 • +1 (626) 555-0123</p>
                                        <a href="#" className="mt-2 inline-flex items-center gap-1 text-base font-medium text-blue-600 hover:text-blue-700">
                                            View location page <ArrowRight className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="mb-3 text-base font-semibold uppercase tracking-wider text-slate-900">Serving Clients In:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-base font-medium text-slate-600">Pasadena</span>
                                        <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-base font-medium text-slate-600">Glendale</span>
                                        <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-base font-medium text-slate-600">Burbank</span>
                                        <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-base font-medium text-slate-600">Arcadia</span>
                                        <span className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-base font-medium text-slate-600">Downtown LA</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
                                <h3 className="mb-4 text-sm font-medium text-slate-900">Specialized Local Services</h3>
                                <p className="mb-6 text-base text-slate-500">Explore our dedicated service offerings tailored for local compliance and industries.</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <a href="#" className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm">
                                        <span className="text-base font-medium text-slate-700 group-hover:text-blue-600">Tax Preparation in Pasadena</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-400" />
                                    </a>
                                    <a href="#" className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm">
                                        <span className="text-base font-medium text-slate-700 group-hover:text-blue-600">Bookkeeping Services Glendale</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-400" />
                                    </a>
                                    <a href="#" className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm">
                                        <span className="text-base font-medium text-slate-700 group-hover:text-blue-600">IRS Audit Representation LA</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-400" />
                                    </a>
                                    <a href="#" className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm">
                                        <span className="text-base font-medium text-slate-700 group-hover:text-blue-600">Tech Startup CPA Burbank</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-400" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team */}
                    <section className="border-b border-slate-100 px-6 py-16 lg:px-16">
                        <div className="mb-12">
                            <span className="mb-2 block text-base font-semibold uppercase tracking-wider text-blue-600">The Team</span>
                            <h2 className="text-2xl font-medium tracking-tight text-slate-900">Expertise you can trust</h2>
                            <p className="mt-2 max-w-xl font-light text-slate-500">Our partners bring decades of experience from Big 4 firms and are fully credentialed.</p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-start gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    alt="Thomas Vance"
                                    className="h-16 w-16 rounded-xl border border-slate-200 object-cover opacity-90 grayscale"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-medium text-slate-900">Thomas Vance</h3>
                                        <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-sm font-bold text-slate-600">CPA</span>
                                    </div>
                                    <p className="mb-2 mt-0.5 text-base font-medium uppercase tracking-wide text-blue-600">Managing Partner</p>
                                    <p className="text-sm leading-relaxed text-slate-500">
                                        Former Director at Deloitte. Specializes in M&amp;A strategy and international tax compliance.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    alt="Sarah Chen"
                                    className="h-16 w-16 rounded-xl border border-slate-200 object-cover opacity-90 grayscale"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-medium text-slate-900">Sarah Chen</h3>
                                        <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-sm font-bold text-slate-600">CFA</span>
                                    </div>
                                    <p className="mb-2 mt-0.5 text-base font-medium uppercase tracking-wide text-blue-600">Head of Advisory</p>
                                    <p className="text-sm leading-relaxed text-slate-500">
                                        Ex-CFO of a Series B Fintech. Expert in SaaS metrics, fundraising, and financial modeling.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    alt="David Miller"
                                    className="h-16 w-16 rounded-xl border border-slate-200 object-cover opacity-90 grayscale"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-medium text-slate-900">David Miller</h3>
                                        <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-sm font-bold text-slate-600">EA</span>
                                    </div>
                                    <p className="mb-2 mt-0.5 text-base font-medium uppercase tracking-wide text-blue-600">Tax Partner</p>
                                    <p className="text-sm leading-relaxed text-slate-500">
                                        Enrolled Agent with 15 years experience helping startups navigate R&amp;D credits and IRS representation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 lg:px-16">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <h2 className="mb-3 text-2xl font-medium tracking-tight text-slate-900">Loved by founders</h2>
                            <p className="font-light text-slate-500">Join the companies that have scaled from seed to exit with us.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="relative rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                                <Quote className="absolute right-6 top-6 h-6 w-6 text-blue-200" />
                                <div className="mb-4">
                                    <div className="mb-2 flex gap-0.5 text-amber-400">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="relative z-10 text-sm leading-relaxed text-slate-600">
                                        "Ledger &amp; Co. fundamentally changed how we operate. Their real-time dashboards give us the confidence to make big decisions quickly."
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500">EL</div>
                                    <div>
                                        <p className="text-base font-semibold text-slate-900">Elena Rodriguez</p>
                                        <p className="text-sm text-slate-400">CEO, Nexus AI</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                                <Quote className="absolute right-6 top-6 h-6 w-6 text-blue-200" />
                                <div className="mb-4">
                                    <div className="mb-2 flex gap-0.5 text-amber-400">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="relative z-10 text-sm leading-relaxed text-slate-600">
                                        "The fractional CFO service is a game changer. It feels like having a senior finance partner on the team for a fraction of the cost."
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500">MJ</div>
                                    <div>
                                        <p className="text-base font-semibold text-slate-900">Marcus Johnson</p>
                                        <p className="text-sm text-slate-400">Founder, Stacked</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                                <Quote className="absolute right-6 top-6 h-6 w-6 text-blue-200" />
                                <div className="mb-4">
                                    <div className="mb-2 flex gap-0.5 text-amber-400">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="relative z-10 text-sm leading-relaxed text-slate-600">
                                        "We switched from a traditional firm and the difference is night and day. The tech-first approach saves us 10+ hours a month."
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500">AK</div>
                                    <div>
                                        <p className="text-base font-semibold text-slate-900">Anna Kim</p>
                                        <p className="text-sm text-slate-400">COO, Swift Logistics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Strip */}
                    <section className="relative mx-6 mb-16 mt-8 overflow-hidden rounded-xl bg-slate-900 px-6 py-12 lg:mx-16 lg:p-16">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="max-w-lg">
                                <h2 className="mb-2 text-2xl font-medium tracking-tight text-white lg:text-3xl">Ready to streamline your finances?</h2>
                                <p className="font-light text-slate-400">Join 500+ fast-growing companies that trust Ledger &amp; Co.</p>
                            </div>
                            <div className="flex w-[100%] flex-col gap-4 md:w-auto md:flex-row">
                                <button className="whitespace-nowrap rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-600">
                                    Get Started
                                </button>
                                <button className="whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                                    View Demo
                                </button>
                            </div>
                        </div>
                    </section>


                </main>
            </div>
        </>
    );
}