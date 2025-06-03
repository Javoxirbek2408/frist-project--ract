import React from 'react'

const Contact = () => {
  return (
    <div className="w-[70%] mx-auto p-6 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Contact Us</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            className="w-full border rounded p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
