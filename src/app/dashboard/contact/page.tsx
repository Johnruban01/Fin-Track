import React from 'react'

export default function ContactPage() {
      return (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
    
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Have questions, feedback, or want to collaborate? We’d love to hear from you!
          </p>
    
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">📧 Email:</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">john.ruban.162@gmail.com</p>
            </div>
    
            <div>
              <p className="text-gray-600 dark:text-gray-400">📝 Subject:</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">Support or Feature Request</p>
            </div>
    
            <a
              href="mailto:johnruban.dev@gmail.com?subject=FinTrack%20Support&body=Hi%20FinTrack%20team,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Open Gmail to Contact Us
            </a>
          </div>
        </div>
      );
    }
    
