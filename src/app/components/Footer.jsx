// components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="object-cover scale-105"
                priority
                fill
              />
            </div> 
              <span className="text-white text-xl font-bold">Logo</span>
            </div>
            <div className="space-y-2">
            <h3 className="text-teal-400 font-medium mb-4">Contact Us</h3>
              <p>Logo@gmail.com</p>
              <p>+91 12345 67890</p>
              <p className="text-sm mt-4">
                Lorem ipsum dolor sit amet consectetur. Nulla tempus elit nec.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

      
          <div className="md:col-span-1 md:mt-12 lg:mt-12 ">
            <h3 className="text-teal-400 font-medium mb-4">Products Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Auctor volutpat.</Link></li>
              <li><Link href="#" className="hover:text-white">Fermentum turpis.</Link></li>
              <li><Link href="#" className="hover:text-white">Mi consequat.</Link></li>
              <li><Link href="#" className="hover:text-white">Amet venenatis.</Link></li>
              <li><Link href="#" className="hover:text-white">Convallis porttitor.</Link></li>
            </ul>
          </div>

          
          <div className="md:col-span-1  md:mt-12 lg:mt-12">
            <h3 className="text-teal-400 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Egestas vitae.</Link></li>
              <li><Link href="#" className="hover:text-white">Viverra lorem ac.</Link></li>
              <li><Link href="#" className="hover:text-white">Eget ac tellus.</Link></li>
              <li><Link href="#" className="hover:text-white">Erat nulla.</Link></li>
              <li><Link href="#" className="hover:text-white">Vulputate proin.</Link></li>
            </ul>
          </div>

        
          <div className="md:col-span-1  md:mt-12 lg:mt-12">
            <h3 className="text-teal-400 font-medium mb-4">Legal Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Egestas vitae.</Link></li>
              <li><Link href="#" className="hover:text-white">Viverra lorem ac.</Link></li>
              <li><Link href="#" className="hover:text-white">Eget ac tellus.</Link></li>
              <li><Link href="#" className="hover:text-white">Erat nulla.</Link></li>
              <li><Link href="#" className="hover:text-white">Vulputate proin.</Link></li>
            </ul>
          </div>

      
          <div className="md:col-span-1  md:mt-12 lg:mt-12">
            <h3 className="text-teal-400 font-medium mb-4">Get the app</h3>
            <div className="space-y-4">
              <Link href="#" className="block">
                <Image 
                  src="/images/applelogo.png" 
                  alt="Download on the App Store" 
                  width={140} 
                  height={42}
                  className="rounded-lg"
                />
              </Link>
              <Link href="#" className="block">
                <Image 
                  src="/images/playstore.png" 
                  alt="Get it on Google Play" 
                  width={140} 
                  height={42}
                  className="rounded-lg"
                />
              </Link>
            </div>
          </div>
        </div>

      
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm">Copyright © 2020. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;