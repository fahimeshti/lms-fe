import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First Column: Logo, Details, and Social Icons */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-gray-800">Logo</Link>
                        <p className="text-gray-600">
                            We're dedicated to providing the best service to our students. Join us in our journey to make the world a better place.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Second Column: Important Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Important Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Third Column: Additional Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/partners" className="text-base text-gray-500 hover:text-gray-900">
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-base text-gray-500 hover:text-gray-900">
                                    Resources
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <Link href="/terms" className="text-gray-400 hover:text-gray-500">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
                            Privacy
                        </Link>
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        &copy; 2023 Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
