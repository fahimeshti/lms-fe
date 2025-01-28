import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { SITE_NAME } from '@/utils/constants'
import { getLatestYearInBangla } from '@/utils/getLatestYearInBangla'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-primary-text">
                            {SITE_NAME}
                        </Link>
                        <p className="text-primary-text pr-2">
                            আমরা আমাদের শিক্ষার্থীদের সর্বোত্তম সেবা প্রদানে প্রতিশ্রুতিবদ্ধ। আমাদের সাথে যোগ দিন এবং বিশ্বকে একটি ভাল জায়গা করে তুলুন।
                        </p>
                    </div>

                    {/* Second Column: Important Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-text uppercase tracking-wider">গুরুত্বপূর্ণ লিঙ্কসঃ</h3>
                        <ul className="mt-4 space-y-1">
                            <li>
                                <Link href="/#" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    ব্যবহারকারীর শর্তাবলি
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    প্রাইভেসি পলিসি
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    রিফান্ড পলিসি
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Third Column: Additional Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-text uppercase tracking-wider">অন্যান্য</h3>
                        <ul className="mt-4 space-y-1">
                            <li>
                                <Link href="/blog" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    ব্লগ
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    ক্যারিয়ার
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-base text-primary-text hover:text-primary transition-colors duration-200">
                                    ফ্রি ডাউনলোড
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Fourth Column: Contact Information */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary-text uppercase tracking-wider">আমাদের যোগাযোগ মাধ্যম</h3>
                        <ul className="mt-4 space-y-1">
                            <li className='text-primary-text'>
                                কল করুন:{" "}
                                <Link
                                    href="tel:+8801234525454"
                                    className="text-base text-primary hover:text-primary transition-colors duration-200">
                                    +8801234525454
                                </Link>
                            </li>
                            <li className='text-primary-text'>
                                ইমেইল:{" "}
                                <Link
                                    href="mailto:support@yourmail.com"
                                    className="text-base text-primary hover:text-primary transition-colors duration-200">
                                    support@yourmail.com
                                </Link>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-8">
                            <a href="#" className="text-primary-text hover:text-primary transition-colors duration-150">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-primary-text hover:text-primary transition-colors duration-150">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-primary-text hover:text-primary transition-colors duration-150">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-primary-text hover:text-primary transition-colors duration-150">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* border-[rgb(84_61_237)] */}
                <div className="mt-8 border-t py-4 md:flex md:items-center md:justify-center">
                    <p className="mt-4 text-base text-primary-text md:mt-0 md:order-1">
                        স্বত্ব &copy; {getLatestYearInBangla()} <a href='https://github.com/fahimeshti' target='_blank' className='text-primary'>Eshtiyak Fahim</a> কর্তৃক সর্বস্বত্ব সংরক্ষিত
                    </p>
                </div>
            </div>
        </footer>
    )
}
