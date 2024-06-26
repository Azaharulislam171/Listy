// components/PrivacyPolicy.js

import React from 'react';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <div className="max-w-4xl px-8 py-12 bg-white shadow-lg rounded-lg mx-auto w-full">
        <div className='flex justify-end'>
          <Link href='/dashboard'>
            <XCircleIcon className='text-gray-400 w-8 h-8' />
          </Link>
        </div>
        
        {/* Logos and Last Updated */}
        <div className="flex justify-between items-center m-4">
          <div className="flex items-center">
            <Image src="/ai.png" alt="Logo 1" width={80} height={80} className="h-20 mr-2" />
            <Image src="/t.png" alt="Logo 2" width={80} height={80} className="h-20 mr-2" />
          </div>
          <div className="text-right">
            <p className="text-xs">Last Updated: June 22, 2024</p>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="m-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h2>
          <div className="text-sm leading-relaxed">
            <p className='text-gray-600'>
              This Privacy Policy describes how AiITSolutions collects, uses, and discloses your personal information when you use Taskly.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">1. Information We Collect</span></p>
            <p className='text-gray-600'>
              We collect information that you provide to us directly, such as when you create an account, update your profile, or use certain features of Taskly.
            </p>
            <p className='text-gray-600'>
              We also collect information automatically as you navigate through the site, including usage details, IP addresses, and cookies.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">2. How We Use Your Information</span></p>
            <p className='text-gray-600'>
              We use your information to provide, maintain, and improve Taskly, to communicate with you, and to protect Taskly and our users.
            </p>
            <p className='text-gray-600'>
              We may also use your information for analytics and research to better understand how Taskly is used.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">3. Sharing Your Information</span></p>
            <p className='text-gray-600'>
              We may share your information with third-party service providers who perform services on our behalf, such as hosting services, and with legal authorities if required by law.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">4. Your Rights</span></p>
            <p className='text-gray-600'>
              You have the right to access, correct, or delete your personal information. You can do this by contacting us at the email provided below.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">5. Data Security</span></p>
            <p className='text-gray-600'>
              We implement security measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">6. Changes to This Privacy Policy</span></p>
            <p className='text-gray-600'>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">7. Contact Us</span></p>
            <p className='text-gray-600'>
              If you have any questions about this Privacy Policy, please contact us at: <span className='text-blue-600'>azaharulislam171@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
