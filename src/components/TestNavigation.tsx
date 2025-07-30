import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const TestNavigation = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🧪 Test Navigation</h2>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Login Status:</h3>
        <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
        {user && <p>Email: {user.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Main App:</h3>
          <Link 
            to="/" 
            className="block p-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 text-blue-800"
          >
            🏠 Home Page
          </Link>
          <Link 
            to="/create" 
            className="block p-3 bg-green-50 border border-green-200 rounded hover:bg-green-100 text-green-800"
          >
            ✨ Create Gift (Full Flow)
          </Link>
          <Link 
            to="/preview" 
            className="block p-3 bg-purple-50 border border-purple-200 rounded hover:bg-purple-100 text-purple-800"
          >
            👁️ Preview Page (Direct)
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Test Components:</h3>
          <Link 
            to="/test" 
            className="block p-3 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 text-amber-800"
          >
            🧪 Test Gift Generation
          </Link>
          <Link 
            to="/test-generate" 
            className="block p-3 bg-orange-50 border border-orange-200 rounded hover:bg-orange-100 text-orange-800"
          >
            🎯 Test Generate Only
          </Link>
          <Link 
            to="/test-preview" 
            className="block p-3 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100 text-pink-800"
          >
            📋 Setup Test Data → Preview
          </Link>
          <Link 
            to="/preview-simple" 
            className="block p-3 bg-teal-50 border border-teal-200 rounded hover:bg-teal-100 text-teal-800"
          >
            🔧 Simple Preview Test
          </Link>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">How to Test:</h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. <strong>Quick Test:</strong> Use "Test Generate Only" for isolated testing</li>
          <li>2. <strong>Full Workflow:</strong> Use "Setup Test Data → Preview" then go to main Preview</li>
          <li>3. <strong>Manual Flow:</strong> Use "Create Gift (Full Flow)" for the complete experience</li>
          <li>4. <strong>Troubleshooting:</strong> Use "Simple Preview Test" if main Preview has issues</li>
        </ol>
      </div>
    </div>
  );
};

export default TestNavigation;
