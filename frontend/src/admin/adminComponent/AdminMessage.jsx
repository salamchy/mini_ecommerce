import { useFetchMessagesQuery } from '../../features/api/messageApi';

const AdminMessages = () => {
  const { data: messages, isLoading, isError, error } = useFetchMessagesQuery();

  if (isLoading) {
    return <div className="text-center text-lg mt-10">Loading messages...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-10">Error fetching messages: {error.message}</div>;
  }

  if (!messages) {
    return <div className="text-center text-gray-500 mt-10">No messages available.</div>;
  }

  if (!Array.isArray(messages)) {
    return <div className="text-center text-gray-500 mt-10">Unexpected data format: messages is not an array.</div>;
  }

  if (messages.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No messages found.</div>;
  }

  return (
    <div className=" py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
     sm:py-12">
      {messages.map((message, index) => (
        <div className="relative space-y-2.5 py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Messages</h1>
              <div className="space-y-4">

                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-bold text-indigo-600">{message.name}</h3>
                  <p className="text-gray-600">{message.email}</p>
                  <p className="mt-2 text-gray-700">{message.message}</p>
                </div>

              </div>
              {messages.length === 0 && (
                <p className="text-gray-500 text-center mt-6">No messages to display.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default AdminMessages;