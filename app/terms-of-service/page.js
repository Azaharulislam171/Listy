// components/TermsOfService.js

import React from 'react';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const TermsOfService = () => {
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

        {/* Terms of Service */}
        <div className="m-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Terms of Service</h2>
          <div className="text-sm leading-relaxed">
            <p><span className="font-bold">1. Acceptance of Terms</span></p>
            <p className='text-gray-600'>
              By accessing or using Taskly in any manner, you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">2. Use of Taskly</span></p>
            <p className='text-gray-600'><span className="font-bold">Registration:</span> To use Taskly, you may need to register and provide certain information. You agree that all information provided during registration is accurate and complete.</p>
            <p className='text-gray-600'><span className="font-bold">Google Authentication:</span> Taskly uses Google authentication services to authenticate users. By using Taskly, you agree to Google&apos;s Terms of Service and Privacy Policy in addition to these Terms.</p>
            <p className='text-gray-600'><span className="font-bold">User Responsibilities:</span> You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">3. User Content</span></p>
            <p className='text-gray-600'><span className="font-bold">Ownership:</span> You retain ownership of any content you create, upload, or submit to Taskly.</p>
            <p className='text-gray-600'><span className="font-bold">License:</span> By submitting content to Taskly, you grant AiITSolutions a worldwide, non-exclusive, royalty-free license to use, reproduce, distribute, and display such content solely for the purposes of operating and improving Taskly.</p>
            <p className='text-gray-600'><span className="font-bold">Prohibited Content:</span> You agree not to submit any content that is illegal, infringes on any intellectual property rights, violates any applicable laws, or is otherwise offensive or harmful.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">4. Privacy Policy</span></p>
            <p className='text-gray-600'>Your use of Taskly is also governed by our Privacy Policy, which outlines how we collect, use, and disclose your information. By using Taskly, you consent to our collection and use of your personal information as outlined in the Privacy Policy.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">5. Modifications</span></p>
            <p className='text-gray-600'>AiITSolutions reserves the right to modify or revise these Terms of Service at any time. The most current version will always be available on this page. By continuing to use Taskly after changes are posted, you agree to be bound by the revised Terms.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">6. Termination</span></p>
            <p className='text-gray-600'>AiITSolutions reserves the right to suspend or terminate your access to Taskly at any time, without notice, for any reason, including breach of these Terms.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">7. Limitation of Liability</span></p>
            <p className='text-gray-600'>To the fullest extent permitted by law, AiITSolutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
          </div>

          <div className="text-sm leading-relaxed mt-4">
            <p><span className="font-bold">8. Governing Law</span></p>
            <p className='text-gray-600'>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>
            If you have any questions about these Terms of Service, please contact us at:<span className='text-blue-600'> azaharulislam171@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
